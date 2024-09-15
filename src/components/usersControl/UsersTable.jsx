import { EditOutlined } from "@ant-design/icons";
import UserModal from "@components/usersControl/UserModal";
import { Locale, ModalType } from "@constants";
import { Button, Flex, Table, Tooltip, Typography } from "antd";
import { useState } from "react";

const filters = [
  {
    text: Locale.roles.admin,
    value: "admin",
  },
  {
    text: Locale.roles.judge,
    value: "judge",
  },
  {
    text: Locale.roles.specialist,
    value: "specialist",
  },
];

function UsersTable({ usersData }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // const delete_user_request = async () => {
  //     const myHeaders = new Headers();
  // 	myHeaders.append("accept", "application/json");
  // 	myHeaders.append("Content-Type", "application/json");

  // 	const raw = JSON.stringify({
  // 	email: form.getFieldValue('email'),
  // 	first_name: form.getFieldValue('first_name'),
  // 	second_name: form.getFieldValue('second_name'),
  // 	third_name: form.getFieldValue('third_name'),
  // 	phone: form.getFieldValue('phone'),
  // 	role: form.getFieldValue('role'),
  // 	educational_institution: form.getFieldValue('organization'),
  // 	password: form.getFieldValue('password'),
  // 	});

  // 	const requestOptions = {
  // 	method: "POST",
  // 	headers: myHeaders,
  // 	body: raw,
  // 	redirect: "follow",
  // 	credentials: 'include',
  // 	};
  //     await fetch(`${API_PATH}/user/delete`, requestOptions)
  // }

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const changeUserData = () => {
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
          <Typography.Text>{Locale.roles.admin}</Typography.Text>
        ) : role === "judge" ? (
          <Typography.Text>{Locale.roles.judge}</Typography.Text>
        ) : role === "specialist" ? (
          <Typography.Text>{Locale.roles.specialist}</Typography.Text>
        ) : (
          <Typography.Text />
        ),
      filters: filters,
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
              onClick={openEditModal}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={usersData}
        pagination={{
          position: ["bottomCenter"],
        }}
        columns={columns}
        locale={Locale}
      />

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
