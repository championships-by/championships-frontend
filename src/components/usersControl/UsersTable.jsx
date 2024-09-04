import { EditOutlined } from "@ant-design/icons";
import UserModal from "@components/usersControl/UserModal";
import { Locale, ModalType } from "@constants";
import { Button, Flex, Table, Tooltip, Typography } from "antd";
import { useState } from "react";

const filters = [
  {
    text: "Администратор",
    value: "admin",
  },
  {
    text: "Судья",
    value: "judge",
  },
  {
    text: "Менеджер",
    value: "specialist",
  },
];

function UsersTable({ usersData }) {
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, updateUser, getUsersSelector } from '@store/users';
import { useState } from "react";

function UsersTable() {
  const users = useSelector(getUsersSelector);
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
      title: "Фамилия имя отчество",
      key: "fullname",
      render: (_, { first_name, second_name, third_name }) => (
        <Typography.Text>{`${second_name} ${first_name} ${third_name}`}</Typography.Text>
      ),
      sorter: (a, b) => {
        const firstFullName = `${a.second_name} ${a.first_name} ${a.third_name}`;
        const secondFullName = `${b.second_name} ${b.first_name} ${b.third_name}`;

        return firstFullName.localeCompare(secondFullName);
      },
    },
    {
      title: "Роль",
      key: "role",
      render: (_, { role }) =>
        role === "admin" ? (
          <Typography.Text>Администратор</Typography.Text>
        ) : role === "judge" ? (
          <Typography.Text>Судья</Typography.Text>
        ) : role === "specialist" ? (
          <Typography.Text>Менеджер</Typography.Text>
        ) : (
          <Typography.Text />
        ),
      filters: filters,
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: "Действия",
      key: "action",
      render: (_, { id }) => (
        <Flex>
          <Tooltip title="Редактирование">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal()}
            />
          </Tooltip>
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
      <Table dataSource={usersData} columns={columns} locale={Locale} />
=======
      <Table dataSource={users} columns={columns} />

      <UserModal
        type={ModalType.EDIT}
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