import { Flex, Input, Select, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { FILTER_OPTION } from "@utils";

import "./sass/team.scss";

function TeamParticipantsInput({ name, options, mode, disabled }) {
  const rules = [
    {
      required: disabled ? false : true,
      message:
        mode == "multiple"
          ? "Пожалуйста, выберите участников"
          : "Пожалуйста, выберите участника",
    },
  ];

  return (
    <Flex vertical className="team__team-participants-input__flex">
      <Typography.Text>
        {mode == "single" ? "Участник" : "Участники"}
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
                mode == "single" ? "Выберите участника" : "Выберите участников"
              }
              name="team_participants_select"
              value=""
              filterOption={FILTER_OPTION}
              options={options}
              notFoundContent="Нет данных"
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </Flex>
  );
}

export default TeamParticipantsInput;
