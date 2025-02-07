import React, { useState } from "react";
import { Modal, Table, Typography, Flex, Tooltip, Button, message } from "antd";
import { useSelector } from "react-redux";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { getUnverifiedUsersSelector, getUnverifiedUsers } from "@store/users";
import { paginationLocale, tableLocale } from "@constants";
import { useTranslation } from "react-i18next";
import { getTranslation } from "@utils";
import { userApi } from "@api";
import UserAcceptOrDeclineModal from "./UserAcceptOrDeclineModal";

import "@components/usersControl/sass/users-approval-modal.scss";

function UnverifiedUsersTable({ dispatch }) {
  const { t } = useTranslation();
  const users = useSelector(getUnverifiedUsersSelector);
  const usersData = users.data;
  const [isAccepted, setIsAccepted] = useState(false);
  const [selectedUnverifiedUser, setSelectedUnverifiedUser] = useState();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const askForConfirmation = async (mode, unverifiedUser) => {
    setIsAccepted(mode);
    setSelectedUnverifiedUser(unverifiedUser);
    setIsConfirmationModalOpen(true);
  };

  const acceptUser = async () => {
    try {
      const body = {
        user_id: selectedUnverifiedUser.id,
      };
      await userApi.acceptUser(body);
      message.success(t("COMMON.USER_APPROVED"));

      await userApi.sendUserRegistrationNotice(selectedUnverifiedUser.email);
      message.info(t("MESSAGES.SUCCESS_SEND_USER_NOTICE"));
    } catch { }
  };

  const declineUser = async () => {
    try {
      const params = new URLSearchParams();
      params.append("user_id", selectedUnverifiedUser.id);
      await userApi.declineUser(params);
      message.success(t("COMMON.USER_DECLINED"))
    } catch { }
  };

  const onConfirmed = async () => {
    if (isAccepted) {
      await acceptUser();
    } else {
      await declineUser();
    }
    setIsConfirmationModalOpen(false);
    setSelectedUnverifiedUser(null);
    dispatch();
  };

  const columns = [
    {
      title: t("COMMON.SURNAME_NAME_THIRD_NAME"),
      key: "fullname",
      width: "30%",
      render: (unverifiedUser) => (
        <Typography.Text>{`${unverifiedUser.second_name} ${unverifiedUser.first_name} ${unverifiedUser.third_name}`}</Typography.Text>
      ),
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
      render: (unverifiedUser) => (
        <Typography.Text>
          {unverifiedUser.educational_institution}
        </Typography.Text>
      ),
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
        dataSource={usersData}
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
        onNo={() => setIsConfirmationModalOpen(false)}
      />
    </>
  );
}

export default UnverifiedUsersTable;
