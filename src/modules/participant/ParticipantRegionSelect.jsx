import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Select, Flex, Input, Space, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

import "./sass/participant.scss";

const options = [
  {
    value: "г.Минск",
    label: "г.Минск",
  },
  {
    value: "Минская область",
    label: "Минская область",
  },
  {
    value: "Могилевская область",
    label: "Могилевская область",
  },
  {
    value: "Гродненская область",
    label: "Гродненская область",
  },
  {
    value: "Гомельская область",
    label: "Гомельская область",
  },
  {
    value: "Брестская область",
    label: "Брестская область",
  },
  {
    value: "Витебская область",
    label: "Витебская область",
  },
];

function ParticipantRegionSelect({ name, value, onChange: onChangeBase }) {
  const onChange = (value) => {
    onChangeBase({ [name]: value });
  };

  return (
    <div className="participant__region-select__div">
      <Typography.Text>Регион</Typography.Text>
      <Flex>
        <Space.Compact className="participant__region-select__space">
          <Input
            prefix={<EnvironmentOutlined />}
            className="participant__region-select__input"
            disabled
          />
          <FormItem
            name={name}
            className="participant__region-select__formitem"
            hasFeedback
            validateFirst
            rules={[
              {
                required: true,
                message: "Пожалуйста, выбирите регион",
              },
            ]}
          >
            <Select
              // disabled={disabled}
              value={value}
              id="participant_region_select"
              placeholder="Выберите регион"
              options={options}
              onChange={onChange}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </div>
  );
}
export default ParticipantRegionSelect;
