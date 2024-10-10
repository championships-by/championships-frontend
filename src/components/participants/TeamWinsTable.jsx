import { Locale } from "@constants";
import { Table } from "antd";
import React from "react";

const columns = [
  {
    title: "Мероприятие",
    key: "event",
    dataIndex: "event_name",
    width: "50%",
  },
  {
    title: "Компетенции",
    key: "nomination",
    dataIndex: "nomination_name",
  },
];

function TeamWinsTable({ teamWinsData }) {
  return (
    <div>
      <Table
        dataSource={teamWinsData}
        columns={columns}
        locale={Locale}
        pagination={false}
      />
    </div>
  );
}

export default TeamWinsTable;
