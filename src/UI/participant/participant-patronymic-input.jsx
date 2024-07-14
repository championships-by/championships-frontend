import React from 'react'
import { Flex, Input, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'

function ParticipantPatronymicInput({ name }) {
  return (
    <FormItem name={name} hasFeedback validateFirst>
      <Flex vertical>
        <Typography.Text>Отчество (если таковое имеется)</Typography.Text>
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder="Введите отчество"
          maxLength={255}
        />
        <Typography.Text type="secondary">Пример: Иванович</Typography.Text>
      </Flex>
    </FormItem>
  )
}

export default ParticipantPatronymicInput
