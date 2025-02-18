import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ModalType } from "@constants";
import { useSelector } from "react-redux";
import { getUserSelector } from "@store/users";
import { Button, Flex, Form, Modal, message, Checkbox } from "antd";
import ParticipantBirthdayInput from "@modules/participant/ParticipantBirthdayInput.jsx";
import ParticipantEmailInput from "@modules/participant/ParticipantEmailInput.jsx";
import ParticipantFirstnameInput from "@modules/participant/ParticipantFirstnameInput.jsx";
import ParticipantLastnameInput from "@modules/participant/ParticipantLastnameInput.jsx";
import ParticipantPatronymicInput from "@modules/participant/ParticipantPatronymicInput.jsx";
import ParticipantRegionSelect from "@modules/participant/ParticipantRegionSelect.jsx";
import ParticipantPhotoUpload from "@modules/participant/ParticipantPhotoUpload";
import { participantApi } from "@api";
import { useTranslation } from "react-i18next";

import "./sass/participants.scss";

function ParticipantModal({ isOpen, onOk, onCancel, data, isEdit }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);
  const [values, setValues] = useState(data || {});
  const [existingImagePath, setExistingImagePath] = useState(null);
  const user = useSelector(getUserSelector);

  useEffect(() => {
    const getImage = async (data) => {
      const body = { participant_id: data.id };

      participantApi
        .getParticipantStats(body)
        .then((responce) => {
          setExistingImagePath(responce.participant[0].photo_path);
        })
        .catch((error) => {
          setExistingImagePath(null);
        });
    };

    if (data) {
      getImage(data);

      setValues(data);
      form.setFieldsValue({ ...data, birth_date: dayjs(data.birth_date) });
    } else {
      setValues({});
    }
  }, [data, form]);

  const onFinish = async () => {
    setIsLoading(true);
    try {
      if (isEdit) {
        const body = {
          participant_data: JSON.stringify({
            id: values.id,
            first_name: values.first_name,
            second_name: values.second_name,
            third_name: values.third_name,
            region: values.region,
            birth_date: values.birth_date,
            email: values.email !== data.email ? values.email : null,
          }),
          photo: values.photo ?? null,
        };

        await participantApi.changeParticipant(body);
        message.success(t("MESSAGES.SUCCESS_EDIT_PARTICIPANT"));
      } else {
        const body = {
          participant: JSON.stringify({
            email: values.email,
            first_name: values.first_name,
            second_name: values.second_name,
            third_name: values.third_name,
            region: values.region,
            birth_date: values.birth_date,
          }),
          photo: values.photo ?? null,
        };

        const params = new URLSearchParams();
        params.append("participant_email", values.email);
        params.append(
          "user_full_name",
          `${user.data.second_name} ${user.data.first_name} ${user.data.third_name}`
        );

        await participantApi.setParticipant(body);
        message.success(t("MESSAGES.SUCCESS_CREATE_PARTICIPANT"));
        await participantApi
          .sendParticipantRegistrationNotice(params.toString())
          .then(() => {
            message.info(t("MESSAGES.SUCCESS_SEND_NOTICE"));
          })
          .catch(() => {
            message.error(t("MESSAGES.SEND_NOTICE_ERROR"));
          });
      }
      onOk();
      form.resetFields();
      setValues({});
    } catch {
      /* empty */
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
    setIsLoading(false);
  };

  const onValuesChange = (values) => {
    if (values.photo?.status === "removed") {
      values.photo = null;
    }
    setValues((oldValues) => ({ ...oldValues, ...values }));
  };

  return (
    <Modal
      title={
        isEdit
          ? t("PARTICIPANTS.EDIT_PARTICIPANT")
          : t("PARTICIPANTS.CREATE_PARTICIPANT")
      }
      className="participants__modal"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
    >
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="participant"
        onValuesChange={onValuesChange}
      >
        <ParticipantLastnameInput
          name="second_name"
          value={values.second_name}
        />
        <ParticipantFirstnameInput
          name="first_name"
          value={values.first_name}
        />
        <ParticipantPatronymicInput
          name="third_name"
          value={values.third_name}
        />
        <ParticipantBirthdayInput
          name="birth_date"
          value={values.birth_date}
          onChange={onValuesChange}
        />
        <ParticipantEmailInput name="email" value={values.email} />
        <ParticipantRegionSelect
          name="region"
          value={values.region}
          onChange={onValuesChange}
        />
        <ParticipantPhotoUpload
          name="photo"
          onChange={onValuesChange}
          form={form}
          existingImage={existingImagePath}
        />
        <Flex vertical gap="large">
          <Checkbox
            checked={isAgreeChecked}
            onChange={() => setIsAgreeChecked(!isAgreeChecked)}
          >
            {t("PARTICIPANTS.PERSONAL_DATA_AGREE")}
          </Checkbox>
        </Flex>
        <Flex gap="middle" className="participants__modal__buttons">
          <Button
            disabled={!isAgreeChecked}
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {t("COMMON.SAVE")}
          </Button>
          <Button onClick={onCancel}>{t("COMMON.CANCEL")}</Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default ParticipantModal;
