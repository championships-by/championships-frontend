import { competenciesApi, timeMatchesApi } from "@api";
import { defaultTime } from "@constants";
import {
  formatTimeToString,
  isTimeMatchesFilled,
  transformStageStatus,
  transformTimeMatchesData,
} from "@utils";
import { Button, message, Tabs } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { TimeMatchesResults, TimeMatchesTable } from "./components";
import { timeMatchesErrorMessages } from "./constants";

export const TimeMatchesTabs = () => {
  const { eventId, nominationId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [stageStatus, setStageStatus] = useState({});
  const [timeMatches, setTimeMatches] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);
  const [isStageFinished, setIsStageFinished] = useState(false);

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

  const handleCompleteStage = useCallback(async () => {
    try {
      if (!isTimeMatchesFilled(timeMatches)) {
        message.warning("Заполните все поля!");
        return;
      }

      const timeMatchPromises = timeMatches.flatMap((timeMatch) =>
        timeMatch.attempts.map(({ id, result, isDisqualified }) =>
          timeMatchesApi
            .setTimeMatch(
              eventId,
              nominationId,
              id,
              !result && isDisqualified ? defaultTime : result
            )
            .catch((reason) => console.error(reason))
        )
      );

      await Promise.allSettled(timeMatchPromises);

      await competenciesApi.finishTimeStage({
        event_id: eventId,
        nomination_id: nominationId,
      });
    } catch (error) {
      const statusCode = error.response.status;
      const errorMessage =
        timeMatchesErrorMessages[statusCode] ||
        timeMatchesErrorMessages.default;
      message.error(errorMessage);
    }
  }, [eventId, nominationId, timeMatches]);

  const handleDownload = useCallback(() => {
    console.log("download file");
  }, []);

  const items = useMemo(
    () => [
      {
        key: "1",
        label: "Таблица",
        children: (
          <TimeMatchesTable
            editable={
              stageStatus.registrationFinished &&
              stageStatus.tournamentStarted &&
              !stageStatus.tournamentFinished
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
        label: "Итоги",
        disabled: !(
          stageStatus.registrationFinished &&
          stageStatus.tournamentStarted &&
          stageStatus.tournamentFinished
        ),
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
    ]
  );

  useEffect(() => {
    if (!isDataLoaded) {
      setIsLoading(true);

      const params = new URLSearchParams();
      params.append("event_id", eventId);
      params.append("nomination_id", nominationId);

      Promise.all([
        competenciesApi.getNominationEventInfo(params),
        timeMatchesApi.getTimeMatches(eventId, nominationId),
      ])
        .then(([stageStatusResponse, timeMatchesResponse]) => {
          const transformedStageStatus =
            transformStageStatus(stageStatusResponse);
          setStageStatus(transformedStageStatus);

          if (transformedStageStatus.tournamentFinished) {
            setIsStageFinished(true);
          }
          const transformedTimeMatches = transformTimeMatchesData(
            timeMatchesResponse.data
          );

          setTimeMatches(transformedTimeMatches);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            message.error(
              "Данные не найдены. Проверьте event_id и nomination_id."
            );
          } else {
            setIsErrorOccurred(true);
          }
        })
        .finally(() => {
          setIsLoading(false);
          setIsDataLoaded(true);
        });
    }
  }, [eventId, nominationId, isDataLoaded]);

  return (
    <Tabs
      items={items}
      tabBarExtraContent={{
        right: (
          <Button
            onClick={isStageFinished ? handleDownload : handleCompleteStage}
            type="primary"
          >
            {isStageFinished ? "Итоговый протокол" : "Завершить этап"}
          </Button>
        ),
      }}
    />
  );
};
