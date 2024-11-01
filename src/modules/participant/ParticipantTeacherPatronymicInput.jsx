import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";

const rules = [
  {
    pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
    message: "Отчество может содержать только буквы",
  },
  {
    min: 3,
    message: "Минимум 3 символа",
  },
  {
    max: 255,
    message: "Максимальное значение 255",
  },
];

function ParticipantTeacherPatronymicInput({ name, value }) {
  return (
    <FormItem name={name} hasFeedback validateFirst rules={rules}>
      <Flex vertical>
        <Typography.Text>
          Отчество педагога(если таковое имеется)
        </Typography.Text>
        <Input
          prefix={<TeamOutlined />}
          allowClear
          placeholder="Введите отчество педагога"
          id="participant_teacher_sname_input"
          maxLength={255}
          value={value}
        />
        <Typography.Text type="secondary">Пример: Иванович</Typography.Text>
      </Flex>
    </FormItem>
  );
}
export default ParticipantTeacherPatronymicInput;
