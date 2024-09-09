import { competenciesApi, timeMatchesApi } from "@api";
import { RESPONSE_STATUS } from "@constants";
import { useTabs } from "@hooks/useTabs";
import {
  formatTimeToString,
  isTimeMatchesFilled,
  transformStageStatus,
  transformTimeMatchesData,
} from "@utils";
import { Button, message, Tabs } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TimeMatchesResults, TimeMatchesTable } from "./components";
import { TimeMatchesTabsEnum } from "./constants";

export const TimeMatchesTabs = () => {
  const { tabs, updateTabs } = useTabs();
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

      timeMatches.forEach((timeMatch) =>
        timeMatch.attempts.forEach(({ id, result }) =>
          timeMatchesApi.setTimeMatch(eventId, nominationId, id, result)
        )
      );

      await competenciesApi.finishTimeStage({
        event_id: eventId,
        nomination_id: nominationId,
      });

      await updateTabs([
        {
          id: TimeMatchesTabsEnum.RESULTS,
          disabled: false,
        },
      ]);
    } catch (error) {
      message.error("Произошла неизвестная ошибка");
    }
  }, [eventId, nominationId, timeMatches]);

  const handleDownload = useCallback(() => {
    console.log("download file");
  }, []);

  useEffect(() => {
    if (!isDataLoaded) {
      setIsLoading(true);
      Promise.all([
        competenciesApi.getNominationEventInfo(eventId, nominationId),
        timeMatchesApi.getTimeMatches(eventId, nominationId),
      ])
        .then(([stageStatusResponse, timeMatchesResponse]) => {
          if (stageStatusResponse.status === RESPONSE_STATUS.STATUS_OK) {
            const transformedStageStatus = transformStageStatus(
              stageStatusResponse.data
            );
            setStageStatus(transformedStageStatus);

            if (stageStatus.tournamentFinished) {
              setIsStageFinished(true);
            }
          }

          if (timeMatchesResponse.status === RESPONSE_STATUS.STATUS_OK) {
            const transformedTimeMatches = transformTimeMatchesData(
              timeMatchesResponse.data
            );
            setTimeMatches(transformedTimeMatches);
          }
        })
        .catch(() => setIsErrorOccurred(true))
        .finally(() => {
          setIsLoading(false);
          setIsDataLoaded(true);
        });
    }
  }, [eventId, nominationId, isDataLoaded]);

  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          ...tabs[0],
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
          ...tabs[1],
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
      ]}
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
