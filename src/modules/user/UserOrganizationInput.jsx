import React from "react";
import { Flex, Input, Typography } from "antd";
import { BankOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/user.scss";

function UserOrganizationInput({ name }) {
  const { t } = useTranslation();

  return (
    <Flex vertical className="user__organization-input__flex">
      <Typography.Text>{t("COMMON.EDUCATIONAL_INSTITUTION")}</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        className="user__organization-input__formitem"
        rules={[
          {
            required: true,
            message: t("RULES.PLESE_ENTER_EDUCATIONAL_INSTITUTION"),
          },
          {
            validator(_, value) {
              if (value && value.trim()) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  t("RULES.PLESE_ENTER_CORRECT_EDUCATIONAL_INSTITUTION")
                )
              );
            },
          },
        ]}
      >
        <Input
          prefix={<BankOutlined />}
          placeholder={t("COMMON.ENTER_EDUCATIONAL_INSTITUTION")}
        />
      </FormItem>
      <Typography.Text type="secondary">
        {t("COMMON.EDUCATIONAL_INSTITUTION_EXAMPLE")}
      </Typography.Text>
    </Flex>
  );
}

export default UserOrganizationInput;
