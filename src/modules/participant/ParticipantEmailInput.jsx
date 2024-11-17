import React from "react";
import { Flex, Input, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/participant.scss";

function ParticipnatEmailInput({ name, value }) {
  const { t } = useTranslation();

  return (
    <Flex vertical className="participant__email-input__flex">
      <Typography.Text>{t("COMMON.EMAIL")}</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        shouldUpdate
        rules={[
          {
            required: true,
            message: t("RULES.ENTER_EMAIL"),
          },
          {
            type: "email",
            message: t("RULES.INVALID_EMAIL"),
          },
        ]}
        className="participant__email-input__formitem"
      >
        <Input
          value={value}
          prefix={<MailOutlined />}
          type="email"
          placeholder={t("COMMON.ENTER_EMAIL")}
        />
      </FormItem>
      <Typography.Text type="secondary">
        {t("COMMON.EMAIL_EXAMPLE")}
      </Typography.Text>
    </Flex>
  );
}

export default ParticipnatEmailInput;
