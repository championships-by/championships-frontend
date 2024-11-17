import { Typography, Select, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Locale, EventFilters } from "@constants";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

const options = [
  {
    value: EventFilters.REPUBLIC,
    label: <span>{Locale.eventFilters[EventFilters.REPUBLIC]}</span>,
  },
  {
    value: EventFilters.REGION,
    label: <span>{Locale.eventFilters[EventFilters.REGION]}</span>,
  },
  {
    value: EventFilters.DISTRICT,
    label: <span>{Locale.eventFilters[EventFilters.DISTRICT]}</span>,
  },
  {
    value: EventFilters.TOWN,
    label: <span>{Locale.eventFilters[EventFilters.TOWN]}</span>,
  },
  {
    value: EventFilters.OTHER,
    label: <span>{Locale.eventFilters[EventFilters.OTHER]}</span>,
  },
];

function EventLevel({ name, value, onChange: onChangeBase, form }) {
  const { t } = useTranslation();

  const rules = [
    {
      required: true,
      message: t("RULES.PLEASE_CHOOSE_LEVEL_OF_EVENT"),
    },
  ];

  const onChange = (value) => {
    onChangeBase({ [name]: value });
    form.setFieldsValue({ [name]: value });
  };

  return (
    <FormItem name={name} hasFeedback validateFirst rules={rules}>
      <Typography.Text>{t("COMMON.LEVEL_OF_EVENT")}</Typography.Text>
      <div className="events__event-level__div">
        <Select
          placeholder={t("COMMON.CHOOSE_LEVEL_OF_EVENT")}
          options={options}
          value={value}
          onChange={onChange}
        />
      </div>
    </FormItem>
  );
}

export default EventLevel;
