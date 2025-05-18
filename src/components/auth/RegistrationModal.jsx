import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getUsersSelector, setUser, getUsers } from "@/store/users";
import UserEmailInput from "@/modules/user/UserEmailInput";
import UserFirstnameInput from "@/modules/user/UserFirstnameInput";
import UserLastnameInput from "@/modules/user/UserLastnameInput";
import UserOrganizationInput from "@/modules/user/UserOrganizationInput";
import UserPasswordInput from "@/modules/user/UserPasswordInput";
import UserPatronymicInput from "@/modules/user/UserPatronymicInput";
import UserPasswordConfirmationInput from "@/modules/user/UserPasswordConfirmationInput";
import UserPhoneInput from "@/modules/user/UserPhoneInput";
import ParticipantReCaptcha from "@/modules/participant/ParticipantReCaptcha";
import {
  Button,
  Form,
  message,
  Modal,
  Space,
  Typography,
  Flex,
  Checkbox,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { userApi } from "@/api";
import { useTranslation } from "react-i18next";
import Captcha from "@/components/auth/Captcha";

function RegistrationModal({ isOpen, onOk, onCancel }) {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [passwordToConfirm, setPasswordToConfirm] = useState();
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);
  const [areCaptchaAccepted, setAreCaptchaAccepted] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async () => {
    setLoading(true);

    const body = {
      email: form.getFieldValue("email"),
      first_name: form.getFieldValue("first_name"),
      second_name: form.getFieldValue("second_name"),
      third_name: form.getFieldValue("third_name"),
      phone: form.getFieldValue("phone"),
      educational_institution: form.getFieldValue("organization"),
      password: form.getFieldValue("password"),
    };

    try {
      await userApi.registerUser(body);
      message.success(t("COMMON.REGISTRATION_APPLICATION_SENT"));
    } catch {}

    setLoading(false);
    onOk();
    form.resetFields();
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
  };

  const onValuesChange = debounce(() => {
    setPasswordToConfirm(form.getFieldValue("password"));
  }, 300);

  const onCheckedChange = (e) => {
    setAreTermsAccepted(e.target.checked);
  };

  const handleValidation = (status) => {
    setAreCaptchaAccepted(status);
  };

  return (
    <Modal
      title={t("COMMON.REGISTRATION")}
      className="user-control__modal"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <UserLastnameInput name="second_name" />
        <UserFirstnameInput name="first_name" />
        <UserPatronymicInput name="third_name" />
        <UserEmailInput name="email" checkEmailAvailability={true} />
        <UserPasswordInput required name="password" />
        <UserPasswordConfirmationInput
          required
          name="password_confirmation"
          compareTo={passwordToConfirm}
        />
        <UserPhoneInput name="phone" />
        <UserOrganizationInput name="organization" />
        <Space>
          <FormItem>
            <Flex vertical gap="middle">
              <Checkbox onChange={onCheckedChange}>
                <Typography.Text align="" type="secondary">
                  {t("COMMON.I_AGREE_WITH_USER_TERMS")}
                </Typography.Text>
              </Checkbox>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={!areTermsAccepted}
              >
                {t("COMMON.REQUEST_FOR_REGISTRATION")}
              </Button>
              <Typography.Text type="secondary" style={{ textAlign: "center" }}>
                {t("COMMON.REQUEST_FOR_REGISTRATION_INFO")}
              </Typography.Text>
            </Flex>
          </FormItem>
        </Space>
      </Form>
    </Modal>
  );
}

export default RegistrationModal;
