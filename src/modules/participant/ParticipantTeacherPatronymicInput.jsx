import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function ParticipantTeacherPatronymicInput({ name, value }) {
  const { t } = useTranslation();

  const rules = [
    {
      pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
      message: t("RULES.THIRD_NAME_CAN_CONTAIN_ONLY_LETTERS"),
    },
    {
      min: 2,
      message: t("RULES.MIN_2_SYMBOLS"),
    },
    {
      max: 255,
      message: t("RULES.MAX_255_SYMBOLS"),
    },
  ];

  return (
    <FormItem name={name} hasFeedback validateFirst rules={rules}>
      <Flex vertical>
        <Typography.Text>
          {t("COMMON.TEACHER_THIRD_NAME_IF_EXIST")}
        </Typography.Text>
        <Input
          prefix={<TeamOutlined />}
          allowClear
          placeholder={t("COMMON.ENTER_TEACHER_THIRD_NAME")}
          id="participant_teacher_sname_input"
          maxLength={255}
          value={value}
        />
        <Typography.Text type="secondary">
          {t("COMMON.THIRD_NAME_EXAMPLE")}
        </Typography.Text>
      </Flex>
    </FormItem>
  );
}
export default ParticipantTeacherPatronymicInput;
