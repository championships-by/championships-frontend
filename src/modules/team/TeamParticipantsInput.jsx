import { Flex, Input, Select, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { FILTER_OPTION } from "@utils";

import "./sass/team.scss";

function TeamParticipantsInput({ name, options, mode }) {
  return (
    <Flex vertical className="team__team-participants-input__flex">
      <Typography.Text>
        {mode == "single" ? "Участник" : "Участники"}
      </Typography.Text>
      <Flex>
        <Space.Compact className="team__team-participants-input__space">
          <Input
            prefix={<UserOutlined />}
            className="team__team-participants-input__input"
            disabled
          />
          <FormItem
            name={name}
            className="team__team-participants-input__formitem"
          >
            <Select
              allowClear
              mode={mode}
              showSearch
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
