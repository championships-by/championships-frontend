import React, { useCallback } from 'react'
import { Input, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/user.scss'

function UserPatronymicInput({ name }) {
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
    <div className="user__patronymic-input__flex">
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
        className="user__patronymic-input__formitem"
      >
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder="Введите отчество"
          maxLength={255}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
        />
      </FormItem>
      <Typography.Text type="secondary">Пример: Иванович</Typography.Text>
    </div>
  )
}

export default UserPatronymicInput
