import { competenciesApi, timeMatchesApi } from "@api";
import { RESPONSE_STATUS } from "@constants";
import { useTabs } from "@hooks/useTabs";
import {
  formatTimeToString,
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
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);

  const handleTimeChange = useCallback((id, time, isDisqualified) => {
    setTimeMatches((prev) =>
      prev.map((timeMatch) => ({
        ...timeMatch,
        attempts: timeMatch.attempts.map((attempt) =>
          attempt.id === id
            ? {
                ...attempt,
                result: !time ? null : formatTimeToString(time),
                isDisqualified,
              }
            : attempt
        ),
      }))
    );
  }, []);

  const handleCompleteStage = useCallback(async () => {
    try {
      await timeMatches.forEach((timeMatch) =>
        timeMatch.attempts.forEach(({ id, time }) =>
          timeMatchesApi.setTimeMatch({
            eventId,
            nominationId,
            raceRoundId: id,
            result: time,
          })
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
  }, [eventId, nominationId]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      competenciesApi.getNominationEventInfo({
        eventId,
        nominationId,
      }),
      timeMatchesApi.getTimeMatches({ eventId, nominationId }),
    ])
      .then(([stageStatusResponse, timeMatchesResponse]) => {
        if (stageStatusResponse.status === RESPONSE_STATUS.STATUS_OK) {
          const transformedStageStatus = transformStageStatus(
            stageStatusResponse.data
          );
          setStageStatus(transformedStageStatus);
        }

        if (timeMatchesResponse.status === RESPONSE_STATUS.STATUS_OK) {
          const transformedTimeMatches = transformTimeMatchesData(
            timeMatchesResponse.data
          );
          setTimeMatches(transformedTimeMatches);
        }
      })
      .catch(() => setIsErrorOccurred(true))
      .finally(() => setIsLoading(false));
  }, [eventId, nominationId, handleCompleteStage]);

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
          children: <TimeMatchesResults />,
        },
      ]}
      tabBarExtraContent={{
        right: (
          <Button onClick={handleCompleteStage} type="primary">
            Завершить этап
          </Button>
        ),
      }}
    />
  );
};
