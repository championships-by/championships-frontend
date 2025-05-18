import { tableLocale } from "@/const";
import { Table } from "antd";
import React from "react";
import { getTranslation } from "@/utils";
import { useTranslation } from "react-i18next";

function TeamWinsTable({ teamWinsData }) {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("EVENTS.EVENTS"),
      key: "event",
      dataIndex: "event_name",
      width: "50%",
    },
    {
      title: t("COMMON.NOMINATIONS"),
      key: "nomination",
      dataIndex: "nomination_name",
    },
  ];

  return (
    <div>
      <Table
        dataSource={teamWinsData}
        columns={columns}
        locale={getTranslation(tableLocale, t)}
        pagination={false}
      />
    </div>
  );
}

export default TeamWinsTable;
