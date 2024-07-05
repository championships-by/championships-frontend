import React from 'react'
import { Flex, Input, Typography } from 'antd'
import { PhoneOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/user.scss'

function UserPhoneInput({ name }) {
  return (
    <Flex vertical className="user__phone-input__flex">
      <Typography.Text>Телефон</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите телефон',
          },
          {
            pattern: /\+375-[0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/,
            message:
              'Пожалуйста, введите номер телефона в соответствии с примером',
          },
        ]}
        className="user__phone-input__formitem"
      >
        <Input
          prefix={<PhoneOutlined />}
          type="tel"
          allowClear
          placeholder="Введите телефон"
          maxLength={17}
        />
      </FormItem>
      <Typography.Text type="secondary">
        Пример: +375-25-123-45-67
      </Typography.Text>
    </Flex>
  )
}

export default UserPhoneInput
