/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import { Button, message, Tabs, Flex, Divider } from "antd";
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReturnButton from "@modules/judgment/common/ReturnButton";
import { MatchesGroupStage } from "@modules/judgment/roundRobin/Matches";
import { downloadProtocol } from "@utils";
import { useParams } from "react-router-dom";
import { competenciesApi, judgmentApi } from "@api";
import { TableGroupStage } from "./Table";

export function RoundRobinTabs() {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const { eventId, nominationId } = useParams();
  const [isFinished, setIsFinished] = useState(false);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [finalParticipants, setFinalParticipants] = useState([]);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, [eventId, nominationId]);

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

  const fetchGroupStageData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const matches = await judgmentApi.getMatches(eventId, nominationId);
      console.log(matches);
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

  const fetchResultsData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append("event_id", eventId);
      params.append("nomination_id", nominationId);
      // const response = await judgmentApi.getPlayoffResults(params);
      // setResults(response.data);
    } catch (err) {}

    setIsLoading(false);
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("event_id", eventId);
      params.append("nomination_id", nominationId);
      console.log(params);

      const statusInfo = (await competenciesApi.getPlayoffStatus(params)).data;
      setIsFinished(statusInfo.group_stage_finished);

      try {
        await fetchGroupStageData(eventId, nominationId);
      } catch (err) {
        console.log(error);
      }

      if (statusInfo.group_stage_finished) {
        try {
          await fetchResultsData(eventId, nominationId);
        } catch {}
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const handleClickFinishGroupStage = async (e) => {
    e.preventDefault();
    const completed = matches.every(
      ({ lastResultCreatorEmail }) => lastResultCreatorEmail !== null
    );

    if (!completed) {
      messageApi.error(t("TOURNAMENTS.NOT_ALL_MATCHES_FILLED"));
      return;
    }

    try {
      const body = { event_id: eventId, nomination_id: nominationId };
      await competenciesApi.finishGroupStage(body);
      message.success(t("TOURNAMENTS.GROUP_STAGE_FINISHED"));
      fetchData(eventId, nominationId);
    } catch {}
  };

  const onClickDownloadProtocol = async () => {
    try {
      await downloadProtocol(eventId, nominationId);
    } catch {
      message.error(t("TOURNAMENTS.COULDNT_DOWNLOAD_FILE"));
    }
  };

  const items = [
    {
      key: "1",
      label: t("COMMON.TABLE"),
      children: <TableGroupStage data={finalParticipants} />,
    },
    {
      key: "2",
      label: t("TOURNAMENTS.MATCHES"),
      children: (
        <MatchesGroupStage
          matches={matches}
          isFinished={isFinished}
          isLoading={isLoading}
          error={error}
          fetchData={fetchData}
        />
      ),
    },
    {
      key: "3",
      label: t("COMMON.RESULTS"),
      children: <></>,
      disabled: !isFinished,
    },
  ];

  return (
    <Flex vertical gap="middle">
      {contextHolder}
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabBarExtraContent={{
          right: (
            <Flex gap="small">
              {!isFinished ? (
                <Button onClick={handleClickFinishGroupStage} type="primary">
                  {t("COMMON.COMPLETE_STAGE")}
                </Button>
              ) : (
                <Button type="primary" onClick={onClickDownloadProtocol}>
                  {t("COMMON.FINAL_PROTOCOL")}
                </Button>
              )}
            </Flex>
          ),
        }}
      />
      {isFinished && (
        <>
          <ReturnButton />
        </>
      )}
    </Flex>
  );
}
