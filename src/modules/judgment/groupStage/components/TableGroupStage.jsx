import { useMatches } from "@hooks";
import { Checkbox, Table, Typography } from "antd";
import { paginationLocale, tableLocale } from "@constants";
import { useTranslation } from "react-i18next";
import { getTranslation } from "@utils";

import "./TableGroupStage.scss";

export const TableGroupStage = () => {
  const { t } = useTranslation();
  const { finalParticipants } = useMatches();

  const columns = [
    {
      title: "№",
      key: "index",
      dataIndex: "index",
      render: (text, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Команды",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Выигрыши",
      key: "wins",
      dataIndex: "wins",
    },
    {
      title: "Проигрыши",
      key: "losses",
      dataIndex: "losses",
    },
    {
      title: "Ничьи",
      key: "draws",
      dataIndex: "draws",
    },
    {
      title: "Баллы",
      key: "points",
      dataIndex: "points",
    },
    {
      title: "Очки",
      key: "scores",
      dataIndex: "scores",
    },
  ];

  return finalParticipants && finalParticipants.length > 0 ? (
    <>
      {finalParticipants.map((element, index) => (
        <div key={index}>
          <Typography.Title level={3}>{`Группа ${index + 1}`}</Typography.Title>
          <Table
            columns={columns}
            pagination={false}
            dataSource={element.teams}
            locale={getTranslation(tableLocale, t)}
          />
        </div>
      ))}
    </>
  ) : null;
};
