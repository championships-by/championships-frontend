/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Flex, Input, Typography } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import InputMask from 'react-input-mask';

function UserPhoneInput({ name }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <Flex
      vertical
      style={{
        marginBottom: '24px',
      }}
    >
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
            pattern: /^\+375-\d{2}-\d{3}-\d{2}-\d{2}$/,
            message:
              'Пожалуйста, введите номер телефона в соответствии с примером',
          },
        ]}
        style={{
          marginBottom: '0px',
        }}
      >
        <InputMask
          mask="+375-99-999-99-99"
          value={phoneNumber}
          onChange={handleChange}
          maskChar="_"
          alwaysShowMask
          prefix={<PhoneOutlined />}
          type="tel"
          allowClear
          placeholder="Введите телефон"
          maxLength={19}
        />
      </FormItem>
      <Typography.Text type="secondary">
        Пример: +375-25-123-45-67
      </Typography.Text>
    </Flex>
  );
}

export default UserPhoneInput;