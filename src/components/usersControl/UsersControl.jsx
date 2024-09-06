import { userApi } from "@api";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import Loader from "@components/loader/Loader";
import { ModalType } from "@constants";
import { Button, message, Typography, Row, Col, Divider } from "antd";
import { useEffect, useState } from "react";
import UserModal from "./UserModal";
import UsersTable from "./UsersTable";

import "./sass/users-control.scss";

function UsersControl() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataUsers, setUsers] = useState([]);

  useEffect(() => {
    if (isLoading) {
      getUsers();
    }
  });

  const getUsers = () => {
    userApi
      .getUsers()
      .then((data) => setUsers(data))
      .catch(() =>
        message.error("Невозможно получить данные. Обратитесь к администратору")
      )
      .finally(() => setTimeout(() => setIsLoading(false), 300));
  };

  return (
    <div className="users-control">
      <Loader show={isLoading} />
      <Row align="bottom">
        <Col>
          <Typography.Title level={2}>
            Управление пользователями
          </Typography.Title>
        </Col>
        <Col flex="auto">
          <AdminPanelControls>
            <Button type="primary" onClick={() => setIsAddUserModalOpen(true)}>
              Добавить пользователя
            </Button>
          </AdminPanelControls>
        </Col>
      </Row>
      <Divider />
      <UsersTable usersData={dataUsers} />
      <UserModal
        type={ModalType.ADD}
        isOpen={isAddUserModalOpen}
        onOk={() => setIsAddUserModalOpen(false)}
        onCancel={() => setIsAddUserModalOpen(false)}
        onAdd={getUsers}
      />
    </div>
  );
}

export default UsersControl;
