import { useState } from "react";
import { Slider, InputNumber, Space } from "antd";

function GroupStageParametrs() {
  const [value, setValue] = useState(1);

  const onChange = (value) => {
    setValue(value);
  };
  return (
    <div>
      <Space>
        <Slider
          className="events__competition-groupStageParametrs"
          max={10}
          min={1}
          value={typeof value === "number" ? value : 1}
          onChange={onChange}
        />
        <InputNumber min={1} max={10} value={value} onChange={onChange} />
      </Space>
      <div>
        Укажите кол-во участников, выходящих из каждой группы в финальный этап
      </div>
      <Space>
        <Slider
          className="events__competition-groupStageParametrs"
          max={10}
          min={1}
          value={typeof value === "number" ? value : 1}
          onChange={onChange}
        />
        <InputNumber min={1} max={10} value={value} onChange={onChange} />
      </Space>
    </div>
  );
}

export default GroupStageParametrs;
