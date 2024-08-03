import { Button, message, Typography } from "antd";
import { useState } from "react";
import Loader from "@components/loader/Loader";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import UserModal from "./UserModal";
import UsersTable from "./UsersTable";

import "./sass/users-control.scss";

function UsersControl() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataUsers, setUsers] = useState([]);

  if (isLoading) {
    fetch(`${API_PATH}/user/users`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      redirect: "follow",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch(() =>
        message.error("Невозможно получить данные. Обратитесь к администратору")
      )
      .finally(() => setTimeout(() => setIsLoading(false), 300));
  }

  return (
    <div className="users-control">
      <Loader show={isLoading} />
      <Typography.Title level={2}>Управление пользователями</Typography.Title>
      <AdminPanelControls>
        <Button type="primary" onClick={() => setIsAddUserModalOpen(true)}>
          Добавить пользователя
        </Button>
      </AdminPanelControls>
      <UsersTable usersData={dataUsers} />
      <UserModal
        isOpen={isAddUserModalOpen}
        onOk={() => setIsAddUserModalOpen(false)}
        onCancel={() => setIsAddUserModalOpen(false)}
      />
    </div>
  );
}

export default UsersControl;
