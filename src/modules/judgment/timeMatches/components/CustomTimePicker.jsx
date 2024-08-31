import { CloseCircleOutlined } from "@ant-design/icons";
import { defaultFormat } from "@constants";
import { formatTime } from "@utils";
import { Button, TimePicker } from "antd";
import { useState } from "react";
import "./CustomTimePicker.scss";

export const CustomTimePicker = ({ id, disabled, onTimeChange }) => {
  const [value, setValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleDisqualify = () => {
    setIsDisqualified((disqualified) => !disqualified);
    onTimeChange(id, value, !isDisqualified);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleClear = () => {
    setValue(null);
    onTimeChange(id, null, isDisqualified);
  };

  return !isDisqualified ? (
    <TimePicker
      placeholder="Выберите время"
      disabled={disabled}
      value={value}
      onChange={(time) => {
        setValue(time);
        onTimeChange(id, time, isDisqualified);
      }}
      variant="borderless"
      open={isOpen}
      onClick={handleInputClick}
      showNow={false}
      needConfirm={false}
      defaultValue={formatTime()}
      defaultOpenValue={formatTime()}
      format={{ format: defaultFormat, type: "mask" }}
      allowClear={{
        clearIcon: <CloseCircleOutlined onClick={handleClear} />,
      }}
      changeOnScroll
      renderExtraFooter={() => (
        <div className="extra-footer">
          <Button size="middle" type="text" onClick={handleDisqualify}>
            Дискв.
          </Button>
          <Button size="middle" type="primary" onClick={handleOk}>
            Ок
          </Button>
        </div>
      )}
    />
  ) : (
    <span className="table-time__disqualification" onClick={handleDisqualify}>
      Дисквалификация
    </span>
  );
};
