import React from "react";
import { Flex, Input, Typography } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/password-change.scss";

function OldPassword({ name }) {
  const { t } = useTranslation();

  return (
    <Flex vertical className="password-change__old-password__flex">
      <Typography.Text>{t("COMMON.OLD_PASSWORD")}</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: t("RULES.PLEASE_ENTER_YOUR_PASSWORD"),
          },
          {
            min: 8,
            message: t("RULES.MIN_PASSWORD_8"),
          },
        ]}
        className="password-change__old-password__formitem"
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={t("COMMON.ENTER_OLD_PASSWORD")}
          iconRender={() => <EyeInvisibleOutlined />}
        />
      </FormItem>
    </Flex>
  );
}

export default OldPassword;
