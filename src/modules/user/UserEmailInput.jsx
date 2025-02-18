import React, { useCallback } from "react";
import { Flex, Input, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";
import { participantApi } from "@api";

import "./sass/user.scss";

function UserEmailInput({ name, disabled }) {
  const { t } = useTranslation();

  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <Flex vertical className="user__email-input__flex">
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
          {
            asyncValidator: async (rule, value) => {
              const isEmailTaken = await participantApi.checkEmail(value);

              if (isEmailTaken) {
                return Promise.reject(new Error(t("RULES.EMAIL_TAKEN")));
              }

              return Promise.resolve();
            },
          },
        ]}
        className="user__email-input__formitem"
      >
        <Input
          prefix={<MailOutlined />}
          type="email"
          placeholder={t("COMMON.ENTER_EMAIL")}
          disabled={disabled}
          onKeyPress={handleKeyPress}
        />
      </FormItem>
      <Typography.Text type="secondary">
        {t("COMMON.EMAIL_EXAMPLE")}
      </Typography.Text>
    </Flex>
  );
}

export default UserEmailInput;
