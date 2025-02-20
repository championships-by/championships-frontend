import { LoadingOutlined } from "@ant-design/icons";
import { defaultFormat, tableLocale } from "@constants";
import { CustomTimePicker } from "@modules/judgment/timeMatches/components";
import { formatTimeToString, generateColumns } from "@utils";
import { Flex, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";

export const TimeMatchesTable = ({
  editable,
  timeMatches,
  isLoading,
  isErrorOccurred,
  onTimeChange,
}) => {
  const { t } = useTranslation();
  const columns = useMemo(
    () => [
      {
        key: "teamName",
        title: t("COMMON.TEAM"),
        render: (record) => {
          if (record.participants.length !== 1) {
            return record.team.name;
          } else {
            return record.participants[0];
          }
        },
      },
      ...generateColumns(timeMatches, (text, record, index, columnId) => (
        <CustomTimePicker
          id={record.attempts[columnId].id}
          value={record.attempts[columnId].result}
          disabled={!editable}
          onTimeChange={onTimeChange}
        />
      )),
      {
        key: "bestTime",
        dataIndex: "bestTime",
        title: t("TOURNAMENTS.BEST_TIME"),
        render: (text, record) => {
          const allDisqualified = record.attempts.every(
            (attempt) => attempt.isDisqualified
          );

          if (allDisqualified) {
            return <span>-</span>;
          }

          const bestTime = record.attempts.reduce((min, current) => {
            if (current.result === null || current.result === "00:00.000")
              return min;
            const currentTime = dayjs(current.result, defaultFormat);
            return min === null || currentTime.isBefore(min)
              ? currentTime
              : min;
          }, null);

          return bestTime ? bestTime.format(defaultFormat) : "-";
        },
      },
    ],
    [editable, onTimeChange, timeMatches]
  );

  return isLoading ? (
    <LoadingOutlined />
  ) : (
    <Flex vertical gap="large">
      {isErrorOccurred ? (
        <Typography>{t("COMMON.ERROR_TO_GET_DATA")}</Typography>
      ) : (
        <Table
          pagination={false}
          columns={columns}
          dataSource={timeMatches}
          locale={getTranslation(tableLocale, t)}
        />
      )}
    </Flex>
  );
};
