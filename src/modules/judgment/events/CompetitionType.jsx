import { useState } from "react";
import { Typography, Space, Select, Flex } from "antd";
import CriteriaParametrs from "./CompetitionCriteriaParametrs";
import TimeParametrs from "./CompetitionTimeParametrs";

import "./sass/events.scss";

const options = [
  {
    value: "time",
    label: "По времени",
  },
  {
    value: "criteria",
    label: "По критериям",
  },
  {
    value: "playoffs",
    label: "Плей-офф",
  },
];

function CompetitionType({ onChange, onInputChange, onCriteriaChange, mode }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [groupCount, setGroupCount] = useState();

  const handleChange = (value) => {
    setSelectedValue(value);
    onChange(value);
  };

  const handleChangeGroupCount = (value) => {
    setGroupCount(value);
    onInputChange(value);
  };

  const settingsComponents = {
    criteria: <CriteriaParametrs onCriteriaChange={onCriteriaChange} />,
    time: <TimeParametrs onInputChange={handleChangeGroupCount} />,
    playoffs: null,
  };
  return (
    <div className="events__competition-type__div">
      <Typography.Text className="events__competition-type__text">
        Тип соревнований
      </Typography.Text>
      <Space direction="vertical" className="events__competition-type__space">
        <Select
          placeholder="Выберите тип соревнования"
          options={options}
          className="events__competition-type__name"
          onChange={handleChange}
          disabled={mode === "edit"}
        />
        {selectedValue && settingsComponents[selectedValue]}
      </Space>
    </div>
  );
}

export default CompetitionType;
