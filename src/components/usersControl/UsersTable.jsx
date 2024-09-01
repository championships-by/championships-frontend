import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UserModal from "@components/usersControl/UserModal";
import { Locale } from "@constants";
import { Button, Flex, Modal, Table, Typography } from "antd";
import { useState } from "react";

const filters = [
  {
    text: "Админ",
    value: "admin",
  },
  {
    text: "Судейство",
    value: "judge",
  },
  {
    text: "Специалист",
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

  const deleteUserConfirm = () => {
    Modal.confirm({
      title: "Вы уверены?",
      content: "Вы уверены что хотите удалить этого пользователя?",
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
          <CancelBtn />
        </>
      ),
      okText: "Да",
      cancelText: "Отмена",
    });
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const changeUserData = () => {
    setIsEditModalOpen(false);
  };

  const columns = [
    {
      title: "ФИО",
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
          <Typography.Text>Админ</Typography.Text>
        ) : role === "judge" ? (
          <Typography.Text>Судейство</Typography.Text>
        ) : role === "specialist" ? (
          <Typography.Text>Специалист</Typography.Text>
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
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openEditModal()}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => deleteUserConfirm()}
          />
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={usersData} columns={columns} locale={Locale} />

      <UserModal
        isOpen={isEditModalOpen}
        onOk={() => changeUserData()}
        onCancel={() => setIsEditModalOpen(false)}
      />
    </>
  );
}

export default UsersTable;
