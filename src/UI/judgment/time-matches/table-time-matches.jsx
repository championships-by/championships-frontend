import { LoadingOutlined } from "@ant-design/icons";
import { Button, Flex, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { timeMatchesApi } from "./api/time-matches-api";
import { CustomTimePicker } from "./components";
import { timeMatchEventEmitter, TimeMatchEvents } from "./events";
import "./sass/time-matches.scss";
import { defaultFormat, formatTime } from "./utils";

function TableTimeMatches() {
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { eventId, nominationId } = useParams();

  const transformData = useCallback((rounds) => {
    return rounds.map((round, index) => ({
      key: `round-${index + 1}`,
      teamName: round.team_name,
      participant: {
        firstName: round.participant_data.first_name,
        secondName: round.participant_data.second_name,
        thirdName: round.participant_data.third_name,
      },
      attempts: round.attempts.map(({ id, result }) => ({
        id,
        result,
        isDisqualified: false,
      })),
      bestAttempt: {
        id: round.best_attempt.id,
        result: round.best_attempt.result,
      },
    }));
  }, []);

  const generateColumns = useCallback(() => {
    if (data && data[0] && data[0].attempts) {
      return data[0].attempts.map((attempt, i) => ({
        key: `attempt-${i}`,
        dataIndex: `attempt-${i}`,
        title: `Попытка №${i + 1}`,
        render: (text, record, index) => (
          <CustomTimePicker
            id={record.attempts[i].id}
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
        ),
      }));
    }

    return [];
  }, [data]);

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
      ...generateColumns(),
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
            <>{formatTime().format(defaultFormat)}</>
          );
        },
      },
    ],
    [generateColumns]
  );

  useEffect(() => {
    setIsLoading(true);
    timeMatchesApi
      .getTimeMatches({ eventId, nominationId })
      .then((response) => {
        if (response.status.ok) {
          const transformedData = transformData(response.data);
          setData(transformedData);
        } else {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [eventId, nominationId, transformData]);

  useEffect(() => {
    const handleUpdateTime = (id, time, index, isDisqualified) => {
      setData((prevData) =>
        prevData.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              attempts: item.attempts.map((attempt) => {
                if (attempt.id === id) {
                  return {
                    ...attempt,
                    result: formatTime(time).format(defaultFormat),
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
  }, [data]);

  return (
    <>
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <Flex vertical gap="large">
          {hasError ? (
            <Typography>
              При попытке получить данных произошла ошибка
            </Typography>
          ) : (
            <>
              <Table pagination={false} columns={columns} dataSource={data} />
              <Button
                style={{ margin: "10px 0px 10px 0px" }}
                className="endStage"
                type="primary"
              >
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
