import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";

const rules = [
  {
    required: true,
    message: "Пожалуйста, введите имя педагога",
  },
  {
    pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
    message: "Имя может содержать только буквы",
  },
  {
    min: 2,
    message: "Минимум 2 символа",
  },
  {
    max: 255,
    message: "Максимальное значение 255",
  },
];

function ParticipantTeacherFirstnameInput({ name, value }) {
  return (
    <FormItem name={name} hasFeedback validateFirst rules={rules}>
      <Flex vertical>
        <Typography.Text>Имя педагога</Typography.Text>
        <Input
          allowClear
          prefix={<TeamOutlined />}
          placeholder="Введите имя педагога"
          id="participant_teacher_fname_input"
          maxLength={255}
          value={value}
        />
        <Typography.Text type="secondary">Пример: Иван</Typography.Text>
      </Flex>
    </FormItem>
  );
}

export default ParticipantTeacherFirstnameInput;
