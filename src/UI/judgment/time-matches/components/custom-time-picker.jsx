import { Button, TimePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const format = "mm:ss.SSS";
const defaultTime = "00:00.000";

export const CustomTimePicker = () => {
  const [value, setValue] = useState(dayjs(defaultTime, format));
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
          onChange={(e) => setValue(e)}
          variant="borderless"
          open={isOpen}
          onClick={handleInputClick}
          showNow={false}
          needConfirm={false}
          defaultValue={dayjs(defaultTime, format)}
          defaultOpenValue={dayjs(defaultTime, format)}
          format={{ format, type: "mask" }}
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
