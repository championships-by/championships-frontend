import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getUnverifiedUsers,
  getUsersByName,
  getUsersSelector,
  getUnverifiedUsersSelector,
} from "@store/users";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import UsersVerificationModal from "@components/usersControl/UnverifiedUsersTable";
import Loader from "@components/loader/Loader";
import { ModalType } from "@constants";
import { Button, Flex, Typography, Row, Col, Tabs } from "antd";
import SearchInput from "@modules/search/SearchInput";
import { useTranslation } from "react-i18next";
import UserModal from "./UserModal";
import UsersTable from "./UsersTable";
import NotificationModal from "./NotificationModal";

import "./sass/users-control.scss";

function UsersControl() {
  const { t } = useTranslation();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isSendNotificationModalOpen, setSendNotificationModalOpen] =
    useState(false);
  const [isUserApprovalModalOpen, setIsUserApprovalModalOpen] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector);
  const unverifiedUsers = useSelector(getUnverifiedUsersSelector);
  const [unverifiedUsersCount, setUnverifiedUsersCount] = useState(0);
  const { isLoading } = users;

  const [activeTab, setActiveTab] = useState("1");

  const onChange = (key) => {
    setActiveTab(key);
  };

  const updateUsersData = () => {
    dispatch(getUnverifiedUsers());
    dispatch(getUsers());
  };

  useEffect(() => {
    updateUsersData();
  }, [dispatch]);

  useEffect(() => {
    setUnverifiedUsersCount(unverifiedUsers ? unverifiedUsers.data.length : 0);
  }, [unverifiedUsers]);

  const findUser = (name) => {
    if (name) {
      const params = {
        name: name,
      };
      dispatch(getUsersByName(params));
    } else {
      dispatch(getUsers());
    }
  };

  const tabs = [
    {
      key: "1",
      label: t("COMMON.USERS"),
      children: <UsersTable />,
    },
    {
      key: "2",
      label: t("COMMON.USER_APPLICATIONS") + ` (${unverifiedUsersCount})`,
      children: (
        <UsersVerificationModal
          dispatch={updateUsersData}
          isOpen={isUserApprovalModalOpen}
          onCancel={() => setIsUserApprovalModalOpen(false)}
        />
      ),
    },
  ];

  return (
    <div className="users-control">
      <Loader show={isLoading} />
      <Row align="bottom">
        <Col xs={24} sm={24} md={14}>
          <Typography.Title level={2}>
            {t("COMMON.USER_MANAGEMENT")}
          </Typography.Title>
        </Col>
        <Col flex="auto">
          {activeTab === "1" && (
            <Flex justify="flex-end">
              <SearchInput width="200" onChange={findUser} />
              <AdminPanelControls>
                <Flex gap="middle">
                  <Button
                    type="primary"
                    onClick={() => setIsAddUserModalOpen(true)}
                  >
                    {t("COMMON.CREATE_USER")}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => setSendNotificationModalOpen(true)}
                  >
                    {t("COMMON.SEND_NOTIFICATION")}
                  </Button>
                </Flex>
              </AdminPanelControls>
            </Flex>
          )}
        </Col>
      </Row>
      <Tabs items={tabs} onChange={onChange} />
      <UserModal
        type={ModalType.ADD}
        isOpen={isAddUserModalOpen}
        onOk={() => setIsAddUserModalOpen(false)}
        onCancel={() => setIsAddUserModalOpen(false)}
      />
      <NotificationModal
        isOpen={isSendNotificationModalOpen}
        onOk={() => setSendNotificationModalOpen(false)}
        onCancel={() => setSendNotificationModalOpen(false)}
      />
    </div>
  );
}

export default UsersControl;
