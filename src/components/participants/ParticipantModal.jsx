import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ModalType } from "@constants";
import { Button, Flex, Form, Modal, message, Checkbox } from "antd";
import ParticipantBirthdayInput from "@modules/participant/ParticipantBirthdayInput.jsx";
import ParticipantEmailInput from "@modules/participant/ParticipantEmailInput.jsx";
import ParticipantFirstnameInput from "@modules/participant/ParticipantFirstnameInput.jsx";
import ParticipantLastnameInput from "@modules/participant/ParticipantLastnameInput.jsx";
import ParticipantPatronymicInput from "@modules/participant/ParticipantPatronymicInput.jsx";
import ParticipantRegionSelect from "@modules/participant/ParticipantRegionSelect.jsx";
import { participantApi } from "@api";

import "./sass/participants.scss";

function ParticipantModal({ isOpen, onOk, onCancel, data, isEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);
  const [values, setValues] = useState(data || {});

  useEffect(() => {
    if (data) {
      setValues(data);
      form.setFieldsValue({ ...data, birth_date: dayjs(data.birth_date) });
    } else {
      setValues({});
    }
  }, [data, form]);

  const onFinish = async () => {
    try {
      if (isEdit) {
        const body = {
          id: values.id,
          first_name: values.first_name,
          second_name: values.second_name,
          third_name: values.third_name,
          region: values.region,
          birth_date: values.birth_date,
        };
        if (values.email !== data.email) {
          body.email = values.email;
        }
        await participantApi.changeParticipant(body);
        message.success("Участник успешно изменён");
      } else {
        const body = JSON.stringify(values);
        await participantApi.setParticipant(body);
        message.success("Участник успешно создан");
      }
      onOk();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
    setIsLoading(false);
  };

  const onValuesChange = (values) => {
    setValues((oldValues) => ({ ...oldValues, ...values }));
  };

  return (
    <Modal
      title={isEdit ? "Редактировать участника" : "Добавить участника"}
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
        <Flex vertical gap="large">
          <Checkbox
            checked={isAgreeChecked}
            onChange={() => setIsAgreeChecked(!isAgreeChecked)}
          >
            Даю согласие на обработку и хранение персональных данных, проведение
            фото и видеосъемок с моим участием, на размещение фото и видео
            материалов на сайтах и информационных площадках; использовать
            фотографии и видео на выставках, в презентациях, в докладах и иных
            материалах, не противоречащих действущему законодательству
            Республики Беларусь.
          </Checkbox>
        </Flex>
        <Flex gap="middle" className="participants__modal__buttons">
          <Button
            disabled={!isAgreeChecked}
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Сохранить
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default ParticipantModal;
