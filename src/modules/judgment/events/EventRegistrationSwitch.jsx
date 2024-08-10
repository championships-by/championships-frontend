import { Typography, Switch } from "antd";
import FormItem from "antd/es/form/FormItem";

import "./sass/events.scss";

function EventName({ name }) {
  return (
    <FormItem name={name} hasFeedback validateFirst>
      <div className="events__event-registration-switch">
        <Typography.Text>Опубликовать</Typography.Text>
        <Switch className="events__event-registration-switch__switch" />
      </div>
    </FormItem>
  );
}

export default EventName;
