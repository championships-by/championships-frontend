import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Typography } from "antd";
import { LaptopOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function ParticipantEquipmentInput({ name }) {
  const { t } = useTranslation();

  return (
    <FormItem name={name}>
      <Flex vertical>
        <Typography.Text>
          {t("TOURNAMENTS.PARTICIPANT_EQUIPMENT")}
        </Typography.Text>
        <Input
          prefix={<LaptopOutlined />}
          placeholder={t("TOURNAMENTS.ENTER_PARTICIPANT_EQUIPMENT")}
          id="participant_equipment_input"
        />
        <Typography.Text type="secondary">
          {t("TOURNAMENTS.PARTICIPANT_EQUIPMENT_EXAMPLE")}
        </Typography.Text>
      </Flex>
    </FormItem>
  );
}
export default ParticipantEquipmentInput;
