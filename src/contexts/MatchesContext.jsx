import { judgmentApi } from "@api/judgment";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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

  const fetchData = useCallback(
    async (eventId, nominationId) => {
      setIsLoading(true);
      setError(null);
      try {
        const matches = await judgmentApi.getMatches(eventId, nominationId);
        const transformedMatches = transformMatches(matches);
        setMatches(transformedMatches);
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

  const context = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );
  return (
    <MatchesContext.Provider value={context}>
      {children}
    </MatchesContext.Provider>
  );
};
