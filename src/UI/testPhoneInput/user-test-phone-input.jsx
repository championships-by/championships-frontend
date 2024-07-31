import React,{useState} from 'react'
import { Flex, Input, Typography } from 'antd'
import { PhoneOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/user.scss'

function UserPhoneInput({ name }) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const handlePhoneChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, '')
    const parts = [
      inputValue.length > 0 ? '+375' : '',
      inputValue.length > 3 ? `(${inputValue.slice(3, 5)})` : '',
      inputValue.length > 5 ? `${inputValue.slice(5, 8)}` : '',
      inputValue.length > 8 ? `-${inputValue.slice(8, 10)}` : '',
      inputValue.length > 10 ? `-${inputValue.slice(10, 12)}` : '',
    ]
    const formattedValue = parts.filter(Boolean).join('')
    setPhoneNumber(formattedValue)
  }
  const handleKeyDown = (event) =>{
    if (event.key == 'Backspace') {
      const currentValue = phoneNumber.replace(/\D/g, '')
      const newValue = currentValue.slice(0, -1)
      handlePhoneChange({ target: { value: newValue } }) 
    }
  } 
  return (
    <Flex vertical className="user__phone-input__flex">
      <Typography.Text>Телефон</Typography.Text>
      <FormItem
        //name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите телефон',
          },
          {
            pattern: /\+\d{3}\(\d{2}\)\d{3}-\d{2}-\d{2}/,
            message:
              'Пожалуйста, введите номер телефона в соответствии с примером',
          },
        ]}
        className="user__phone-input__formitem"
      >
        <Input
          value={phoneNumber}
          onChange={handlePhoneChange}
          onKeyDown={handleKeyDown}
          prefix={<PhoneOutlined />}
          type="tel"
          allowClear
          placeholder="Введите телефон"
          maxLength={19}
        />
      </FormItem>
      <Typography.Text type="secondary">
        Пример: +375(25)123-45-67
      </Typography.Text>
    </Flex>
  )
}
export default UserPhoneInput