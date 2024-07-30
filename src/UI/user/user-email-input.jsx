import React, { useCallback } from 'react'
import { Flex, Input, Typography } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/user.scss'

function UserEmailInput({ name }) {
  const handleKeyPress = (event) => {
    if (event.key === ' ') {
      event.preventDefault()
    }
  }

  const handlePaste = useCallback((event) => {
    event.preventDefault()
    const clipboardData = (event.clipboardData || window.clipboardData).getData(
      'text'
    )
    const sanitizedData = clipboardData.replace(/\s/g, '')
    const input = event.target
    const value = input.value
    const selectionStart = input.selectionStart
    const selectionEnd = input.selectionEnd
    input.value =
      value.substring(0, selectionStart) +
      sanitizedData +
      value.substring(selectionEnd)
    input.setSelectionRange(
      selectionStart + sanitizedData.length,
      selectionStart + sanitizedData.length
    )
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }, [])

  return (
    <Flex vertical className="user__email-input__flex">
      <Typography.Text>Email</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        shouldUpdate={true}
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
        className="user__email-input__formitem"
      >
        <Input
          prefix={<MailOutlined />}
          type="email"
          placeholder="Введите Email"
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
        />
      </FormItem>
      <Typography.Text type="secondary">
        Пример: example@example.com
      </Typography.Text>
    </Flex>
  )
}

export default UserEmailInput
