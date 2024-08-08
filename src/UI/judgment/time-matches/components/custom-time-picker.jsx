import { Button, TimePicker } from "antd";
import { useState } from "react";
import { defaultFormat, formatTime } from "../utils";

export const CustomTimePicker = ({ id, onTimeChange }) => {
  const [value, setValue] = useState(formatTime());
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleDisqualify = () => {
    setIsDisqualified((disqualified) => !disqualified);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {!isDisqualified ? (
        <TimePicker
          value={value}
          onChange={(time) => {
            setValue(time);
            onTimeChange(id, time);
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "stretch",
                margin: "8px 0",
                gap: "8px",
              }}
            >
              <Button
                size="middle"
                type="text"
                style={{ width: "100%" }}
                onClick={handleDisqualify}
              >
                Дискв.
              </Button>
              <Button
                size="middle"
                type="primary"
                style={{ width: "100%" }}
                onClick={handleOk}
              >
                Ок
              </Button>
            </div>
          )}
        />
      ) : (
        <span style={{ cursor: "pointer" }} onClick={() => handleDisqualify()}>
          Дискв.
        </span>
      )}
    </>
  );
};
