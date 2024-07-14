import { Table, Flex, Button, Typography, Modal } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import UserModal from '@components/users-control/user-modal'
import { useState } from 'react'

function UsersTable({ usersData }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

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
      title: 'Вы уверены?',
      content: 'Вы уверены что хотите удалить этого пользователя?',
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
          <CancelBtn />
        </>
      ),
      okText: 'Да',
      cancelText: 'Отмена',
    })
  }

  const openEditModal = () => {
    setIsEditModalOpen(true)
  }

  const changeUserData = () => {
    setIsEditModalOpen(false)
  }

  const columns = [
    {
      title: 'ФИО',
      key: 'fullname',
      render: (_, { first_name, second_name, third_name }) => (
        <Typography.Text>{`${second_name} ${first_name} ${third_name}`}</Typography.Text>
      ),
    },
    {
      title: 'Роль',
      key: 'role',
      render: (_, { role }) =>
        role === 'admin' ? (
          <Typography.Text>Админ</Typography.Text>
        ) : role === 'judge' ? (
          <Typography.Text>Судейство</Typography.Text>
        ) : role === 'specialist' ? (
          <Typography.Text>Специалист</Typography.Text>
        ) : (
          <Typography.Text></Typography.Text>
        ),
    },
    {
      title: 'Действия',
      key: 'action',
      render: () => (
        <Flex>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openEditModal()}
          ></Button>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => deleteUserConfirm()}
          ></Button>
        </Flex>
      ),
    },
  ]

  return (
    <>
      <Table dataSource={usersData} columns={columns} />

      <UserModal
        isOpen={isEditModalOpen}
        onOk={() => changeUserData()}
        onCancel={() => setIsEditModalOpen(false)}
      />
    </>
  )
}

export default UsersTable
