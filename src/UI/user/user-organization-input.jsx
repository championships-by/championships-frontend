import React from 'react'
import { Flex, Input, Typography } from 'antd'
import { BankOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/user.scss'

function UserOrganizationInput({ name }) {
  return (
    <Flex vertical className="user__organization-input__flex">
      <Typography.Text>Учреждение образования</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        className="user__organization-input__formitem"
      >
        <Input
          prefix={<BankOutlined />}
          placeholder="Введите учреждение образования"
        />
      </FormItem>
      <Typography.Text type="secondary">
        Пример: ГУО "Гимназия-колледж искусств"
      </Typography.Text>
    </Flex>
  )
}

export default UserOrganizationInput
