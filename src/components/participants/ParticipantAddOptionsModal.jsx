import React from "react";
import { Modal, Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

const ParticipantAddOptionsModal = ({
  isOpen,
  onClose,
  onOpenSingle,
  onOpenExcel,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("PARTICIPANTS.CREATE_PARTICIPANT")}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Flex vertical gap="middle">
        <Button type="primary" onClick={onOpenSingle}>
          {t("PARTICIPANTS.CREATE_PARTICIPANT_SEPARATELY")}
        </Button>
        <Button type="primary" onClick={onOpenExcel}>
          {t("COMMON.PARTICIPANT_EXCEL")}
        </Button>
      </Flex>
    </Modal>
  );
};

export default ParticipantAddOptionsModal;
