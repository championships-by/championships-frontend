import { useEffect, useState } from "react";
import { Typography, Space } from "antd";
import Select from "@modules/customSelect/CustomSelect";
import CriteriaParametrs from "./CompetitionCriteriaParametrs";
import TimeParametrs from "./CompetitionTimeParametrs";
import { NOMINATION_TYPES, NOMINATIONS } from "@constants";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function CompetitionType({
  Disabled = false,
  onChange,
  onInputChange,
  onCriteriaChange,
  value,
  criteriaValue,
  groupCountValue,
}) {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState("");
  const [groupCount, setGroupCount] = useState();

  const options = [
    {
      value: NOMINATIONS.TIME,
      label: t("NOMINATION_TYPES.TIME"),
    },
    {
      value: NOMINATIONS.CRITERIA,
      label: t("NOMINATION_TYPES.CRITERIA"),
    },
    {
      value: NOMINATIONS.OLYMPIC,
      label: t("NOMINATION_TYPES.PLAYOFF"),
    },
  ];

  const handleChange = (value) => {
    setSelectedValue(value);
    onChange(value);
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChangeGroupCount = (value) => {
    setGroupCount(value);
    onInputChange(value);
  };

  const settingsComponents = {
    criteria: (
      <CriteriaParametrs
        onCriteriaChange={onCriteriaChange}
        value={criteriaValue}
      />
    ),
    time: (
      <TimeParametrs
        onInputChange={handleChangeGroupCount}
        value={groupCountValue}
      />
    ),
    playoffs: null,
  };
  return (
    <div className="events__competition-type__div">
      <Typography.Text className="events__competition-type__text">
        {t("EVENTS.TYPE_OF_TOURNAMENTS")}
      </Typography.Text>
      <Space direction="vertical" className="events__competition-type__space">
        <Select
          disabled={Disabled}
          placeholder={t("MESSAGES.CHOOSE_TYPE_OF_TOURNAMENT")}
          options={options}
          className="events__competition-type__name"
          onChange={handleChange}
          value={selectedValue}
        />
        {selectedValue && settingsComponents[selectedValue]}
      </Space>
    </div>
  );
}

export default CompetitionType;
