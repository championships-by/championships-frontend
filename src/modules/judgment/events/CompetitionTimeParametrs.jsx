import { useEffect, useState } from "react";
import { Slider, InputNumber, Space } from "antd";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function TimeParametrs({ onInputChange, value: defaultValue }) {
  const { t } = useTranslation();
  const [value, setValue] = useState(1);

  const onChange = (value) => {
    setValue(value);
    onInputChange(value);
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div>
      <div>{t("TOURNAMENTS.SET_ATTEMPTS_COUNT")}</div>
      <Space>
        <Slider
          className="events__competition-TimeParametrs"
          max={10}
          min={1}
          value={typeof value === "number" ? value : 1}
          onChange={onChange}
        />
        <InputNumber
          min={1}
          max={10}
          value={value}
          onChange={onChange}
          defaultValue={3}
        />
      </Space>
    </div>
  );
}

export default TimeParametrs;
