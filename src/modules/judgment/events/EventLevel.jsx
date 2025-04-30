import { Typography } from "antd";
import Select from "@components/Select";
import FormItem from "antd/es/form/FormItem";
import { EventFilters } from "@const";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function EventLevel({ name, value, onChange: onChangeBase, form }) {
  const { t } = useTranslation();

  const options = [
    {
      value: EventFilters.REPUBLIC,
      label: <span>{t("EVENT_LEVELS.REPUBLIC")}</span>,
    },
    {
      value: EventFilters.REGION,
      label: <span>{t("EVENT_LEVELS.REGION")}</span>,
    },
    {
      value: EventFilters.DISTRICT,
      label: <span>{t("EVENT_LEVELS.DISTRICT")}</span>,
    },
    {
      value: EventFilters.TOWN,
      label: <span>{t("EVENT_LEVELS.TOWN")}</span>,
    },
    {
      value: EventFilters.OTHER,
      label: <span>{t("EVENT_LEVELS.OTHER")}</span>,
    },
  ];

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
