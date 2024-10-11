import { useEffect, useState } from "react";
import { Typography, Space, Select } from "antd";
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

function CompetitionType({
  onChange,
  onInputChange,
  onCriteriaChange,
  value,
  criteriaValue,
  groupCountValue,
}) {
  const [selectedValue, setSelectedValue] = useState("");
  const [groupCount, setGroupCount] = useState();

  const handleChange = (value) => {
    setSelectedValue(value);
    onChange(value);
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChangeGroupCount = (value) => {
    setGroupCount(value);
    onInputChange(value);
  };

  const settingsComponents = {
    criteria: (
      <CriteriaParametrs
        onCriteriaChange={onCriteriaChange}
        value={criteriaValue}
      />
    ),
    time: (
      <TimeParametrs
        onInputChange={handleChangeGroupCount}
        value={groupCountValue}
      />
    ),
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
          value={selectedValue}
        />
        {selectedValue && settingsComponents[selectedValue]}
      </Space>
    </div>
  );
}

export default CompetitionType;
