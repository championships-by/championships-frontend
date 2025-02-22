import { Button, message, Tabs, Flex, Divider } from "antd";
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReturnButton from "@modules/judgment/common/ReturnButton";
import { MatchesGroupStage } from "@modules/judgment/roundRobin/Matches";
import {
  downloadProtocol,
  isStillEditable,
  transformMatches,
  transformData,
} from "@utils";
import { useParams } from "react-router-dom";
import { competenciesApi, judgmentApi } from "@api";
import { TableGroupStage } from "./Table";

export function RoundRobinTabs() {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const { eventId, nominationId } = useParams();
  const [isFinished, setIsFinished] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [finalParticipants, setFinalParticipants] = useState([]);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const isEnabled = !isFinished || isEditable;

  useEffect(() => {
    fetchData();
  }, [eventId, nominationId]);

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

  const fetchTimeFinishedData = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("event_id", eventId);
      params.append("nomination_id", nominationId);
      const timeResponse = await competenciesApi.getTimeAfterFinishing(params);
      const isJudgeResponse = await competenciesApi.isJudge(params);

      setIsEditable(
        isStillEditable(timeResponse.data.stage) && isJudgeResponse.data
      );
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
        await fetchGroupStageData();
      } catch (err) {
        console.log(error);
      }

      if (statusInfo.group_stage_finished) {
        try {
          await fetchResultsData();
          await fetchTimeFinishedData();
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
          isFinished={isEnabled}
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
