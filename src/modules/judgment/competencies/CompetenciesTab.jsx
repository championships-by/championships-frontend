import { competenciesApi } from "@api";
import {
  generateCompetenciesDataSource,
  isCriteriaFilled,
  transformCriteriaData,
  transformCriteriaResultsData,
  transformStageStatus,
} from "@utils";
import { Button, message, Tabs } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CompetenciesResults, CompetenciesTable } from "./components";
import { useTranslation } from "react-i18next";

function CompetenciesTab() {
  const { t } = useTranslation();
  const { eventId, nominationId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [stageStatus, setStageStatus] = useState({});
  const [criteria, setCriteria] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);
  const [isStageFinished, setIsStageFinished] = useState(false);

  const handleCompleteStage = useCallback(async () => {
    try {
      if (!isCriteriaFilled(criteria)) {
        message.warning(t("MESSAGES.FILL_ALL_FIELDS"));
        return;
      }

      const criteriaPromises = [];

      dataSource.forEach((result) => {
        Object.keys(result).forEach((key) => {
          if (key.startsWith("criteria")) {
            const criterion = result[key];
            const promise = competenciesApi
              .setCriteriaResult({
                eventId,
                nominationId,
                criteriaId: criterion.id,
                teamId: result.team.id,
                score: criterion.score,
              })
              .catch((reason) => console.error(reason));
            criteriaPromises.push(promise);
          }
        });
      });
      await Promise.allSettled(criteriaPromises);

      await competenciesApi.finishCriteriaStage({
        event_id: eventId,
        nomination_id: nominationId,
      });
    } catch {}
  }, [criteria, dataSource, eventId, nominationId]);

  const handleDownload = useCallback(() => {
    console.log("download file");
  }, []);

  const handleChange = useCallback(
    (value, index, columnId) => {
      const newDataSource = [...dataSource];
      newDataSource[index][`criteria${columnId}`].score = value;
      newDataSource[index].totalScore = Object.keys(newDataSource[index])
        .filter((key) => key.startsWith("criteria"))
        .reduce((acc, key) => acc + newDataSource[index][key].score, 0);
      setDataSource(newDataSource);
    },
    [dataSource]
  );

  const items = useMemo(
    () => [
      {
        key: "1",
        label: t("COMMON.TABLE"),
        children: (
          <CompetenciesTable
            criteria={criteria}
            dataSource={dataSource}
            isLoading={isLoading}
            hasError={isErrorOccurred}
            onChange={handleChange}
            editable={
              stageStatus.registrationFinished &&
              stageStatus.tournamentStarted &&
              !stageStatus.tournamentFinished
            }
          />
        ),
      },
      {
        key: "2",
        label: t("COMMON.RESULTS"),
        disabled: !stageStatus.tournamentFinished,
        children: (
          <CompetenciesResults
            dataSource={dataSource}
            isLoading={isLoading}
            hasError={isErrorOccurred}
          />
        ),
      },
    ],
    [
      criteria,
      dataSource,
      handleChange,
      isErrorOccurred,
      isLoading,
      stageStatus.registrationFinished,
      stageStatus.tournamentFinished,
      stageStatus.tournamentStarted,
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
        competenciesApi.getCriteria(eventId, nominationId),
        competenciesApi.getCriteriaResults(eventId, nominationId),
      ])
        .then(
          ([
            stageStatusResponse,
            criteriaResponse,
            criteriaResultsResponse,
          ]) => {
            const transformedStageStatus =
              transformStageStatus(stageStatusResponse);
            setStageStatus(transformedStageStatus);

            if (transformedStageStatus.tournamentFinished) {
              setIsStageFinished(true);
            }

            const transformedCriteria = transformCriteriaData(
              criteriaResponse.data
            );
            setCriteria(transformedCriteria);
            const transformedCriteriaResults = transformCriteriaResultsData(
              criteriaResultsResponse.data
            );
            const generatedDataSource = generateCompetenciesDataSource(
              transformedCriteriaResults
            );
            setDataSource(generatedDataSource);
          }
        )
        .catch((reason) => {
          console.error(reason);
          setIsErrorOccurred(true);
        })
        .finally(() => {
          setIsLoading(false);
          setIsDataLoaded(true);
        });
    }
  }, [eventId, isDataLoaded, nominationId, stageStatus]);

  return (
    <Tabs
      items={items}
      tabBarExtraContent={{
        right: (
          <Button
            onClick={isStageFinished ? handleDownload : handleCompleteStage}
            type="primary"
          >
            {isStageFinished
              ? t("COMMON.FINAL_PROTOCOL")
              : t("COMMON.COMPLETE_STAGE")}
          </Button>
        ),
      }}
    />
  );
}

export default CompetenciesTab;
