import React from "react";
import { Modal, Flex, Button } from "antd";
import { useTranslation } from "react-i18next";

function UserAcceptOrDeclineModal({
  isOpen,
  isAccepted,
  unverifiedUser,
  onYes,
  onNo,
  isLoading,
}) {
  const { t } = useTranslation();

  return (
    <Modal
      open={isOpen}
      onCancel={onNo}
      title={`${unverifiedUser?.second_name} ${unverifiedUser?.first_name} ${unverifiedUser?.third_name} (${unverifiedUser?.email})`}
      footer={
        <Flex justify="right" gap="small">
          <Button onClick={onNo} disabled={isLoading}>{t("COMMON.NO")}</Button>
          <Button onClick={onYes} loading={isLoading} type="primary">
            {t("COMMON.YES")}
          </Button>
        </Flex>
      }
    >
      {isAccepted ? t("COMMON.ACCEPT_MESSAGE") : t("COMMON.DECLINE_MESSAGE")}
    </Modal>
  );
}

export default UserAcceptOrDeclineModal;
