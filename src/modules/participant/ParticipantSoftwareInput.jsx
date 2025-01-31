import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function ParticipantSoftwareInput({ name, value }) {
  const { t } = useTranslation();

  return (
    <FormItem name={name}>
      <Flex vertical>
        <Typography.Text>{t("TOURNAMENTS.SOFTWARE")}</Typography.Text>
        <Input
          prefix={<CodeOutlined />}
          placeholder={t("TOURNAMENTS.ENTER_SOFTWARE")}
          id="participant_software_input"
          value={value}
        />
        <Typography.Text type="secondary">
          {t("TOURNAMENTS.SOFTWARE_EXAMPLE")}
        </Typography.Text>
      </Flex>
    </FormItem>
  );
}
export default ParticipantSoftwareInput;
