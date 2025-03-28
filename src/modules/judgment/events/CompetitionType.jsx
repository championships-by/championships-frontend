import { useEffect, useState } from "react";
import { Typography, Space, Tooltip, Flex } from "antd";
import Select from "@components/Select";
import CriteriaParametrs from "./CompetitionCriteriaParametrs";
import TimeParametrs from "./CompetitionTimeParametrs";
import { NOMINATION_TYPES, NOMINATIONS } from "@constants";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";
import { InfoCircleOutlined } from "@ant-design/icons";

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
    {
      value: NOMINATIONS.GROUP,
      label: t("NOMINATION_TYPES.GROUP"),
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
    group: null,
  };
  return (
    <div className="events__competition-type__div">
      <Space align="center" size={8}>
        <Typography.Text className="events__competition-type__text">
          {t("EVENTS.TYPE_OF_TOURNAMENTS")}
        </Typography.Text>
        <Tooltip
          placement="right"
          title={
            <Typography.Text className="user__role-input__tooltip">
              <Typography.Text strong className="user__role-input__tooltip">
                {t("COMMON.BY_CRITERIA")}
              </Typography.Text>{" "}
              {t("COMMON.BY_CRITERIA_DESCRIPTION")}
              <br />
              <br />
              <Typography.Text strong className="user__role-input__tooltip">
                {t("COMMON.BY_TIME")}
              </Typography.Text>{" "}
              {t("COMMON.BY_TIME_DESCRIPTION")}
              <br />
              <br />
              <Typography.Text strong className="user__role-input__tooltip">
                {t("COMMON.BY_PLAYOFF")}
              </Typography.Text>{" "}
              {t("COMMON.BY_PLAYOFF_DESCRIPTION")}
              <br />
              <br />
              <Typography.Text strong className="user__role-input__tooltip">
                {t("COMMON.BY_CIRCULAR")}
              </Typography.Text>{" "}
              {t("COMMON.BY_CIRCULAR_DESCRIPTION")}
            </Typography.Text>
          }
        >
          <InfoCircleOutlined />
        </Tooltip>
      </Space>
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
