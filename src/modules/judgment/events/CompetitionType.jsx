import { useEffect, useState } from "react";
import { Typography, Space, Select, Flex, Button, Tooltip } from "antd";
import { InfoOutlined } from "@ant-design/icons";
import CriteriaParametrs from "./CompetitionCriteriaParametrs";
import TimeParametrs from "./CompetitionTimeParametrs";
import { NOMINATION_TYPES, NOMINATIONS } from "@constants";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function CompetitionType({
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
      label: t("NOMINATION_TYPES.OLYMPIC"),
    },
    {
      value: NOMINATIONS.ROUND_ROBIN,
      label: t("NOMINATION_TYPES.ROUND_ROBIN"),
    },
  ];

  const descriptions = [
    {
      value: NOMINATIONS.TIME,
      label: t("NOMINATION_TYPES"),
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
        <Flex gap="small">
          <Select
            placeholder={t("MESSAGES.CHOOSE_TYPE_OF_TOURNAMENT")}
            options={options}
            className="events__competition-type__name"
            onChange={handleChange}
            value={selectedValue}
          />
          <Tooltip
            title={
              <Flex vertical gap="small">
                {t("NOMINATION_TYPES_DESCRIPTIONS.TIME")}
                <br />
                <br />
                {t("NOMINATION_TYPES_DESCRIPTIONS.CRITERIA")}
                <br />
                <br />
                {t("NOMINATION_TYPES_DESCRIPTIONS.OLYMPIC")}
                <br />
                <br />
                {t("NOMINATION_TYPES_DESCRIPTIONS.ROUND_ROBIN")}
              </Flex>
            }
            overlayStyle={{ maxWidth: "750px" }}
          >
            <Button className="events__competition-type__info">
              <InfoOutlined />
            </Button>
          </Tooltip>
        </Flex>

        {selectedValue && settingsComponents[selectedValue]}
      </Space>
    </div>
  );
}

export default CompetitionType;
