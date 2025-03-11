import React, { useState } from "react";
import { Modal, Button, Form, message as antdMessage } from "antd";
import { useTranslation } from "react-i18next";
import TextEditor from "@modules/textEditor/TextEditor";
import { notificationApi } from "@api";

function NotificationModal({ isOpen, onCancel }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const messageRules = [{ required: true, message: t("COMMON.ENTER_MESSAGE") }];

  const sendNotification = async () => {
    if (!message.trim()) {
      antdMessage.warning(t("COMMON.ENTER_MESSAGE"));
      return;
    }

    setLoading(true);
    try {
      await notificationApi.sendNotification(message);
      antdMessage.success(t("COMMON.NOTIFICATION_SENT"));
      form.resetFields();
      setMessage("");
      onCancel();
    } catch (error) {
      antdMessage.error(t("COMMON.NOTIFICATION_ERROR"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={t("COMMON.SEND_NOTIFICATION")}
      open={isOpen}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={sendNotification}>
        <Form.Item name="message" rules={messageRules}>
          <TextEditor
            value={message}
            onChange={setMessage}
            placeholder={t("COMMON.SEND_NOTIFICATION_INPUT")}
          />
        </Form.Item>
        <Form.Item className="notification-form-item">
          <Button onClick={onCancel} disabled={loading}>
            {t("COMMON.CANCEL")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className={"notificaton-send-button"}
          >
            {t("COMMON.SEND")}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NotificationModal;
