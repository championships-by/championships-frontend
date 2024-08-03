import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";

function ParticipantTeacherLastnameInput({ name }) {
  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: "Пожалуйста, введите фамилию учителя",
        },
        {
          max: 255,
          message: "Максимальное значение 255",
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>Фамилия педагога</Typography.Text>
        <Input
          prefix={<TeamOutlined />}
          allowClear
          placeholder="Введите фамилию педагога"
          id="participant_teacher_lname_input"
          maxLength={255}
        />
        <Typography.Text type="secondary">Пример: Иванов</Typography.Text>
      </Flex>
    </FormItem>
  );
}
export default ParticipantTeacherLastnameInput;
