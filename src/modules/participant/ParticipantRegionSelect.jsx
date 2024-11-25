import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Select, Flex, Input, Space, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./sass/participant.scss";

function ParticipantRegionSelect({ name, value, onChange: onChangeBase }) {
  const { t } = useTranslation();

  const options = [
    {
      value: "г. Минск",
      label: t("COMMON.MINSK"),
    },
    {
      value: "Брестская область",
      label: t("COMMON.BREST_REGION"),
    },
    {
      value: "Витебская область",
      label: t("COMMON.VITEBSK_REGION"),
    },
    {
      value: "Гомельская область",
      label: t("COMMON.GOMEL_REGION"),
    },
    {
      value: "Гродненская область",
      label: t("COMMON.GROGNO_REGION"),
    },
    {
      value: "Минская область",
      label: t("COMMON.MINSK_REGION"),
    },
    {
      value: "Могилевская область",
      label: t("COMMON.MOGILEV_REGION"),
    },
  ];

  const onChange = (value) => {
    onChangeBase({ [name]: value });
  };

  return (
    <div className="participant__region-select__div">
      <Typography.Text>{t("COMMON.REGION")}</Typography.Text>
      <Flex>
        <Space.Compact className="participant__region-select__space">
          <Input
            prefix={<EnvironmentOutlined />}
            className="participant__region-select__input"
            disabled
          />
          <FormItem
            name={name}
            className="participant__region-select__formitem"
            hasFeedback
            validateFirst
            rules={[
              {
                required: true,
                message: t("RULES.PLEASE_ENTER_REGION"),
              },
            ]}
          >
            <Select
              // disabled={disabled}
              value={value}
              id="participant_region_select"
              placeholder={t("COMMON.SELECT_REGION")}
              options={options}
              onChange={onChange}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </div>
  );
}
export default ParticipantRegionSelect;
