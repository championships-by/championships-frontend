import React, { useState } from "react";
import { Modal, Button, message as antdMessage } from "antd";
import { useTranslation } from "react-i18next";
import TextEditor from "@modules/textEditor/TextEditor";
import axios from "axios";

function NotificationModal({ isOpen, onCancel }) {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendNotification = async () => {
    if (!message.trim()) {
      antdMessage.warning(t("COMMON.ENTER_MESSAGE"));
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/notifications/send", { message });
      antdMessage.success(t("COMMON.NOTIFICATION_SENT"));
      setMessage("");
      onCancel();
    } catch (error) {
      console.error("Ошибка отправки уведомления:", error);
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
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={loading}>
          {t("COMMON.CANCEL")}
        </Button>,
        <Button
          key="send"
          type="primary"
          onClick={sendNotification}
          loading={loading}
        >
          {t("COMMON.SEND")}
        </Button>,
      ]}
    >
      <TextEditor
        placeholder={t("COMMON.SEND_NOTIFICATION_INPUT")}
        value={message}
        onChange={setMessage}
      />
    </Modal>
  );
}

export default NotificationModal;
