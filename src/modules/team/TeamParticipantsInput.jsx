import { Flex, Input, Select, Space, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { FILTER_OPTION } from "@utils";
import { useTranslation } from "react-i18next";

import "./sass/team.scss";

function TeamParticipantsInput({ name, options, mode, disabled }) {
  const { t } = useTranslation();

  const rules = [
    {
      required: !disabled,
      message:
        mode === "multiple"
          ? t("RULES.PLEASE_CHOOSE_PARTICIPANTS")
          : t("RULES.PLEASE_CHOOSE_PARTICIPANT"),
    },
  ];

  return (
    <Flex vertical className="team__team-participants-input__flex">
      <Typography.Text>
        {mode == "single" ? t("COMMON.PARTICIPANT") : t("COMMON.PARTICIPANTS")}
      </Typography.Text>
      <Flex>
        <Space.Compact className="team__team-participants-input__space">
          <FormItem
            name={name}
            className="team__team-participants-input__formitem"
            rules={rules}
          >
            <Select
              allowClear
              mode={mode}
              showSearch
              disabled={disabled}
              placeholder={
                mode == "single"
                  ? t("COMMON.CHOOSE_PARTICIPANT")
                  : t("COMMON.CHOOSE_PARTICIPANTS")
              }
              name="team_participants_select"
              value=""
              filterOption={FILTER_OPTION}
              options={options}
              notFoundContent={t("COMMON.NO_DATA")}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </Flex>
  );
}

export default TeamParticipantsInput;
