import React from 'react'
import { Flex, Input, Typography } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/password-change.scss'

function OldPassword({ name }) {
  const realOldPassword = '12345678'
  return (
    <Flex vertical className="password-change__old-password__flex">
      <Typography.Text>Старый пароль</Typography.Text>
      <FormItem
        name={name}
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
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || value === realOldPassword) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Старый пароль не совпадает'))
            },
          }),
        ]}
        className="password-change__old-password__formitem"
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Введите старый Пароль"
          iconRender={() => <EyeInvisibleOutlined />}
        />
      </FormItem>
    </Flex>
  )
}

export default OldPassword
