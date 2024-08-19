import { useState } from "react";
import { Slider, InputNumber, Space } from "antd";

function GroupStageParametrs() {
  const [groupCount, setGroupCount] = useState(3);
  const [maxGroupCount, setMaxGroupCount] = useState(5);

  const groupCountOnChange = (value) => {
    setGroupCount(value);
  };

  const maxGroupCountOnChange = (value) => {
    setMaxGroupCount(value);
  };
  return (
    <div>
      <div>Укажите количество групп</div>
      <Space>
        <Slider
          className="events__competition-groupStageParametrs"
          max={10}
          min={1}
          value={typeof groupCount === "number" ? groupCount : 1}
          onChange={groupCountOnChange}
        />
        <InputNumber
          min={1}
          max={10}
          value={groupCount}
          onChange={groupCountOnChange}
        />
      </Space>
      <div>
        Укажите кол-во участников, выходящих из каждой группы в финальный этап
      </div>
      <Space>
        <Slider
          className="events__competition-groupStageParametrs"
          max={10}
          min={1}
          value={typeof maxGroupCount === "number" ? maxGroupCount : 1}
          onChange={maxGroupCountOnChange}
        />
        <InputNumber
          min={1}
          max={10}
          value={maxGroupCount}
          onChange={maxGroupCountOnChange}
        />
      </Space>
    </div>
  );
}

export default GroupStageParametrs;
