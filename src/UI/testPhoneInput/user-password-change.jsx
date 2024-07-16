import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Flex, message, Form } from 'antd'
import { useState } from 'react'
import FormItem from 'antd/es/form/FormItem'

function UserPasswordModal({ isOpen, onOk, onCancel }) {
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = () => {
    message.success('Всё в порядке!')
    setIsLoading(false)
  }

  const onFinishFailed = () => {
    message.error('Проверьте поля для ввода!')
    setIsLoading(false)
  }

  return (
    <Modal
      title="Добавить участника"
      style={{
        top: 20,
      }}
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
    >
      <Form
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <FormItem
          name="OldPassword"
          hasFeedback
          validateFirst
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите свой пароль',
            },
            {
              min: 8,
              message: 'Минимальная длина пароля - 8 символов',
            },
          ]}
          style={{
            marginBottom: '0px',
          }}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Введите старый Пароль"
            iconRender={() => <EyeInvisibleOutlined />}
          />
        </FormItem>
        <FormItem
          name="NewPassword"
          hasFeedback
          validateFirst
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите пароль',
            },
            {
              min: 8,
              message: 'Минимальная длина пароля - 8 символов',
            },
          ]}
          style={{
            marginBottom: '0px',
          }}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Введите новый пароль"
            iconRender={() => <EyeInvisibleOutlined />}
          />
        </FormItem>

        <FormItem
          name="SecondNewPassword"
          hasFeedback
          validateFirst
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите пароль',
            },
            {
              min: 8,
              message: 'Минимальная длина пароля - 8 символов',
            },
          ]}
          style={{
            marginBottom: '0px',
          }}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Повторите новый пароль"
            iconRender={() => <EyeInvisibleOutlined />}
          />
        </FormItem>

        <Flex gap="middle">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={() => setIsLoading(true)}
          >
            Сохранить данные
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Flex>
      </Form>
    </Modal>
  )
}

export default UserPasswordModal
