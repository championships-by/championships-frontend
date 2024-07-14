import { Modal, Form, Button, message, Space } from 'antd'
import { useState } from 'react'
import FormItem from 'antd/es/form/FormItem'
import UserLastnameInput from '@src/UI/user/user-lastname-input.jsx'
import UserFirstnameInput from '@src/UI/user/user-firstname-input.jsx'
import UserPatronymicInput from '@src/UI/user/user-patronymic-input.jsx'
import UserRoleInput from '@src/UI/user/user-role-input.jsx'
import UserEmailInput from '@src/UI/user/user-email-input.jsx'
import UserPasswordInput from '@src/UI/user/user-password-input.jsx'
import UserPhoneInput from '@src/UI/user/user-phone-input.jsx'
import UserOrganizationInput from '@src/UI/user/user-organization-input.jsx'

function UserModal({ isOpen, onOk, onCancel }) {
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish = () => {
    message.success('Всё в порядке!')
    setIsLoading(false)
  }

  const onFinishFailed = () => {
    message.error('Проверьте поля для ввода!')
    setIsLoading(false)
  }

  const create_user_request = async () => {
    const myHeaders = new Headers()
    myHeaders.append('accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      email: form.getFieldValue('email'),
      first_name: form.getFieldValue('first_name'),
      second_name: form.getFieldValue('second_name'),
      third_name: form.getFieldValue('third_name'),
      phone: form.getFieldValue('phone'),
      role: form.getFieldValue('role'),
      educational_institution: form.getFieldValue('organization'),
      password: form.getFieldValue('password'),
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include',
    }
    await fetch(`${API_PATH}/user/create_user`, requestOptions)
  }

  return (
    <Modal
      title="Настройка пользователя"
      className="user-control__modal"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
    >
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <UserLastnameInput name="second_name" />
        <UserFirstnameInput name="first_name" />
        <UserPatronymicInput name="third_name" />

        <UserRoleInput name="role" />

        <UserEmailInput name="email" />
        <UserPasswordInput name="password" />

        <UserPhoneInput name="phone" />
        <UserOrganizationInput name="organization" />

        <Space>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              onClick={() => {
                setIsLoading(true)
                create_user_request()
              }}
            >
              Сохранить
            </Button>
          </FormItem>
          <FormItem>
            <Button onClick={onCancel}>Отмена</Button>
          </FormItem>
        </Space>
      </Form>
    </Modal>
  )
}

export default UserModal
