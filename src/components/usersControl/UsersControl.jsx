import { Button, message, Typography } from "antd";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '@store/slices';
import Loader from "@components/loader/Loader";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import UserModal from "./UserModal";
import UsersTable from "./UsersTable";

import "./sass/users-control.scss";

function UsersControl() {
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.users);
  const isLoading = useSelector((state) => state.isLoading);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

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
        isOpen={isAddUserModalOpen}
        onOk={() => setIsAddUserModalOpen(false)}
        onCancel={() => setIsAddUserModalOpen(false)}
        user={{}}
      />
    </div>
  );
}

export default UsersControl;