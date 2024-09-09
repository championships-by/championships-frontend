import { Flex, Select, Space, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { FILTER_OPTION } from "@utils";

import "./sass/team.scss";

function TeamNominationInput({ name, options, onChange: onChangeBase }) {
  const onChange = (value) => {
    onChangeBase(value);
  };

  const rules = [
    {
      required: true,
      message: "Пожалуйста, выберите компетенцию",
    },
  ];

  return (
    <Flex vertical className="team__team-nomination-select__flex">
      <Typography.Text>Компетенция</Typography.Text>
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
              placeholder="Выберите компетенцию"
              filterOption={FILTER_OPTION}
              options={options}
              notFoundContent="Нет данных"
              onChange={(value) => onChange(value)}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </Flex>
  );
}

export default TeamNominationInput;
