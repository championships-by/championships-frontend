import React from 'react'
import { Flex, Input, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/user.scss'

function UserFirstnameInput({ name }) {
  return (
    <Flex vertical className="user__firstname-input__flex">
      <Typography.Text>Имя</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите имя',
          },
          {
            max: 255,
            message: 'Максимальное значение 255',
          },
        ]}
        className="user__firstname-input__formitem"
      >
        <Input
          allowClear
          prefix={<UserOutlined />}
          placeholder="Введите имя"
          maxLength={255}
        />
      </FormItem>
      <Typography.Text type="secondary">Пример: Иван</Typography.Text>
    </Flex>
  )
}

export default UserFirstnameInput
