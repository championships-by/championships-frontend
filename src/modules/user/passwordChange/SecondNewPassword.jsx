import React from "react";
import { Flex, Input, Typography } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/password-change.scss";

function SecondNewPassword({ name, form }) {
  const { t } = useTranslation();

  return (
    <Flex vertical className="password-change__second-new-password__flex">
      <Typography.Text>{t("COMMON.REPEAT_NEW_PASSWORD")}</Typography.Text>
      <FormItem
        name={name}
        dependencies={["NewPassword"]}
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
            validator(_, value) {
              if (!value || form.getFieldValue("NewPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t("RULES.PASSWORDS_DONT_MATCH")));
            },
          },
        ]}
        className="password-change__second-new-password__formitem"
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={t("COMMON.ENTER_NEW_PASSWORD_AGAIN")}
          iconRender={() => <EyeInvisibleOutlined />}
        />
      </FormItem>
    </Flex>
  );
}

export default SecondNewPassword;
