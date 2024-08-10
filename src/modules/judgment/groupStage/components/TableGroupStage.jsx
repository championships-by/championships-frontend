import { Flex, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Queries from "../api/Queries";
import "./sass/groupStage.scss";

export const TableGroupStage = () => {
  const [dataParticipant, setParticipant] = useState([]);
  const columns = [
    {
      title: <Tooltip title="Место">Место</Tooltip>,
      dataIndex: "place",
      key: "place",
    },
    {
      title: <Tooltip title="Участники">Участники</Tooltip>,
      key: "name",
      dataIndex: "name",
    },
    {
      title: <Tooltip title="Количество сыгранных матчей">Матчи</Tooltip>,
      key: "matches",
      dataIndex: "matches",
    },
    {
      title: <Tooltip title="Количество выигранных матчи">Победы</Tooltip>,
      dataIndex: "wins",
      key: "wins",
    },
    {
      title: (
        <Tooltip title="Количество матчей,сыгранных вничью">Ничьи</Tooltip>
      ),
      dataIndex: "draws",
      key: "draws",
    },
    {
      title: <Tooltip title="Количество проигранных матчей">Поражения</Tooltip>,
      dataIndex: "losses",
      key: "losses",
    },
    {
      title: <Tooltip title="Количество заработанных очков">Очки</Tooltip>,
      dataIndex: "points",
      key: "points",
    },
    {
      title: (
        <Tooltip title="Количество баллов, выставленных судьёй">Счёт</Tooltip>
      ),
      dataIndex: "get_score",
      key: "get_score",
    },
  ];

  const getStats = (group) => {
    const teams = new Map();

    const addTeam = (team) => {
      teams.set(team, {
        matches: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        points: 0,
        get_score: 0,
      });
    };
    const changeStats = (name, winner) => {
      if (!teams.has(name)) {
        addTeam(name);
      }

      teams.get(name).matches++;
      if (winner === null) {
        teams.get(name).draws++;
        teams.get(name).points += 1;
      } else if (name == winner) {
        teams.get(name).wins++;
        teams.get(name).points += 3;
      } else {
        teams.get(name).losses++;
      }
    };
    group.matches.forEach((match) => {
      let winner = null;
      if (match.team1_score > match.team2_score) {
        winner = match.team1?.name;
      }
      if (match.team2_score > match.team1_score) {
        winner = match.team2?.name;
      }
      if (match.team1) {
        changeStats(match.team1.name, winner);
      }

      if (match.team2) {
        changeStats(match.team2.name, winner);
      }
    });

    const result = [];

    for (const el of teams) {
      result.push({
        key: el[0],
        name: el[0],
        matches: el[1].matches,
        wins: el[1].wins,
        losses: el[1].losses,
        draws: el[1].draws,
        place: 1,
        points: el[1].points,
        get_score: el[1].get_score,
      });
    }
    result.sort((first, second) => {
      if (second.points !== first.points) {
        return second.points - first.points;
      }
      if (second.wins !== first.wins) {
        return second.wins - first.wins;
      }
      return first.name.localeCompare(second.name);
    });
    const get_score = new Map();
    group.matches.forEach((match) => {
      if (!get_score.has(match.team1.name)) {
        get_score.set(match.team1.name, 0);
      }

      if (!get_score.has(match.team2.name)) {
        get_score.set(match.team2.name, 0);
      }
      get_score.set(
        match.team1.name,
        get_score.get(match.team1.name) + match.team1_score
      );
      get_score.set(
        match.team2.name,
        get_score.get(match.team2.name) + match.team2_score
      );
    });
    result.forEach((team, index) => {
      team.place = index + 1;
      team.get_score = get_score.get(team.name);
    });

    return result;
  };

  const { eventId, nominationId } = useParams();

  useEffect(() => {
    (async () => {
      const responseJson = await Queries.getMatches(eventId, nominationId);
      setParticipant(responseJson);
    })();
  }, []);

  return (
    <Flex vertical gap="large">
      {dataParticipant?.map((participants, index) => (
        <div key={index}>
          <div>Группа {participants.group_id}</div>
          <Table
            style={{
              width: 100,
            }}
            pagination={false}
            columns={columns}
            dataSource={getStats(participants)}
            key={index}
          />
        </div>
      ))}
    </Flex>
  );
};
