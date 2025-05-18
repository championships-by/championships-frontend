import { useMatches } from "@/hooks";
import { Checkbox, Table, Typography, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { paginationLocale, tableLocale } from "@/const";
import { useTranslation } from "react-i18next";
import { getTranslation } from "@/utils";
import { useState, useEffect } from "react";

import "@/modules/judgment/groupStage/components/sass/table-group-stage.scss";

export const TableGroupStage = () => {
  const { t } = useTranslation();
  const { finalParticipants, isLoading } = useMatches();

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

  return isLoading ? (
    <Spin indicator={<LoadingOutlined spin />} />
  ) : finalParticipants && finalParticipants.length > 0 ? (
    <>
      {finalParticipants.map((element, index) => (
        <div key={index}>
          {finalParticipants.length > 1 && (
            <Typography.Title level={3}>
              {t("COMMON.GROUP")} {index + 1}{" "}
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

export default TableGroupStage;
