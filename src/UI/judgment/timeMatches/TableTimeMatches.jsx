import { LoadingOutlined } from "@ant-design/icons";
import { timeMatchesApi } from "@api/timeMatches";
import { Button, Flex, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomTimePicker } from "./components";
import { timeMatchEventEmitter, TimeMatchEvents } from "./events";
import {
  defaultFormat,
  formatTimeToString,
  generateColumns,
  transformTimeMatchesData,
} from "./utils";

function TableTimeMatches() {
  const [timeMatchesData, setTimeMatchesData] = useState([]);
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { eventId, nominationId } = useParams();

  const columns = useMemo(
    () => [
      {
        key: "place",
        dataIndex: "place",
        title: "№ п/п",
        render: (text, record, index) => <>{index + 1}</>,
      },
      {
        key: "teamName",
        dataIndex: "teamName",
        title: "Участники",
      },
      ...generateColumns(timeMatchesData, (text, record, index, attemptId) => (
        <CustomTimePicker
          id={record.attempts[attemptId].id}
          onTimeChange={(id, time, isDisqualified) => {
            timeMatchEventEmitter.emit(
              TimeMatchEvents.UPDATE_TABLE_DATA,
              id,
              time,
              index,
              isDisqualified
            );
          }}
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

          return bestTime ? (
            <>{bestTime.format(defaultFormat)}</>
          ) : (
            <>{formatTimeToString()}</>
          );
        },
      },
    ],
    [timeMatchesData]
  );

  useEffect(() => {
    setIsLoading(true);
    timeMatchesApi
      .getTimeMatches({ eventId, nominationId })
      .then((response) => {
        if (response.status.ok) {
          const transformedData = transformTimeMatchesData(response.data);
          setTimeMatchesData(transformedData);
        } else {
          setIsErrorOccurred(true);
        }
      })
      .catch(() => setIsErrorOccurred(true))
      .finally(() => setIsLoading(false));
  }, [eventId, nominationId]);

  useEffect(() => {
    const handleUpdateTime = (id, time, index, isDisqualified) => {
      setTimeMatchesData((prevData) =>
        prevData.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              attempts: item.attempts.map((attempt) => {
                if (attempt.id === id) {
                  return {
                    ...attempt,
                    result: formatTimeToString(time),
                    isDisqualified,
                  };
                }
                return attempt;
              }),
            };
          }
          return item;
        })
      );
    };

    timeMatchEventEmitter.on(
      TimeMatchEvents.UPDATE_TABLE_DATA,
      handleUpdateTime
    );

    return () => {
      timeMatchEventEmitter.removeListener(
        TimeMatchEvents.UPDATE_TABLE_DATA,
        handleUpdateTime
      );
    };
  }, [timeMatchesData]);

  return (
    <>
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <Flex vertical gap="large">
          {isErrorOccurred ? (
            <Typography>
              При попытке получить данных произошла ошибка
            </Typography>
          ) : (
            <>
              <Table
                pagination={false}
                columns={columns}
                dataSource={timeMatchesData}
              />
              <Button style={{ margin: "10px 0px 10px 0px" }} type="primary">
                Завершить этап
              </Button>
            </>
          )}
        </Flex>
      )}
    </>
  );
}

export default TableTimeMatches;
