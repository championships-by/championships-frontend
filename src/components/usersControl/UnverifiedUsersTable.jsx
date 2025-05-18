import React, { useState } from "react";
import { Modal, Table, Typography, Flex, Tooltip, Button, message } from "antd";
import { useSelector } from "react-redux";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { getUnverifiedUsersSelector, getUnverifiedUsers } from "@/store/users";
import { paginationLocale, tableLocale } from "@/const";
import { useTranslation } from "react-i18next";
import { getTranslation } from "@/utils";
import { userApi } from "@/api";
import UserAcceptOrDeclineModal from "./UserAcceptOrDeclineModal";

import "@/components/usersControl/sass/users-approval-modal.scss";

function UnverifiedUsersTable({ dispatch }) {
  const { t } = useTranslation();
  const users = useSelector(getUnverifiedUsersSelector);
  const { data } = users;
  const [isAccepted, setIsAccepted] = useState(false);
  const [selectedUnverifiedUser, setSelectedUnverifiedUser] = useState();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const askForConfirmation = (mode, unverifiedUser) => {
    setIsAccepted(mode);
    setSelectedUnverifiedUser(unverifiedUser);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const sendNotice = async (params) => {
    try {
      await userApi.sendUserRegistrationNotice(params);
      message.info(t("MESSAGES.SUCCESS_SEND_USER_NOTICE"));
    } catch {}
  };

  const acceptUser = async () => {
    try {
      const params = new URLSearchParams();
      params.append("user_id", selectedUnverifiedUser.id);

      await userApi.acceptUser(params);
      message.success(t("COMMON.USER_APPROVED"));

      const noticeParams = new URLSearchParams();
      noticeParams.append("user_email", selectedUnverifiedUser.email);
      sendNotice(noticeParams);
    } catch {}
  };

  const declineUser = async () => {
    try {
      const params = new URLSearchParams();
      params.append("user_id", selectedUnverifiedUser.id);
      await userApi.declineUser(params);
      message.success(t("COMMON.USER_DECLINED"));
    } catch {}
  };

  const onConfirmed = async () => {
    setIsLoading(true);

    if (isAccepted) {
      await acceptUser();
    } else {
      await declineUser();
    }

    setIsLoading(false);
    setIsConfirmationModalOpen(false);

    setSelectedUnverifiedUser(null);
    dispatch();
  };

  const columns = [
    {
      title: t("COMMON.SURNAME_NAME_THIRD_NAME"),
      key: "fullname",
      width: "30%",
      render: (unverifiedUser) => {
        const { first_name, second_name, third_name } = unverifiedUser;

        return (
          <Typography.Text>{`${second_name} ${first_name} ${third_name}`}</Typography.Text>
        );
      },
      sorter: (a, b) => {
        const firstFullName = `${a.second_name} ${a.first_name} ${a.third_name}`;
        const secondFullName = `${b.second_name} ${b.first_name} ${b.third_name}`;

        return firstFullName.localeCompare(secondFullName);
      },
    },
    {
      title: t("COMMON.EDUCATIONAL_INSTITUTION"),
      key: "educational_institution",
      width: "50%",
      render: (unverifiedUser) => {
        const { educational_institution } = unverifiedUser;

        return <Typography.Text>{educational_institution}</Typography.Text>;
      },
    },
    {
      title: t("COMMON.ACTIONS"),
      key: "status",
      width: "20%",
      render: (unverifiedUser) => (
        <Flex>
          <Tooltip title={t("COMMON.ACCEPT")}>
            <Button
              className="accept-button"
              type="text"
              onClick={() => askForConfirmation(true, unverifiedUser)}
              icon={<CheckOutlined />}
            />
          </Tooltip>
          <Tooltip title={t("COMMON.DECLINE")}>
            <Button
              className="decline-button"
              type="text"
              onClick={() => askForConfirmation(false, unverifiedUser)}
              icon={<CloseOutlined />}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        locale={getTranslation(tableLocale, t)}
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: false,
          locale: getTranslation(paginationLocale, t),
        }}
      />
      <UserAcceptOrDeclineModal
        unverifiedUser={selectedUnverifiedUser}
        isOpen={isConfirmationModalOpen}
        isAccepted={isAccepted}
        onYes={onConfirmed}
        onNo={closeConfirmationModal}
        isLoading={isLoading}
      />
    </>
  );
}

export default UnverifiedUsersTable;
