/* eslint-disable prettier/prettier */
import React,{useState} from 'react'
import { Flex, Input, Typography } from 'antd'
import { PhoneOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
//import './sass/user.scss'

function UserPhoneInput({ name }) {
  const [phoneNumber,setPhoneNumber] = useState('+375')
  const handlePhoneChange = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    let formattedValue = '';

    if (value.length > 0) {
      formattedValue += '+375'; // Код страны
    }
    if (value.length > 3) {
      formattedValue += ' (' + value.slice(3, 5); // Код оператора
    }
    if (value.length >= 5) {
      formattedValue += ') ' + value.slice(5, 8); // Первые 3 цифры номера
    }
    if (value.length >= 8) {
      formattedValue += '-' + value.slice(8, 10); // Следующие 2 цифры
    }
    if (value.length >= 10) {
      formattedValue += '-' + value.slice(10, 12); // Последние 2 цифры
    }

    setPhoneNumber(formattedValue);
  };

  const handleKeyDown = (event) =>{
    if(event.key == 'Backspace'){
      const currentValue = phoneNumber.replace(/\D/g, ''); // Удаляем все нецифровые символы
      const newValue = currentValue.slice(0, -1); // Удаляем последнюю цифру
      handlePhoneChange({ target: { value: newValue } }); // Обновляем телефон с удаленной цифрой
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