import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUsersByName, getUsersSelector } from "@store/users";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import Loader from "@components/loader/Loader";
import { ModalType } from "@constants";
import { Button, message, Flex, Typography, Row, Col, Divider } from "antd";
import SearchInput from "@modules/search/SearchInput";
import UserModal from "./UserModal";
import UsersTable from "./UsersTable";
import { useTranslation } from "react-i18next";

import "./sass/users-control.scss";

function UsersControl() {
  const { t } = useTranslation();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector);
  const isLoading = users.isLoading;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
          <Flex justify="flex-end">
            <SearchInput onChange={findUser} />
            <AdminPanelControls>
              <Button
                type="primary"
                onClick={() => setIsAddUserModalOpen(true)}
              >
                {t("COMMON.CREATE_USER")}
              </Button>
            </AdminPanelControls>
          </Flex>
        </Col>
      </Row>
      <Divider />
      <UsersTable />
      <UserModal
        type={ModalType.ADD}
        isOpen={isAddUserModalOpen}
        onOk={() => setIsAddUserModalOpen(false)}
        onCancel={() => setIsAddUserModalOpen(false)}
      />
    </div>
  );
}

export default UsersControl;
