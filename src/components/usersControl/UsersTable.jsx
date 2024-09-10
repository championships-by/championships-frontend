import { EditOutlined } from "@ant-design/icons";
import UserModal from "@components/usersControl/UserModal";
import { Locale, ModalType, ROLE_FILTERS } from "@constants";
import { Button, Flex, Table, Tooltip, Typography } from "antd";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "@store/users";

function UsersTable(usersData) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const changeUserData = (userData) => {
    dispatch(updateUser(userData));
    setIsEditModalOpen(false);
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
      filters: ROLE_FILTERS,
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: "Действия",
      key: "action",
      render: () => (
        <Flex>
          <Tooltip title="Редактирование">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal()}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={usersData} columns={columns} locale={Locale} />

      <UserModal
        type={ModalType.EDIT}
        isOpen={isEditModalOpen}
        onOk={() => changeUserData()}
        onCancel={() => setIsEditModalOpen(false)}
      />
    </>
  );
}

export default UsersTable;