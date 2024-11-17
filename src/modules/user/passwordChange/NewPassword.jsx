import React from "react";
import { Flex, Input, Typography } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/password-change.scss";

function NewPassword({ name }) {
  const { t } = useTranslation();

  return (
    <Flex vertical className="password-change__new-password__flex">
      <Typography.Text>{t("COMMON.NEW_PASSWORD")}</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: t("RULES.PLEASE_ENTER_PASSWORD"),
          },
          {
            min: 8,
            message: t("RULES.MIN_PASSWORD_8"),
          },
          {
            pattern: /[a-zA-Z]/,
            message: t("RULES.PASSWORD_CAN_CONTAIN_ONLY_ENGLISH"),
          },
          {
            pattern: /\d/,
            message: t("RULES.PASSWORD_SHOULD_CONTAIN_NUMBERS"),
          },
        ]}
        className="password-change__new-password__formitem"
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={t("COMMON.ENTER_NEW_PASSWORD")}
          iconRender={() => <EyeInvisibleOutlined />}
        />
      </FormItem>
    </Flex>
  );
}

export default NewPassword;
