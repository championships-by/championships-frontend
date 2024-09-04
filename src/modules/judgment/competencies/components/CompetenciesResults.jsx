import { LoadingOutlined } from "@ant-design/icons";
import BronzeMedal from "@src/assets/img/bronze-medal.png";
import GoldMedal from "@src/assets/img/gold-medal.png";
import SilverMedal from "@src/assets/img/silver-medal.png";
import { Flex, Table, Tooltip, Typography } from "antd";

const columns = [
  {
    key: "medal",
    render: (text, record, index) => (
      <div>
        <img
          src={
            index + 1 === 1
              ? GoldMedal
              : index + 1 === 2
                ? SilverMedal
                : index + 1 === 3
                  ? BronzeMedal
                  : ""
          }
          style={{ width: "50px", height: "50px" }}
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
    title: <Tooltip title="Лучший счет">Лучший счет</Tooltip>,
    dataIndex: "totalScore",
    key: "totalScore",
    render: (text, record) => record.totalScore ?? "-",
  },
];

export const CompetenciesResults = ({ dataSource, isLoading, hasError }) => {
  return isLoading ? (
    <LoadingOutlined />
  ) : (
    <Flex vertical gap="large">
      {hasError ? (
        <Typography>При попытке получить данных произошла ошибка</Typography>
      ) : (
        <Table
          locale={{ emptyText: "Нет данных" }}
          pagination={false}
          columns={columns}
          dataSource={dataSource.sort((a, b) => b.totalScore - a.totalScore)}
        />
      )}
    </Flex>
  );
};
