import { defaultFormat } from "@constants";
import { formatTime } from "@utils";
import { Button, TimePicker } from "antd";
import { useState } from "react";
import "./customTimePicker.scss";

export const CustomTimePicker = ({ id, onTimeChange }) => {
  const [value, setValue] = useState(formatTime());
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

  return !isDisqualified ? (
    <TimePicker
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
    <span style={{ cursor: "pointer" }} onClick={() => handleDisqualify()}>
      Дискв.
    </span>
  );
};
