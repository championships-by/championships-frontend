import React from "react";
import { Flex, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/feedback.scss";

function FeedbackLastnameInput({ name }) {
  const { t } = useTranslation();

  const rules = [
    {
      required: true,
      whitespace: true,
      message: t("RULES.PLEASE_ENTER_LAST_NAME"),
    },
    {
      pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
      message: t("RULES.LAST_NAME_CAN_CONTAIN_ONLY_LETTERS"),
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
    <Flex vertical className="user__lastname-input__flex">
      <Typography.Text>{t("COMMON.LAST_NAME")}*</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        shouldUpdate
        rules={rules}
        className="user__lastname-input__formitem"
      >
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder={t("COMMON.ENTER_LAST_NAME")}
          maxLength={255}
        />
      </FormItem>
      <Typography.Text type="secondary">
        {t("COMMON.LAST_NAME_EXAMPLE")}
      </Typography.Text>
    </Flex>
  );
}

export default FeedbackLastnameInput;
