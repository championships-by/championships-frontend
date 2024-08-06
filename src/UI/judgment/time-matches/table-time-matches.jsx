import { LoadingOutlined } from "@ant-design/icons";
import { Button, Flex, Table, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { timeMatchesApi } from "./api/time-matches-api";
import { CustomTimePicker } from "./components";
import "./sass/time-matches.scss";

function TableTimeMatches() {
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { eventId, nominationId } = useParams();

  const columns = [
    {
      title: <Tooltip title="Место">Место</Tooltip>,
      dataIndex: "place",
      key: "place",
    },
    {
      title: <Tooltip title="Участник">Участники</Tooltip>,
      dataIndex: "participants",
      key: "participants",
    },
    {
      title: <Tooltip title="Попытка №1">Попытка №1</Tooltip>,
      dataIndex: "first_attempt",
      key: "first_attempt",
      render: () => <CustomTimePicker />,
    },
    {
      title: <Tooltip title="Попытка №2">Попытка №2</Tooltip>,
      dataIndex: "second_attempt",
      key: "second_attempt",
      render: () => <CustomTimePicker />,
    },
    {
      title: <Tooltip title="Попытка №3">Попытка №3</Tooltip>,
      dataIndex: "third_attempt",
      key: "third_attempt",
      render: () => <CustomTimePicker />,
    },
    {
      title: <Tooltip title="Лучшее время">Лучшее время</Tooltip>,
      dataIndex: "best_attempt",
      key: "best_attempt",
      render: (text, record) => {
        const attempts = [
          record.first_attempt,
          record.second_attempt,
          record.third_attempt,
        ];

        const isAllDisqualified = attempts.every(
          (attempt) => attempt === "Дисквалифицирован"
        );

        if (isAllDisqualified) {
          return "-";
        }

        const bestAttempt = attempts
          .filter((attempt) => attempt !== "Дисквалифицирован")
          .sort((a, b) => {
            const timeA = dayjs(a, "mm:ss.SSS");
            const timeB = dayjs(b, "mm:ss.SSS");

            return timeA.diff(timeB);
          })[0];

        return bestAttempt;
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    timeMatchesApi
      .getTimeMatches({ eventId, nominationId })
      .then((response) => {
        if (response.status.ok) {
          setData(response.data);
        } else {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [eventId, nominationId]);

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
