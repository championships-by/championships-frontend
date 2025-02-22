import { judgmentApi } from "@api/judgment";
import { createContext, useCallback, useEffect, useState } from "react";
import { competenciesApi } from "@api";
import { message } from "antd";
import {
  getPlayOffLevels,
  isStillEditable,
  transformMatches,
  transformData,
  transformPlayoffMatches,
} from "@utils";
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

  const [isGroupStageEditable, setIsGroupStageEditable] = useState(false);
  const [isPlayoffStageEditable, setIsPlayoffStageEditable] = useState(false);

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
      const response = await judgmentApi.getPlayoffMatches(
        eventId,
        nominationId
      );

      const matches = response.data.matches;
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
      const response = await judgmentApi.getPlayoffResults(params);
      setResults(response.data);
    } catch (err) {}

    setIsLoading(false);
  };

  const fetchTimeFinishedData = async (eventId, nominationId) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("event_id", eventId);
      params.append("nomination_id", nominationId);
      const timeResponse = await competenciesApi.getTimeAfterFinishing(params);
      const isJudgeResponse = await competenciesApi.isJudge(params);

      setIsGroupStageEditable(
        isStillEditable(timeResponse.data.group_stage) && isJudgeResponse.data
      );
      setIsPlayoffStageEditable(
        isStillEditable(timeResponse.data.play_off_stage) &&
          isJudgeResponse.data
      );
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

      try {
        await fetchTimeFinishedData(eventId, nominationId);
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
      if (isPlayoff) {
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
      message.info("MESSAGES.EDIT_INFO");
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
      message.info("MESSAGES.EDIT_INFO");
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
    isGroupStageEditable,
    isPlayoffStageEditable,
  };

  return (
    <MatchesContext.Provider value={context}>
      {children}
    </MatchesContext.Provider>
  );
}
