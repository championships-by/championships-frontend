import React, { useState } from "react";
import { Modal, Table, Typography, Flex, Tooltip, Button } from "antd";
import { useSelector } from "react-redux";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { getUsersApplicationsSelector } from "@store/users";
import { paginationLocale, tableLocale } from "@constants";
import { useTranslation } from "react-i18next";
import { getUsersApplications } from "@store/users";
import { getTranslation } from "@utils";

import "@components/usersControl/sass/users-approval-modal.scss";

function UsersApplicationsModal({ isOpen, onCancel }) {
  const { t } = useTranslation();
  const users = useSelector(getUsersApplicationsSelector);
  const usersData = users.data;

  const onApply = async (userApplication) => {};

  const onDecline = async (userApplication) => {};

  const columns = [
    {
      title: t("COMMON.SURNAME_NAME_THIRD_NAME"),
      key: "fullname",
      width: "30%",
      render: (userApplication) => (
        <Typography.Text>{`${userApplication.second_name} ${userApplication.first_name} ${userApplication.third_name}`}</Typography.Text>
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
      render: (userApplication) => (
        <Typography.Text>
          {userApplication.educational_institution}
        </Typography.Text>
      ),
    },
    {
      title: t("COMMON.STATUS"),
      key: "status",
      width: "20%",
      render: (userApplication) =>
        userApplication.status == null ? (
          <Flex>
            <Tooltip title={t("COMMON.ACCEPT")}>
              <Button
                className="accept-button"
                type="text"
                icon={<CheckCircleFilled />}
              />
            </Tooltip>
            <Tooltip title={t("COMMON.DECLINE")}>
              <Button
                className="decline-button"
                type="text"
                icon={<CloseCircleFilled />}
              />
            </Tooltip>
          </Flex>
        ) : (
          <Typography.Text type="secondary">
            {t(userApplication.status ? "COMMON.ACCEPTED" : "COMMON.DECLINED")}
          </Typography.Text>
        ),
    },
  ];

  return (
    <Modal
      width={1000}
      title={t("COMMON.USER_APPLICATIONS")}
      open={isOpen}
      onCancel={onCancel}
      footer={null}
    >
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
    </Modal>
  );
}

export default UsersApplicationsModal;
