import { useMatches } from "@hooks";
import { Checkbox, Table } from "antd";
import { paginationLocale } from "@constants";
import "./TableGroupStage.scss";
import { useTranslation } from "react-i18next";
import { getTranslation } from "@utils";

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
      title: t("COMMON.PARTICIPANTS"),
      key: "participant",
      dataIndex: "participant",
    },
    {
      title: t("TOURNAMENTS.POINTS"),
      key: "points",
      dataIndex: "points",
    },
    {
      title: t("TOURNAMENTS.SCORE"),
      key: "score",
      dataIndex: "score",
    },
    {
      title: t("COMMON.PARTICIPANTS"),
      key: "isPassed",
      dataIndex: "isPassed",
      render: (text, record) => (
        <Checkbox defaultChecked={record.isPassed} disabled />
      ),
    },
  ];

  return !finalParticipants || finalParticipants.length === 0 ? (
    <div className="no-data">
      <h2>{t("TOURNAMENTS.NO_DATA_ABOUT_MATCHES")}</h2>
    </div>
  ) : (
    <Table
      columns={columns}
      pagination={{
        position: ["bottomCenter"],
        locale: getTranslation(paginationLocale, t),
      }}
      dataSource={finalParticipants}
    />
  );
};
