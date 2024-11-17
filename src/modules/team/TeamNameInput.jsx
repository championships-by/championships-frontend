import React from "react";
import { Flex, Input, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/team.scss";

function TeamNameInput({ name }) {
  const { t } = useTranslation();

  return (
    <Flex vertical className="team__team-name-input__flex">
      <Typography.Text>{t("EVENTS.TEAM_NAME")}</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: t("RULES.PLEASE_ENTER_TEAM_NAME"),
          },
          {
            max: 255,
            message: t("RULES.MAX_255_SYMBOLS"),
          },
        ]}
        className="team__team-name-input__formitem"
      >
        <Input
          allowClear
          prefix={<TeamOutlined />}
          placeholder={t("EVENTS.ENTER_TEAM_NAME")}
          maxLength={255}
        />
      </FormItem>
      <Typography.Text type="secondary">
        {t("EVENTS.TEAM_NAME_EXAMPLE")}
      </Typography.Text>
    </Flex>
  );
}

export default TeamNameInput;
