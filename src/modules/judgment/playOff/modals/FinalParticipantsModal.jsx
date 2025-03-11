import { useMatches } from "@hooks";
import { Button, Checkbox, Modal, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { tableLocale } from "@constants";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";

const regex = /^[^@]+/;
const replaceRegex = /[^a-zA-Z0-9]+/g;

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

  const getParticipantKey = useCallback((participant) => {
    return participant.match(regex)[0].replace(replaceRegex, "-").toLowerCase();
  }, []);

  const calculatePoints = useCallback((score1, score2) => {
    if (score1 > score2) return [3, 0];
    if (score1 < score2) return [0, 3];
    return [1, 1];
  }, []);

  const getNextStageCount = (count) => {
    let n = 1;
    while (2 ** n <= count) {
      n++;
    }
    return 2 ** (n - 1);
  };

  const getParticipants = useCallback(
    (matches) => {
      const participants = matches.reduce((acc, match) => {
        const { team1, team2 } = match;
        const [points1, points2] = calculatePoints(team1.score, team2.score);

        const updateParticipant = (id, name, score, points) => {
          const existingParticipant = acc.find((p) => p.participant === name);
          if (existingParticipant) {
            existingParticipant.score += score;
            existingParticipant.points += points;
          } else {
            acc.push({
              id,
              key: getParticipantKey(name),
              participant: name,
              score,
              points,
              isPassed: false,
            });
          }
        };

        updateParticipant(team1.id, team1.name, team1.score, points1);
        updateParticipant(team2.id, team2.name, team2.score, points2);

        return acc;
      }, []);

      participants.sort((a, b) => b.points - a.points || b.score - a.score);
      const advancingCount = getNextStageCount(participants.length);
      participants.sort((a, b) => b.points - a.points || b.score - a.score);
      participants.slice(0, advancingCount).forEach((participant) => {
        participant.isPassed = true;
      });

      return participants;
    },
    [calculatePoints, getParticipantKey]
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(tableData);
  };

  useEffect(() => {
    if (isOpen) {
      const data = getParticipants(matches);
      setTableData(data);
    }
  }, [getParticipants, isOpen, matches]);

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
