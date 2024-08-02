import React, { useCallback } from 'react'
import { Flex, Input, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/user.scss'
import { handlePaste } from './handlePaste'

function UserLastnameInput({ name }) {
  const handleKeyPress = (event) => {
    if (event.key === ' ') {
      event.preventDefault()
    }
  }

  return (
    <Flex vertical className="user__lastname-input__flex">
      <Typography.Text>Фамилия</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        shouldUpdate={true}
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите фамилию',
          },
          {
            max: 255,
            message: 'Максимальное значение 255',
          },
          {
            validator(_, value) {
              if (value && value.trim()) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('Пожалуйста, введите корректную фамилию')
              )
            },
          },
        ]}
        className="user__lastname-input__formitem"
      >
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder="Введите фамилию"
          maxLength={255}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
        />
      </FormItem>
      <Typography.Text type="secondary">Пример: Иванов</Typography.Text>
    </Flex>
  )
}

export default UserLastnameInput
