import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getUsersSelector, setUser, getUsers } from "@store/users";
import UserEmailInput from "@modules/user/UserEmailInput";
import UserFirstnameInput from "@modules/user/UserFirstnameInput";
import UserLastnameInput from "@modules/user/UserLastnameInput";
import UserOrganizationInput from "@modules/user/UserOrganizationInput";
import UserPasswordInput from "@modules/user/UserPasswordInput";
import UserPatronymicInput from "@modules/user/UserPatronymicInput";
import UserPasswordConfirmationInput from "@modules/user/UserPasswordConfirmationInput";
import UserPhoneInput from "@modules/user/UserPhoneInput";
import { Button, Form, message, Modal, Space, Typography, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { userApi } from "@api";
import { useTranslation } from "react-i18next";

function RegistrationModal({ isOpen, onOk, onCancel }) {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [passwordToConfirm, setPasswordToConfirm] = useState();
  const dispatch = useDispatch();

  const onFinish = async () => {
    const raw = {
      email: form.getFieldValue("email"),
      first_name: form.getFieldValue("first_name"),
      second_name: form.getFieldValue("second_name"),
      third_name: form.getFieldValue("third_name"),
      phone: form.getFieldValue("phone"),
      educational_institution: form.getFieldValue("organization"),
      password: form.getFieldValue("password"),
      passowrd_confirmation: form.getFieldValue("password_confirmation"),
    };
    const params = new URLSearchParams();
    params.append("password", raw.password);
    params.append("user_email", raw.email);
    setLoading(true);
    const result = await dispatch(setUser(raw));

    if (setUser.rejected.match(result)) {
      throw new Error(result.error.message);
    }
    dispatch(getUsers());
    message.success(t("MESSAGES.SUCCESS_USER_CREATE"));
    await userApi
      .sendUserRegistrationNotice(params.toString())
      .then(() => {
        message.info(t("MESSAGES.SUCCESS_SEND_USER_NOTICE"));
      })
      .catch(() => {
        message.error(t("MESSAGES.NOT_SEND_USER_NOTICE"));
      });
    setLoading(false);
    onOk();
    form.resetFields();
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
  };

  const onValuesChange = debounce((changedValues, allValues) => {
    setPasswordToConfirm(form.getFieldValue("password"));
  }, 300);

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
        <UserEmailInput name="email" />
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
              <Button type="primary" htmlType="submit" loading={isLoading}>
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
