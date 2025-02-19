import { judgmentApi } from "@api/judgment";
import { createContext, useCallback, useEffect, useState } from "react";
import { competenciesApi } from "@api";
import { message } from "antd";
import { getPlayOffLevels } from "@utils";
import { useTranslation } from "react-i18next";

export const MatchesContext = createContext();

export function MatchesProvider({ eventId, nominationId, children }) {
  const { t } = useTranslation();

  const [matches, setMatches] = useState([]);
  const [playoffMatches, setPlayoffMatches] = useState([]);
  const [leveledPlayoffMatches, setLeveledPlayoffMatches] = useState([]);
  const [finalParticipants, setFinalParticipants] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedPlayoffMatch, setSelectedPlayoffMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const [isGroupStageFinished, setIsGroupStageFinished] = useState(false);
  const [isPlayoffStageFinished, setIsPlayoffStageFinished] = useState(false);

  const transformMatches = (data) => {
    return data
      .flatMap((group) =>
        group.matches.map((match) => ({
          group_id: group.group_id,
          id: match.match_id,
          team1: {
            id: match.team1.id,
            name: match.team1.name,
            score: match.team1_score,
          },
          team2: {
            id: match.team2.id,
            name: match.team2.name,
            score: match.team2_score,
          },
          lastResultCreatorEmail: match.last_result_creator_email,
          matchQueueNumber: match.match_queue_number,
        }))
      )
      .sort((a, b) => a.id - b.id);
  };

  const transformPlayoffMatches = (data) => {
    return data.map((match) => ({
      id: match.match_id,
      next_id: match.next_match_id,
      team1: match.team1
        ? {
            id: match.team1.id,
            name: match.team1.name,
            score: match.team1_score,
          }
        : null,
      team2: match.team2
        ? {
            id: match.team2.id,
            name: match.team2.name,
            score: match.team2_score,
          }
        : null,
      lastResultCreatorEmail: match.last_result_creator_email,
    }));
  };

  const transformData = (data) => {
    return data.map((group) => {
      const teamStats = {};

      group.matches.forEach((match) => {
        const {
          team1,
          team2,
          team1_score,
          team2_score,
          last_result_creator_email,
        } = match;

        if (!teamStats[team1.name]) {
          teamStats[team1.name] = {
            id: team1.id,
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
            id: team2.id,
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
        } else if (last_result_creator_email !== null) {
          teamStats[team1.name].draws += 1;
          teamStats[team1.name].points += 1;
          teamStats[team2.name].draws += 1;
          teamStats[team2.name].points += 1;
        }

        teamStats[team1.name].scores += team1_score;
        teamStats[team2.name].scores += team2_score;
      });

      const teams = Object.values(teamStats);
      return {
        group_id: group.group_id,
        teams,
      };
    });
  };

  const fetchGroupStageData = async (eventId, nominationId) => {
    setIsLoading(true);
    setError(null);
    try {
      const matches = await judgmentApi.getMatches(eventId, nominationId);
      const transformedMatches = transformMatches(matches.data);
      setMatches(transformedMatches);
      const transformedData = transformData(matches.data);
      setFinalParticipants(transformedData);
    } catch (error) {
      setError("Произошла ошибка получения данных");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlayoffStageData = async (eventId, nominationId) => {
    setIsLoading(true);
    setError(null);
    try {
      const responce = await judgmentApi.getPlayoffMatches(
        eventId,
        nominationId
      );

      const matches = responce.data.matches;
      const transformedMatches = transformPlayoffMatches(matches);
      const leveledMatches = getPlayOffLevels(transformedMatches);

      setPlayoffMatches(transformedMatches);
      setLeveledPlayoffMatches(leveledMatches);
    } catch (e) {}
    setIsLoading(false);
  };

  const fetchResultsData = async (eventId, nominationId) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append("event_id", eventId);
      params.append("nomination_id", nominationId);
      const responce = await judgmentApi.getPlayoffResults(params);
      setResults(responce.data);
    } catch (err) {}

    setIsLoading(false);
  };

  const fetchData = async (eventId, nominationId) => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("event_id", eventId);
      params.append("nomination_id", nominationId);

      const statusInfo = (await competenciesApi.getPlayoffStatus(params)).data;
      setIsGroupStageFinished(statusInfo.group_stage_finished);
      setIsPlayoffStageFinished(statusInfo.play_off_stage_finished);

      try {
        await fetchGroupStageData(eventId, nominationId);
      } catch {}

      if (statusInfo.group_stage_finished) {
        try {
          await fetchPlayoffStageData(eventId, nominationId);
        } catch {}
      }

      if (statusInfo.play_off_stage_finished) {
        try {
          await fetchResultsData(eventId, nominationId);
        } catch {}
      }
    } catch {}

    setIsLoading(false);
  };

  const handleEditScore = (match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleSubmitScore = async ({
    id,
    eventId,
    nominationId,
    team1,
    team2,
    isPlayoff,
  }) => {
    try {
      if (isPlayoff === true) {
        await judgmentApi.setPlayoffMatch(
          eventId,
          nominationId,
          id,
          team1.score,
          team2.score
        );
      } else {
        await judgmentApi.setMatches(
          eventId,
          nominationId,
          id,
          team1.score,
          team2.score
        );
      }
      fetchData(eventId, nominationId);
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFinishGroupStage = async () => {
    try {
      const body = { event_id: eventId, nomination_id: nominationId };
      await competenciesApi.finishGroupStage(body);
      message.success(t("TOURNAMENTS.GROUP_STAGE_FINISHED"));
      fetchData(eventId, nominationId);
    } catch {}
  };

  const handleStartPlayoffStage = async (data) => {
    const passedTeamsData = data.filter((team) => team.isPassed);
    const passedTeamsIds = passedTeamsData.map((team) => ({
      id: team.id.toString(),
    }));

    try {
      const body = {
        nomination_event: { event_id: eventId, nomination_id: nominationId },
        teams: passedTeamsIds,
      };
      await competenciesApi.startPlayoffStage(body);
      fetchGroupStageData(eventId, nominationId);
    } catch {}
  };

  const finishPlayoffStage = async () => {
    setIsLoading(true);
    try {
      const body = { event_id: eventId, nomination_id: nominationId };
      await competenciesApi.finishPlayoffStage(body);
      message.success(t("TOURNAMENTS.PLAYOFF_STAGE_FINISHED"));
      fetchData(eventId, nominationId);
    } catch {}
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(eventId, nominationId);
  }, [eventId, nominationId]);

  const context = {
    eventId,
    nominationId,
    matches,
    playoffMatches,
    leveledPlayoffMatches,
    finalParticipants,
    setFinalParticipants,
    selectedMatch,
    selectedPlayoffMatch,
    isModalOpen,
    isLoading,
    error,
    fetchData,
    handleEditScore,
    handleSubmitScore,
    handleCloseModal,
    handleFinishGroupStage,
    handleStartPlayoffStage,
    isGroupStageFinished,
    isPlayoffStageFinished,
    finishPlayoffStage,
    results,
  };

  return (
    <MatchesContext.Provider value={context}>
      {children}
    </MatchesContext.Provider>
  );
}
