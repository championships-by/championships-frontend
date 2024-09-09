import { LoadingOutlined } from "@ant-design/icons";
import { Locale } from "@constants";
import BronzeMedal from "@src/assets/img/bronze-medal.png";
import GoldMedal from "@src/assets/img/gold-medal.png";
import SilverMedal from "@src/assets/img/silver-medal.png";
import { Flex, Table, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import "./TimeMatchesResult.scss";

const columns = [
  {
    title: "№",
    key: "medal",
    render: (text, record, index) => (
      <div className="medal-column">
        <img
          src={
            index === 0
              ? GoldMedal
              : index === 1
                ? SilverMedal
                : index === 2
                  ? BronzeMedal
                  : ""
          }
        />
      </div>
    ),
  },
  {
    title: <Tooltip title="Место">Место</Tooltip>,
    dataIndex: "place",
    key: "place",
    render: (text, record, index) => index + 1,
  },
  {
    title: <Tooltip title="Участник">Участники</Tooltip>,
    dataIndex: "participant",
    key: "participant",
    render: ({ firstName, secondName, thirdName }) =>
      `${secondName} ${firstName} ${thirdName}`,
  },
  {
    title: <Tooltip title="Лучшее время">Лучшее время</Tooltip>,
    dataIndex: "bestAttempt",
    key: "bestAttempt",
    render: (text, record) => record.bestAttempt.result ?? "-",
  },
];

export const TimeMatchesResults = ({
  timeMatches,
  isLoading,
  isErrorOccurred,
}) => {
  return isLoading ? (
    <LoadingOutlined />
  ) : (
    <Flex vertical gap="large">
      {isErrorOccurred ? (
        <Typography>При попытке получить данных произошла ошибка</Typography>
      ) : (
        <Table
          className="time-matches-table"
          pagination={false}
          columns={columns}
          locale={Locale}
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
