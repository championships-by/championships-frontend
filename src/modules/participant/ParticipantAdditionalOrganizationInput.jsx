import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function ParticipantAdditionalOrganiztionInput({ name, value }) {
  const { t } = useTranslation();

  return (
    <FormItem name={name}>
      <Flex vertical>
        <Typography.Text>
          {t("COMMON.ADDITIONAL_EDUCATIONAL_INSTITUTION")}
        </Typography.Text>
        <Input
          prefix={<BankOutlined />}
          placeholder={t("COMMON.ENTER_ADDITIONAL_EDUCATIONAL_INSTITUTION")}
          id="participant_additionalorganization_input"
          value={value}
        />
        <Typography.Text type="secondary">
          {t("COMMON.ADDITIONAL_EDUCATIONAL_INSTITUTION_EXAMPLE")}
        </Typography.Text>
      </Flex>
    </FormItem>
  );
}
export default ParticipantAdditionalOrganiztionInput;
