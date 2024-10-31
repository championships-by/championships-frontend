import { LoadingOutlined } from "@ant-design/icons";
import BronzeMedal from "@src/assets/img/bronze-medal.png";
import GoldMedal from "@src/assets/img/gold-medal.png";
import SilverMedal from "@src/assets/img/silver-medal.png";
import { Flex, Table, Tooltip, Typography } from "antd";

import "./CompetenciesResults.scss";

const columns = [
  {
    title: " ",
    key: "medal",
    render: (text, record, index) => (
      <>
        {index <= 2 && (
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
        )}
      </>
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
    dataIndex: "participants",
    key: "participants",
  },
  {
    title: <Tooltip title="Итоговый счет">Итоговый счет</Tooltip>,
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
        <Typography>При попытке получить данные произошла ошибка</Typography>
      ) : (
        <Table
          className="competencies-result-table"
          locale={{ emptyText: "Нет данных" }}
          pagination={false}
          columns={columns}
          dataSource={dataSource.sort((a, b) => b.totalScore - a.totalScore)}
        />
      )}
    </Flex>
  );
};
