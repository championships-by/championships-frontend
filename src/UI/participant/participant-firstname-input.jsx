import React from 'react'
import { Flex, Input, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'

function ParticipantFirstnameInput({ name }) {
  return (
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
    >
      <Flex vertical>
        <Typography.Text>Имя</Typography.Text>
        <Input
          allowClear
          prefix={<UserOutlined />}
          placeholder="Введите имя"
          maxLength={255}
          id="participant_fname_input"
        />
        <Typography.Text type="secondary">Пример: Иван</Typography.Text>
      </Flex>
    </FormItem>
  )
}

export default ParticipantFirstnameInput
