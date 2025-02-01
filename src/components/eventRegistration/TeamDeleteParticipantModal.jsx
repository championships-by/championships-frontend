import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

function TeamDeleteParticipantModal({ isOpen, onOk, onCancel }) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("COMMON.ARE_YOU_SURE")}
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      okText={t("COMMON.YES")}
      cancelText={t("COMMON.CANCEL")}
    >
      {t("EVENTS.ARE_YOU_SURE_REMOVE_PARTICIPANT")}
    </Modal>
  );
}

export default TeamDeleteParticipantModal;
