import { userApi } from "@api";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import Loader from "@components/loader/Loader";
import { ModalType } from "@constants";
import { Button, message, Typography } from "antd";
import { useState } from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getUsersSelector, getIsLoadingSelector } from '@store/users';
import Loader from "@components/loader/Loader";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import UserModal from "./UserModal";
import UsersTable from "./UsersTable";

import "./sass/users-control.scss";

function UsersControl() {
  const dispatch = useDispatch();
  const dataUsers = useSelector(getUsersSelector);
  const isLoading = useSelector(getIsLoadingSelector);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  if (isLoading) {
    userApi
      .getUsers()
      .then((data) => setUsers(data))
      .catch(() =>
        message.error("Невозможно получить данные. Обратитесь к администратору")
      )
      .finally(() => setTimeout(() => setIsLoading(false), 300));
  }
  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .catch(() => message.error("Невозможно получить данные. Обратитесь к администратору"));
  }, [dispatch]);

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
        type={ModalType.ADD}
        isOpen={isAddUserModalOpen}
        onOk={() => setIsAddUserModalOpen(false)}
        onCancel={() => setIsAddUserModalOpen(false)}
        user={{}}
      />
    </div>
  );
}

export default UsersControl;