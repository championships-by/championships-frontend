import { useState, useCallback } from "react";
import { Flex, Space, Typography } from "antd";
import Select from "@components/Select";
import FormItem from "antd/es/form/FormItem";
import { participantApi } from "@api";
import { FILTER_OPTION } from "@utils";
import { useTranslation } from "react-i18next";
import debounce from "lodash.debounce";
import dayjs from "dayjs";

import "./sass/team.scss";

function TeamParticipantsInput({ name, mode, disabled, options }) {
  const { t } = useTranslation();
  const [participantName, setParticipantName] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);

  const rules = [
    {
      required: !disabled,
      message:
        mode === "multiple"
          ? t("RULES.PLEASE_CHOOSE_PARTICIPANTS")
          : t("RULES.PLEASE_CHOOSE_PARTICIPANT"),
    },
  ];

  const fetchParticipants = useCallback(
    debounce((searchValue) => {
      if (!searchValue.trim()) {
        setSearchOptions([]);
        return;
      }
      participantApi
        .getParticipantsInSystem({ name: searchValue })
        .then((data) => {
          console.log(data);
          setSearchOptions(
            data.map((p) => ({
              value: p.id,
              label: `${p.second_name} ${p.first_name} ${p.third_name}, ${dayjs(
                p.birth_date
              ).format("DD.MM.YYYY")}`,
            }))
          );
        })
        .catch(() => setSearchOptions([]));
    }, 300),
    []
  );

  const onSearch = (value) => {
    setParticipantName(value);
    fetchParticipants(value);
  };

  return (
    <Flex vertical className="team__team-participants-input__flex">
      <Typography.Text>
        {mode === "single" ? t("COMMON.PARTICIPANT") : t("COMMON.PARTICIPANTS")}
      </Typography.Text>
      <Flex>
        <Space.Compact className="team__team-participants-input__space">
          <FormItem
            name={name}
            className="team__team-participants-input__formitem"
            rules={rules}
          >
            <Select
              allowClear
              mode={mode}
              showSearch
              disabled={disabled}
              placeholder={
                mode === "single"
                  ? t("COMMON.CHOOSE_PARTICIPANT")
                  : t("COMMON.CHOOSE_PARTICIPANTS")
              }
              onSearch={onSearch}
              filterOption={FILTER_OPTION}
              options={searchOptions.length > 0 ? searchOptions : options}
              notFoundContent={t("COMMON.NO_DATA")}
              optionFilterProp="label"
              fieldNames={{ label: "label", value: "value" }}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </Flex>
  );
}

export default TeamParticipantsInput;
