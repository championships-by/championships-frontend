import { CloseCircleOutlined } from "@ant-design/icons";
import { defaultFormat } from "@constants";
import { formatTime, isAttemptDisqualified } from "@utils";
import { Button, TimePicker } from "antd";
import { useState } from "react";
import "./CustomTimePicker.scss";
import { useTranslation } from "react-i18next";

export const CustomTimePicker = ({ id, value, disabled, onTimeChange }) => {
  const { t } = useTranslation();
  const [time, setTime] = useState(
    !isAttemptDisqualified(value) && value ? formatTime(value) : null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(
    isAttemptDisqualified(value)
  );

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

  const handleTimeChange = (newTime) => {
    if (newTime && formatTime(newTime).format(defaultFormat) === "00:00.000") {
      return;
    }

    setTime(newTime);
    onTimeChange(id, newTime, isDisqualified);
  };

  return isDisqualified ? (
    <Button disabled={disabled} type="text" onClick={handleDisqualify}>
      {t("TOURNAMENTS.DISQALIFICATION_CUTTED")}
    </Button>
  ) : (
    <TimePicker
      placeholder="00:00.000"
      disabled={disabled}
      value={time}
      onChange={handleTimeChange}
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
            {t("TOURNAMENTS.DISQALIFICATION_CUTTED")}
          </Button>
          <Button size="middle" type="primary" onClick={handleOk}>
            {t("COMMON.OK")}
          </Button>
        </div>
      )}
    />
  );
};
