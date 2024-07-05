import React from 'react'
import { Flex, Input, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/user.scss'

function UserPatronymicInput({ name }) {
  return (
    <Flex vertical className="user__patronymic-input__flex">
      <Typography.Text>Отчество (если таковое имеется)</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            max: 255,
            message: 'Максимальное значение 255',
          },
        ]}
        className="user__patronymic-input__formitem"
      >
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder="Введите отчество"
          maxLength={255}
        />
      </FormItem>
      <Typography.Text type="secondary">Пример: Иванович</Typography.Text>
    </Flex>
  )
}

export default UserPatronymicInput
