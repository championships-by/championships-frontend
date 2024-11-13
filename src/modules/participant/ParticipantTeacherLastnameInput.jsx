import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";

const rules = [
  {
    required: true,
    message: "Пожалуйста, введите фамилию учителя",
  },
  {
    pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
    message: "Фамилия может содержать только буквы",
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

function ParticipantTeacherLastnameInput({ name, value }) {
  return (
    <FormItem name={name} hasFeedback validateFirst rules={rules}>
      <Flex vertical>
        <Typography.Text>Фамилия педагога</Typography.Text>
        <Input
          prefix={<TeamOutlined />}
          allowClear
          placeholder="Введите фамилию педагога"
          id="participant_teacher_lname_input"
          maxLength={255}
          value={value}
        />
        <Typography.Text type="secondary">Пример: Иванов</Typography.Text>
      </Flex>
    </FormItem>
  );
}
export default ParticipantTeacherLastnameInput;
