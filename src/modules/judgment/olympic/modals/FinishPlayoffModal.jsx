import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

function FinishPlayoffModal({ isOpen, onOk, onCancel }) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("COMMON.ARE_YOU_SURE")}
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      okText={t("COMMON.YES")}
      cancelText={t("COMMON.NO")}
    >
      {t("TOURNAMENTS.ARE_YOU_SURE_FINISH_OLYMPIC")}
    </Modal>
  );
}

export default FinishPlayoffModal;
