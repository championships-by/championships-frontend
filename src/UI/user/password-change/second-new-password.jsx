import React from 'react'
import { Flex, Input, Typography } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/password-change.scss'

function SecondNewPassword({ name }) {
  return (
    <Flex vertical className="password-change__second-new-password__flex">
      <Typography.Text>Повторно новый пароль</Typography.Text>
      <FormItem
        name={name}
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
        className="password-change__second-new-password__formitem"
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Повторите новый пароль"
          iconRender={() => <EyeInvisibleOutlined />}
        />
      </FormItem>
    </Flex>
  )
}

export default SecondNewPassword
