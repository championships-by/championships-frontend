import React from "react";
import { Flex, Input, Typography } from "antd";
import { BankOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

function ParticipantOrganizationInput({ name, value }) {
  const { t } = useTranslation();

  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: t("RULES.PLESE_ENTER_EDUCATIONAL_INSTITUTION"),
        },
        {
          max: 255,
          message: t("RULES.MAX_255_SYMBOLS"),
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>{t("COMMON.EDUCATIONAL_INSTITUTION")}</Typography.Text>
        <Input
          prefix={<BankOutlined />}
          placeholder={t("COMMON.ENTER_EDUCATIONAL_INSTITUTION")}
          value={value}
        />
        <Typography.Text type="secondary">
          {t("COMMON.EDUCATIONAL_INSTITUTION_EXAMPLE")}
        </Typography.Text>
      </Flex>
    </FormItem>
  );
}

export default ParticipantOrganizationInput;
