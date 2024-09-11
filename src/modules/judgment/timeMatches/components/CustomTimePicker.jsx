import { CloseCircleOutlined } from "@ant-design/icons";
import { defaultFormat } from "@constants";
import { formatTime } from "@utils";
import { Button, TimePicker } from "antd";
import { useState } from "react";
import "./CustomTimePicker.scss";

export const CustomTimePicker = ({ id, value, disabled, onTimeChange }) => {
  const [time, setTime] = useState(value ? formatTime(value) : null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleDisqualify = () => {
    setIsDisqualified((disqualified) => !disqualified);
    onTimeChange(id, time, !isDisqualified);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleClear = () => {
    setTime(null);
    onTimeChange(id, null, isDisqualified);
  };

  return isDisqualified ? (
    <Button disabled={disabled} type="text" onClick={handleDisqualify}>
      Дисквалификация
    </Button>
  ) : (
    <TimePicker
      placeholder="Выберите время"
      disabled={disabled}
      value={time}
      onChange={(newTime) => {
        setTime(newTime);
        onTimeChange(id, newTime, isDisqualified);
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
  );
};
