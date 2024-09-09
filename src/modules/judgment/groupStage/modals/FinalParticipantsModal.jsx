import { useMatches } from "@hooks";
import { Button, Checkbox, Modal, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Locale } from "@constants";

const regex = /^[^@]+/;
const replaceRegex = /[^a-zA-Z0-9]+/g;

export const FinalParticipantsModal = ({ isOpen, onSubmit, onCancel }) => {
  const [tableData, setTableData] = useState([]);

  const { matches } = useMatches();

  const finalParticipantsTableColumns = [
    {
      title: "Участники",
      dataIndex: "participant",
      key: "participant",
      sorter: (a, b) => a.participant.localeCompare(b.participant),
    },
    {
      title: "Баллы",
      dataIndex: "score",
      key: "score",
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: "Очки",
      dataIndex: "points",
      key: "points",
      sorter: (a, b) => a.points - b.points,
    },
    {
      title: "Финальный этап",
      dataIndex: "isPassed",
      key: "isPassed",
      filterReset: "Сбросить",
      filters: [
        { text: "Отмеченные", value: true },
        { text: "Неотмеченные", value: false },
      ],
      onFilter: (value, record) => record.isPassed === value,
      sorter: (a, b) => (a.isPassed === b.isPassed ? 0 : a.isPassed ? -1 : 1),
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

  /**
   * Function to generate a unique key for a participant based on their name.
   * The key is derived from the part of the name before the '@' character,
   * and all non-alphanumeric characters are replaced with a hyphen.
   * The final key is converted to lowercase.
   *
   * @param {string} participant - The name of the participant.
   * @returns {string} A unique key for the participant.
   */
  const getParticipantKey = useCallback((participant) => {
    return participant.match(regex)[0].replace(replaceRegex, "-").toLowerCase();
  }, []);

  /**
   * Function to calculate points based on the scores of two teams.
   * Returns an array with the points for each team.
   *
   * @param {number} score1 - The score of the first team.
   * @param {number} score2 - The score of the second team.
   * @returns {Array<number>} An array with the points for each team.
   */
  const calculatePoints = useCallback((score1, score2) => {
    // If team 1 wins, return [3, 0]
    if (score1 > score2) return [3, 0];
    // If team 2 wins, return [0, 3]
    if (score1 < score2) return [0, 3];
    // If it's a draw, return [1, 1]
    return [1, 1];
  }, []);

  /**
   * Function to get participants from matches
   * @param {Array} matches - Array of matches
   * @returns {Array} - Array of participants
   */
  const getParticipants = useCallback(
    (matches) => {
      // Initialize an empty array to store participants
      const participants = matches.reduce((acc, match) => {
        // Extract team names and scores from the match
        const { team1, team2 } = match;
        // Calculate points for each team
        const [points1, points2] = calculatePoints(team1.score, team2.score);

        // Function to update a participant's score and points
        const updateParticipant = (name, score, points) => {
          // Find the participant in the array, or create a new one if not found
          const existingParticipant = acc.find((p) => p.participant === name);
          if (existingParticipant) {
            // Update the participant's score and points
            existingParticipant.score += score;
            existingParticipant.points += points;
          } else {
            // Create a new participant with the given name, score, points, and pass status
            acc.push({
              key: getParticipantKey(name),
              participant: name,
              score,
              points,
              isPassed: false,
            });
          }
        };

        updateParticipant(team1.name, team1.score, points1);
        updateParticipant(team2.name, team2.score, points2);

        return acc;
      }, []);

      participants.sort((a, b) => b.score - a.score || b.points - a.points);
      participants.slice(0, 3).forEach((participant) => {
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
      title="Финальные участники"
      open={isOpen}
      onCancel={onCancel}
      width={1080}
      footer={
        <Button onClick={handleOnSubmit} type="primary">
          Подтвердить
        </Button>
      }
    >
      <Table
        columns={finalParticipantsTableColumns}
        dataSource={tableData}
        pagination={false}
        locale={Locale}
      />
    </Modal>
  );
};
