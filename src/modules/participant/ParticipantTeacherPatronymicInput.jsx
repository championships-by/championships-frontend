import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";

function ParticipantTeacherPatronymicInput({ name }) {
  return (
    <FormItem name={name} hasFeedback validateFirst>
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
        />
        <Typography.Text type="secondary">Пример: Иванович</Typography.Text>
      </Flex>
    </FormItem>
  );
}
export default ParticipantTeacherPatronymicInput;
