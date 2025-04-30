import { useMatches } from "@hooks";
import { Button, Checkbox, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { tableLocale } from "@const";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";
import { getParticipants } from "@utils";

export const FinalParticipantsModal = ({ isOpen, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);

  const { matches } = useMatches();

  const finalParticipantsTableColumns = [
    {
      title: t("COMMON.TEAMS"),
      dataIndex: "participant",
      key: "participant",
      sorter: (a, b) => a.participant.localeCompare(b.participant),
    },
    {
      title: t("TOURNAMENTS.SCORES"),
      dataIndex: "points",
      key: "points",
      sorter: (a, b) => a.points - b.points,
    },
    {
      title: t("TOURNAMENTS.POINTS"),
      dataIndex: "score",
      key: "score",
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: t("NOMINATION_TYPES.PLAYOFF"),
      dataIndex: "isPassed",
      key: "isPassed",
      filterReset: t("COMMON.RESET"),
      filters: [
        { text: t("TOURNAMENTS.MARKED"), value: true },
        { text: t("TOURNAMENTS.NOT_MARKED"), value: false },
      ],
      onFilter: (value, record) => record.isPassed === value,
      render: (value, record, index) => (
        <Checkbox
          checked={value}
          onChange={(e) => {
            const newTableData = tableData.map((item, idx) =>
              idx === index ? { ...item, isPassed: e.target.checked } : item
            );
            setTableData(newTableData);
          }}
        />
      ),
    },
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(tableData);
  };

  useEffect(() => {
    if (isOpen) {
      const data = getParticipants(matches);
      setTableData(data);
    }
  }, [isOpen, matches]);

  return (
    <Modal
      title={t("TOURNAMENTS.FINAL_PARTICIPANTS")}
      open={isOpen}
      onCancel={onCancel}
      width={1080}
      footer={
        <Button onClick={handleOnSubmit} type="primary">
          {t("COMMON.CONFIRM")}
        </Button>
      }
    >
      <Table
        columns={finalParticipantsTableColumns}
        dataSource={tableData}
        pagination={false}
        locale={getTranslation(tableLocale, t)}
      />
    </Modal>
  );
};
