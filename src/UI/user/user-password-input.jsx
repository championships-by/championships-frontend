import React from 'react'
import { Flex, Input, Typography } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/user.scss'

function UserPasswordInput({ name, required }) {
  return (
    <Flex vertical className="user__password-input__flex">
      <Typography.Text>Пароль</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: required ?? false,
            message: 'Пожалуйста введите пароль',
          },
          {
            min: 8,
            message: 'Минимальная длина пароля - 8 символов',
          },
        ]}
        className="user__password-input__formitem"
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Введите Пароль"
          iconRender={() => <EyeInvisibleOutlined />}
        />
      </FormItem>
    </Flex>
  )
}

export default UserPasswordInput
