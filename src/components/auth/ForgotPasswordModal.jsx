import React, { useState } from "react";
import { Button, Flex, Form, Modal, Typography, message } from "antd";
import AuthEmailInput from "@/modules/auth/AuthEmailInput";
import { userApi } from "@/api";
import { useTranslation } from "react-i18next";

import "./sass/forgot-password.scss";

function ForgotPasswordModal({ isOpen, onOk, onCancel }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");

  const onFinish = async () => {
    setIsLoading(true);
    try {
      const params = {
        user_email: email,
      };

      await userApi.sendPasswordChangeNotice(params);

      message.success(t("MESSAGES.NOTICE_SUCCESS_SEND"));
      form.resetFields();
      onOk();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
    setIsLoading(false);
  };

  return (
    <Modal
      width={400}
      title={t("COMMON.PASSWORD_RECOVERY")}
      className="event-registration__team-create-modal"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
    >
      <Typography.Text>
        {t("COMMON.WE_SEND_EMAIL_TO_RECOVERY_PASSWORD")}
      </Typography.Text>
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <AuthEmailInput
          value={email}
          onChange={setEmail}
          className="forgot-password__form"
        />
        <Flex gap="middle">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {t("COMMON.SEND")}
          </Button>
          <Button onClick={onCancel}>{t("COMMON.CANCEL")}</Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default ForgotPasswordModal;
