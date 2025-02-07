import React, { useState } from "react";
import { Modal, Table, Typography, Flex, Tooltip, Button } from "antd";
import { useSelector } from "react-redux";
// import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { getUnverifiedUsersSelector, getUnverifiedUsers } from "@store/users";
import { paginationLocale, tableLocale } from "@constants";
import { useTranslation } from "react-i18next";
import { getTranslation } from "@utils";
import { userApi } from "@api"
import UserAcceptOrDeclineModal from "./UserAcceptOrDeclineModal";

import "@components/usersControl/sass/users-approval-modal.scss";

function UsersVerificationTable() {
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
  }

  const onConfirmed = async () => {
    setIsConfirmationModalOpen(false);
    isAccepted ? await acceptUser() : await cancelUser()
  }

  const acceptUser = async () => {

  }

  const declineUser = async () => {

  }

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
      render: (unverifiedUser) =>
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

export default UsersVerificationTable;
