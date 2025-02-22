import { useMatches } from "@hooks";
import { Checkbox, Table, Typography } from "antd";
import { paginationLocale, tableLocale } from "@constants";
import { useTranslation } from "react-i18next";
import { getTranslation } from "@utils";

import "@modules/judgment/groups/sass/table.scss";

export const TableGroupStage = ({ data }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: "№",
      key: "index",
      dataIndex: "index",
      render: (text, record, index) => <p>{index + 1}</p>,
    },
    {
      title: t("COMMON.TEAMS"),
      key: "name",
      dataIndex: "name",
    },
    {
      title: t("TOURNAMENTS.WINS"),
      key: "wins",
      dataIndex: "wins",
    },
    {
      title: t("TOURNAMENTS.LOSSES"),
      key: "losses",
      dataIndex: "losses",
    },
    {
      title: t("TOURNAMENTS.DRAWS"),
      key: "draws",
      dataIndex: "draws",
    },
    {
      title: t("TOURNAMENTS.SCORES"),
      key: "points",
      dataIndex: "points",
    },
    {
      title: t("TOURNAMENTS.POINTS"),
      key: "scores",
      dataIndex: "scores",
    },
  ];

  return data && data.length > 0 ? (
    <>
      {data.map((element, index) => (
        <div key={index}>
          {data.length > 1 && (
            <Typography.Title level={3}>
              {`${t("COMMON.GROUP")} ${index + 1}`}
            </Typography.Title>
          )}
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
