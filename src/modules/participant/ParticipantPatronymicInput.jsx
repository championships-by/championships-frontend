import React from "react";
import { Flex, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

function ParticipantPatronymicInput({ name, value }) {
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
        <Typography.Text>{t("COMMON.THIRD_NAME_IF_EXIST")}</Typography.Text>
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder={t("COMMON.ENTER_THIRD_NAME")}
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

export default ParticipantPatronymicInput;
