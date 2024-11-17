import { Typography, Switch, Tooltip } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function EventName({ name, value, onChange: onChangeBase, disabled }) {
  const { t } = useTranslation();

  const onChange = (checked) => {
    onChangeBase({ [name]: checked });
  };

  return (
    <FormItem name={name} hasFeedback validateFirst>
      <div className="events__event-registration-switch">
        <Typography.Text>{t("EVENTS.PUBLISH")}</Typography.Text>
        {disabled ? (
          <Tooltip title={t("EVENTS.AT_LEAST_ONE_NOMINATION_FOR_PUBLISH")}>
            <Switch
              className="events__event-registration-switch__switch"
              checked={value}
              onChange={onChange}
              disabled={disabled}
            />
          </Tooltip>
        ) : (
          <Switch
            className="events__event-registration-switch__switch"
            checked={value}
            onChange={onChange}
            disabled={disabled}
          />
        )}
      </div>
    </FormItem>
  );
}

export default EventName;
