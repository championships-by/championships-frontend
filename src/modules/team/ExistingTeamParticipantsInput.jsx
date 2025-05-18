import { useEffect, useState, useCallback } from "react";
import { Flex, Space, Typography } from "antd";
import Select from "@/components/Select";
import FormItem from "antd/es/form/FormItem";
import { participantApi } from "@/api";
import { FILTER_OPTION, changeDateFormat } from "@/utils";
import { useTranslation } from "react-i18next";
import debounce from "lodash.debounce";

import "./sass/team.scss";

const ExistingTeamParticipantsInput = ({
  isVisible,
  name,
  mode,
  teamID,
  disabled,
}) => {
  const { t } = useTranslation();
  const [participantName, setParticipantName] = useState("");
  const [options, setOptions] = useState([]);

  const rules = [
    {
      required: !disabled,
      message:
        mode === "multiple"
          ? t("RULES.PLEASE_CHOOSE_PARTICIPANTS")
          : t("RULES.PLEASE_CHOOSE_PARTICIPANT"),
    },
  ];

  const transformData = (data) => {
    return data?.map((item) => {
      const fullName = `${item.second_name} ${item.first_name} ${item.third_name}`;
      const birthDate = item.birth_date;
      return {
        value: item.id,
        label: `${fullName}, ${changeDateFormat(birthDate)}`,
      };
    });
  };

  const fetchParticipants = useCallback(
    debounce((searchValue) => {
      try {
        if (teamID) {
          participantApi
            .getParticipantsInTeam({ name: searchValue, team_id: teamID })
            .then((data) => {
              setOptions(transformData(data));
            });
        }
      } catch {}
    }, 300),
    [teamID]
  );

  const onSearch = (value) => {
    setParticipantName(value);
    fetchParticipants(value);
  };

  useEffect(() => {
    onSearch(null);
  }, [isVisible, teamID]);

  return (
    <Flex vertical className="team__team-participants-input__flex">
      <Typography.Text>
        {mode == "single" ? t("COMMON.PARTICIPANT") : t("COMMON.PARTICIPANTS")}
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
                mode == "single"
                  ? t("COMMON.CHOOSE_PARTICIPANT")
                  : t("COMMON.CHOOSE_PARTICIPANTS")
              }
              name="team_participants_select"
              value={participantName}
              onSearch={onSearch}
              filterOption={FILTER_OPTION}
              options={options}
              notFoundContent={t("COMMON.NO_DATA")}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </Flex>
  );
};

export default ExistingTeamParticipantsInput;
