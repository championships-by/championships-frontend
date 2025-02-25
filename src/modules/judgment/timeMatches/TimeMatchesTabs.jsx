import { competenciesApi, timeMatchesApi } from "@api";
import { defaultTime } from "@constants";
import {
  formatTimeToString,
  isTimeMatchesFilled,
  transformStageStatus,
  transformTimeMatchesData,
  downloadProtocol,
  isStillEditable,
} from "@utils";
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, message, Tabs, Flex } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { TimeMatchesResults, TimeMatchesTable } from "./components";
import { timeMatchesErrorMessages } from "./constants";
import { useTranslation } from "react-i18next";
import ReturnButton from "@modules/judgment/common/ReturnButton";

import "@modules/judgment/timeMatches/sass/time-matches.scss";

export const TimeMatchesTabs = () => {
  const { t } = useTranslation();
  const { eventId, nominationId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [stageStatus, setStageStatus] = useState({});
  const [timeMatches, setTimeMatches] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);
  const [isStageFinished, setIsStageFinished] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const onClickEditButton = () => {
    setIsEditModeEnabled(true);
  };

  const onClickCancelEditButton = () => {
    setIsEditModeEnabled(false);
    setIsDataLoaded(false);
  };

  const onClickApplyEditButton = async () => {
    try {
      await handleCompleteStage();
      setIsEditModeEnabled(false);
    } catch {}
  };

  const onClickCompleteStage = async () => {
    try {
      await handleCompleteStage();
      message.info(t("MESSAGES.EDITING_INFO"));
    } catch {}
  };

  const onClickSendResults = async () => {
    try {
      await handleSendResults();
      message.success(t("MESSAGES.SUCCESS_SEND_RESULTS"));
    } catch {}
  };

  const handleTimeChange = useCallback((id, time, isDisqualified) => {
    setTimeMatches((prev) =>
      prev.map((timeMatch) => {
        const updatedAttempts = timeMatch.attempts.map((attempt) =>
          attempt.id === id
            ? {
                ...attempt,
                result: time ? formatTimeToString(time) : null,
                isDisqualified,
              }
            : attempt
        );

        const bestAttempt = updatedAttempts.reduce((best, current) => {
          if (!best || current.result < best.result) {
            return current;
          }
          return best;
        }, null);

        return {
          ...timeMatch,
          attempts: updatedAttempts,
          bestAttempt,
        };
      })
    );
  }, []);

  const handleSendResults = useCallback(async () => {
    if (!isTimeMatchesFilled(timeMatches)) {
      message.warning(t("MESSAGES.FILL_ALL_FIELDS"));
      return;
    }

    const timeMatchData = timeMatches.flatMap((timeMatch) =>
      timeMatch.attempts.map(({ id, result, isDisqualified }) => ({
        nomination_event: {
          event_id: eventId,
          nomination_id: nominationId,
        },
        race_round_id: id,
        result: !result && isDisqualified ? "00:00.000" : result,
      }))
    );

    await timeMatchesApi.setTimeMatch(timeMatchData);
  });

  const handleCompleteStage = useCallback(async () => {
    await competenciesApi.finishTimeStage({
      event_id: eventId,
      nomination_id: nominationId,
    });

    setIsStageFinished(true);
    setActiveTabKey("2");
    setIsDataLoaded(false);
  }, [eventId, nominationId, timeMatches]);

  const handleDownload = async () => {
    try {
      downloadProtocol(eventId, nominationId);
    } catch {
      message.error(t("TOURNAMENTS.COULDNT_DOWNLOAD_FILE"));
    }
  };

  const items = useMemo(
    () => [
      {
        key: "1",
        label: t("COMMON.TABLE"),
        children: (
          <TimeMatchesTable
            editable={
              stageStatus.registrationFinished &&
              stageStatus.tournamentStarted &&
              ((!stageStatus.tournamentFinished && !isStageFinished) ||
                isEditModeEnabled)
            }
            timeMatches={timeMatches}
            isLoading={isLoading}
            isErrorOccurred={isErrorOccurred}
            onTimeChange={handleTimeChange}
          />
        ),
      },
      {
        key: "2",
        label: t("COMMON.RESULTS"),
        disabled:
          !(
            stageStatus.registrationFinished &&
            stageStatus.tournamentStarted &&
            stageStatus.tournamentFinished
          ) && !isStageFinished,
        children: (
          <TimeMatchesResults
            timeMatches={timeMatches}
            isLoading={isLoading}
            isErrorOccurred={isErrorOccurred}
          />
        ),
      },
    ],
    [
      handleTimeChange,
      isErrorOccurred,
      isLoading,
      stageStatus.registrationFinished,
      stageStatus.tournamentFinished,
      stageStatus.tournamentStarted,
      timeMatches,
      isStageFinished,
      isEditModeEnabled,
    ]
  );

  useEffect(() => {
    if (!isDataLoaded) {
      setIsLoading(true);

      const params = new URLSearchParams();
      params.append("event_id", eventId);
      params.append("nomination_id", nominationId);

      let transformedTimeMatches;

      Promise.all([
        competenciesApi.getNominationEventInfo(params),
        timeMatchesApi.getTimeMatches(eventId, nominationId),
        competenciesApi.getTimeAfterFinishing(params),
        competenciesApi.isJudge(params),
      ])
        .then(
          ([
            stageStatusResponse,
            timeMatchesResponse,
            timeAfterFinishingResponse,
            isJudgeResponse,
          ]) => {
            const transformedStageStatus =
              transformStageStatus(stageStatusResponse);
            setStageStatus(transformedStageStatus);

            if (transformedStageStatus.tournamentFinished) {
              setIsStageFinished(true);

              transformedTimeMatches = transformTimeMatchesData(
                timeMatchesResponse.data,
                false
              );
            } else {
              transformedTimeMatches = transformTimeMatchesData(
                timeMatchesResponse.data,
                true
              );
            }

            setTimeMatches(transformedTimeMatches);

            setIsEditable(
              isStillEditable(timeAfterFinishingResponse.data.stage) &&
                isJudgeResponse.data
            );
          }
        )
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            message.error(t("MESSAGES.ERROR"));
            setIsErrorOccurred(true);
          }
        })
        .finally(() => {
          setIsLoading(false);
          setIsDataLoaded(true);
        });
    }
  }, [eventId, nominationId, isDataLoaded, isStageFinished]);

  const buttonsForUnfinishedStage = (
    <Flex gap="small">
      <Button type="primary" onClick={onClickSendResults}>
        {t("COMMON.SEND_RESULTS")}
      </Button>
      <Button type="primary" onClick={onClickCompleteStage}>
        {t("COMMON.COMPLETE_STAGE")}
      </Button>
    </Flex>
  );

  const buttonsForFinishedStage = (
    <Flex gap="middle">
      {isEditable &&
        (isEditModeEnabled ? (
          <Flex gap="small">
            <Button onClick={onClickCancelEditButton}>
              <Flex gap="small">
                <CloseOutlined />
                {t("COMMON.CANCEL")}
              </Flex>
            </Button>
            <Button onClick={onClickApplyEditButton}>
              <Flex gap="small">
                <CheckOutlined />
                {t("COMMON.APPLY")}
              </Flex>
            </Button>
          </Flex>
        ) : (
          <Button onClick={onClickEditButton}>
            <Flex gap="small">
              <EditOutlined />
              {t("COMMON.EDIT")}
            </Flex>
          </Button>
        ))}
      <Button type="primary" onClick={handleDownload}>
        {t("COMMON.FINAL_PROTOCOL")}
      </Button>
    </Flex>
  );

  return (
    <Flex vertical gap="middle">
      <Tabs
        activeKey={activeTabKey}
        onChange={setActiveTabKey}
        items={items}
        tabBarExtraContent={{
          right: isStageFinished
            ? buttonsForFinishedStage
            : buttonsForUnfinishedStage,
        }}
      />
      {isStageFinished && <ReturnButton />}
    </Flex>
  );
};
