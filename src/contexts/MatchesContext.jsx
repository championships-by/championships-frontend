import { judgmentApi } from "@api/judgment";
import { createContext, useCallback, useEffect, useState } from "react";

export const MatchesContext = createContext();

export const MatchesProvider = ({ eventId, nominationId, children }) => {
  const [matches, setMatches] = useState([]);
  const [finalParticipants, setFinalParticipants] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const transformMatches = useCallback((data) => {
    return data
      .flatMap((group) =>
        group.matches.map((match) => ({
          id: match.match_id,
          team1: {
            name: match.team1.name,
            score: match.team1_score,
          },
          team2: {
            name: match.team2.name,
            score: match.team2_score,
          },
          lastResultCreatorEmail: match.last_result_creator_email,
          matchQueueNumber: match.match_queue_number,
        }))
      )
      .sort((a, b) => a.id - b.id);
  }, []);

  const transformData = (data) => {
    return data.map((group) => {
      const teamStats = {};

      group.matches.forEach((match) => {
        const { team1, team2, team1_score, team2_score } = match;

        if (!teamStats[team1.name]) {
          teamStats[team1.name] = {
            name: team1.name,
            wins: 0,
            losses: 0,
            draws: 0,
            points: 0,
            scores: 0,
          };
        }
        if (!teamStats[team2.name]) {
          teamStats[team2.name] = {
            name: team2.name,
            wins: 0,
            losses: 0,
            draws: 0,
            points: 0,
            scores: 0,
          };
        }

        if (team1_score > team2_score) {
          teamStats[team1.name].wins += 1;
          teamStats[team1.name].points += 3;
          teamStats[team2.name].losses += 1;
        } else if (team1_score < team2_score) {
          teamStats[team2.name].wins += 1;
          teamStats[team2.name].points += 3;
          teamStats[team1.name].losses += 1;
        } else {
          teamStats[team1.name].draws += 1;
          teamStats[team1.name].points += 1;
          teamStats[team2.name].draws += 1;
          teamStats[team2.name].points += 1;
        }

        teamStats[team1.name].scores += team1_score;
        teamStats[team2.name].scores += team2_score;
      });

      // Преобразуем teamStats в массив
      const teams = Object.values(teamStats);

      return {
        group_id: group.group_id,
        teams,
      };
    });
  };

  const fetchData = useCallback(
    async (eventId, nominationId) => {
      setIsLoading(true);
      setError(null);
      try {
        const matches = await judgmentApi.getMatches(eventId, nominationId);
        const transformedMatches = transformMatches(matches.data);
        setMatches(transformedMatches);
        const transformedData = transformData(matches.data);
        console.log(transformData);
        setFinalParticipants(transformedData);
      } catch (error) {
        setError("Произошла ошибка получения данных");
      } finally {
        setIsLoading(false);
      }
    },
    [transformMatches]
  );

  const handleEditScore = useCallback((match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  }, []);

  const handleSubmitScore = useCallback(
    async ({ id, eventId, nominationId, team1, team2 }) => {
      try {
        const response = await judgmentApi.setMatches(
          eventId,
          nominationId,
          id,
          team1.score,
          team2.score
        );

        if (response.ok) {
          fetchData(eventId, nominationId);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [fetchData]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    fetchData(eventId, nominationId);
  }, [fetchData, eventId, nominationId]);

  const context = {
    eventId,
    nominationId,
    matches,
    finalParticipants,
    setFinalParticipants,
    selectedMatch,
    isModalOpen,
    isLoading,
    error,
    fetchData,
    handleEditScore,
    handleSubmitScore,
    handleCloseModal,
  };

  return (
    <MatchesContext.Provider value={context}>
      {children}
    </MatchesContext.Provider>
  );
};
