import React from 'react'
import { Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import './sass/auth.scss'

const AuthEmailInput = ({ value, onChange }) => {
  return (
    <FormItem
      name="Email"
      сlassName="auth-email-input"
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите Email',
        },
        {
          type: 'email',
          message: 'Некоректный Email',
        },
      ]}
    >
      <Input
        type="email"
        // pattern="+@gmail.com"
        id="user_email_input"
        placeholder="Email..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </FormItem>
  )
}

export default AuthEmailInput
