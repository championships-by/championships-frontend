import { Table, Flex, Button, Typography, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UserModal from "@components/usersControl/UserModal";
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, updateUser } from '@store/slices';
import { useState } from "react";

function UsersTable() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const deleteUserConfirm = (id) => {
    Modal.confirm({
      title: "Вы уверены?",
      content: "Вы уверены что хотите удалить этого пользователя?",
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
          <CancelBtn />
        </>
      ),
      onOk: () => {
        dispatch(deleteUser(id));
      },
      onCancel: () => {},
      okText: "Да",
      cancelText: "Отмена",
    })
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const columns = [
    {
      title: "ФИО",
      key: "fullname",
      render: (_, { first_name, second_name, third_name }) => (
        <Typography.Text>{`${second_name} ${first_name} ${third_name}`}</Typography.Text>
      ),
    },
    {
      title: "Роль",
      key: "role",
      render: (_, { role }) =>
        role === "admin" ? (
          <Typography.Text>Админ</Typography.Text>
        ) : role === "judge" ? (
          <Typography.Text>Судейство</Typography.Text>
        ) : role === "specialist" ? (
          <Typography.Text>Специалист</Typography.Text>
        ) : (
          <Typography.Text />
        ),
    },
    {
      title: "Действия",
      key: "action",
      render: (_, { id }) => (
        <Flex>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openEditModal(users.find((user) => user.id === id))}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => deleteUserConfirm(id)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={users} columns={columns} />

      <UserModal
        isOpen={isEditModalOpen}
        onOk={(user) => {
          dispatch(updateUser(user));
          setIsEditModalOpen(false);
        }}
        onCancel={() => setIsEditModalOpen(false)}
        user={selectedUser}
      />
    </>
  );
}

export default UsersTable;