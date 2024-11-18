import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function ParticipantTeacherFirstnameInput({ name, value }) {
  const { t } = useTranslation();

  const rules = [
    {
      required: true,
      message: t("RULES.ENTER_TEACHER_NAME"),
    },
    {
      pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
      message: t("RULES.NAME_CAN_CONTAIN_ONLY_LETTERS"),
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
        <Typography.Text>{t("COMMON.TEACHER_NAME")}</Typography.Text>
        <Input
          allowClear
          prefix={<TeamOutlined />}
          placeholder={t("COMMON.ENTER_TEACHER_NAME")}
          id="participant_teacher_fname_input"
          maxLength={255}
          value={value}
        />
        <Typography.Text type="secondary">
          {t("COMMON.NAME_EXAMPLE")}
        </Typography.Text>
      </Flex>
    </FormItem>
  );
}

export default ParticipantTeacherFirstnameInput;
