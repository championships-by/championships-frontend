import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

function TeamDeleteModal() {
  const { t } = useTranslation();

  return Modal.confirm({
    title: t("COMMON.ARE_YOU_SURE"),
    content: t("EVENTS.ARE_YOU_SURE_REMOVE_TEAM"),
    footer: (_, { OkBtn, CancelBtn }) => (
      <>
        <OkBtn />
        <CancelBtn />
      </>
    ),
    okText: t("COMMON.YES"),
    cancelText: t("COMMON.CANCEL"),
  });
}
export default TeamDeleteModal;
