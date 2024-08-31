import { LoadingOutlined } from "@ant-design/icons";
import { defaultFormat } from "@constants";
import { CustomTimePicker } from "@modules/judgment/timeMatches/components";
import { formatTimeToString, generateColumns } from "@utils";
import { Flex, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

export const TimeMatchesTable = ({
  editable,
  timeMatches,
  isLoading,
  isErrorOccurred,
  onTimeChange,
}) => {
  const columns = useMemo(
    () => [
      {
        key: "place",
        dataIndex: "place",
        title: "№ п/п",
        render: (text, record, index) => index + 1,
      },
      {
        key: "teamName",
        dataIndex: "teamName",
        title: "Участники",
      },
      ...generateColumns(timeMatches, (text, record, index, columnId) => (
        <CustomTimePicker
          id={record.attempts[columnId].id}
          disabled={!editable}
          onTimeChange={onTimeChange}
        />
      )),
      {
        key: "bestTime",
        dataIndex: "bestTime",
        title: "Лучшее время",
        render: (text, record) => {
          const allDisqualified = record.attempts.every(
            (attempt) => attempt.isDisqualified
          );

          if (allDisqualified) {
            return <span>-</span>;
          }

          const bestTime = record.attempts.reduce((min, current) => {
            if (current.result === null || current.isDisqualified) return min;
            const currentTime = dayjs(current.result, defaultFormat);
            return min === null || currentTime.isBefore(min)
              ? currentTime
              : min;
          }, null);

          return bestTime
            ? bestTime.format(defaultFormat)
            : formatTimeToString();
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
        <Typography>При попытке получить данных произошла ошибка</Typography>
      ) : (
        <Table
          pagination={false}
          columns={columns}
          dataSource={timeMatches.sort((a, b) => {
            if (dayjs(a.bestAttempt.result).isBefore(b.bestAttempt.result)) {
              return -1;
            }
            if (dayjs(a.bestAttempt.result).isAfter(b.bestAttempt.result)) {
              return 1;
            }
            return 0;
          })}
        />
      )}
    </Flex>
  );
};
