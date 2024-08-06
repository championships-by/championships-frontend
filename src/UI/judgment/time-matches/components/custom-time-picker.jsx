import { Button, TimePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const format = "mm:ss.SSS";
const defaultTime = "00:00.000";

export const CustomTimePicker = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnOk = () => {
    setIsOpen(false);
  };

  const handleOnInputClick = () => {
    setIsOpen(true);
  };

  return (
    <TimePicker
      onClick={handleOnInputClick}
      open={isOpen}
      variant="borderless"
      needConfirm={false}
      showNow={false}
      defaultValue={dayjs(defaultTime, format)}
      defaultOpenValue={dayjs(defaultTime, format)}
      format={{ format, type: "mask" }}
      renderExtraFooter={() => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "8px 0",
          }}
        >
          <Button size="small" type="text">
            Дискв.
          </Button>
          <Button size="small" type="primary" onClick={handleOnOk}>
            Ок
          </Button>
        </div>
      )}
    />
  );
};
