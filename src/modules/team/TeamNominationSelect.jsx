import { Flex, Select, Space, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { FILTER_OPTION } from "@utils";
import { useTranslation } from "react-i18next";

import "./sass/team.scss";

function TeamNominationInput({
  name,
  options,
  onChange: onChangeBase,
  disabled,
}) {
  const { t } = useTranslation();

  const onChange = (value) => {
    onChangeBase(value);
  };

  const rules = [
    {
      required: true,
      message: t("RULES.PLEASE_CHOOSE_NOMINATION"),
    },
  ];

  return (
    <Flex vertical className="team__team-nomination-select__flex">
      <Typography.Text>{t("COMMON.NOMINATION")}</Typography.Text>
      <Flex>
        <Space.Compact className="team__team-nomination-select__space">
          <FormItem
            name={name}
            className="team__team-nomination-select__formitem"
            rules={rules}
          >
            <Select
              name="team_nomination_select"
              showSearch
              placeholder={t("COMMON.CHOOSE_NOMINATION")}
              filterOption={FILTER_OPTION}
              options={options}
              notFoundContent={t("COMMON.NO_DATA")}
              onChange={(value) => onChange(value)}
              disabled={disabled}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </Flex>
  );
}

export default TeamNominationInput;
