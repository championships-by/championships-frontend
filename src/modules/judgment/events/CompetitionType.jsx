import { useState } from "react";
import { Typography, Space, Select } from "antd";
import GroupStageParametrs from "./CompetitionGroupStageParametrs";
import CriteriaParametrs from "./CompetitionCriteriaParametrs";
import TimeParametrs from "./CompetitionTimeParametrs";

import "./sass/events.scss";

const options = [
  {
    value: "time",
    label: "Соревнования по времени",
  },
  {
    value: "criteria",
    label: "Соревнования по критериям",
  },
  {
    value: "groupStage",
    label: "Групповой этап",
  },
  {
    value: "playoffs",
    label: "Плей-офф",
  },
];

function CompetitionType() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const settingsComponents = {
    groupStage: <GroupStageParametrs />,
    criteria: <CriteriaParametrs />,
    time: <TimeParametrs />,
    playoffs: <GroupStageParametrs />,
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
        />
        {selectedValue && settingsComponents[selectedValue]}
      </Space>
    </div>
  );
}

export default CompetitionType;
