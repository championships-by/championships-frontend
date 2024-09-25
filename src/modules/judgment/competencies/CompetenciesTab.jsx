import { competenciesApi } from "@api";
import { useTabs } from "@hooks/useTabs";
import {
  generateCompetenciesDataSource,
  isCriteriaFilled,
  transformCriteriaData,
  transformCriteriaResultsData,
  transformStageStatus,
} from "@utils";
import { Button, message, Tabs } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompetenciesResults, CompetenciesTable } from "./components";
import { CompetenciesTabsEnum } from "./constants";

function CompetenciesTab() {
  const { tabs, updateTabs } = useTabs();
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
        message.warning("Заполните все поля!");
        return;
      }

      dataSource.forEach((result) => {
        Object.keys(result).forEach((key) => {
          if (key.startsWith("criteria")) {
            const criterion = result[key];
            competenciesApi.setCriteriaResult({
              eventId,
              nominationId,
              criteriaId: criterion.id,
              teamId: result.team.id,
              score: criterion.score,
            });
          }
        });
      });

      await competenciesApi.finishCriteriaStage({
        event_id: eventId,
        nomination_id: nominationId,
      });

      await updateTabs([
        {
          id: CompetenciesTabsEnum.RESULTS,
          disabled: false,
        },
      ]);
    } catch (error) {
      message.error("Произошла неизвестная ошибка");
    }
  }, [criteria, dataSource, eventId, nominationId, updateTabs]);

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

  useEffect(() => {
    if (!isDataLoaded) {
      setIsLoading(true);
      Promise.all([
        competenciesApi.getNominationEventInfo(eventId, nominationId),
        competenciesApi.getCriteria(eventId, nominationId),
        competenciesApi.getCriteriaResults(eventId, nominationId),
      ])
        .then(
          ([
            stageStatusResponse,
            criteriaResponse,
            criteriaResultsResponse,
          ]) => {
            const transformedStageStatus = transformStageStatus(
              stageStatusResponse.data
            );
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
      items={[
        {
          ...tabs[0],
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
          ...tabs[1],
          disabled: !stageStatus.tournamentFinished,
          children: (
            <CompetenciesResults
              dataSource={dataSource}
              isLoading={isLoading}
              hasError={isErrorOccurred}
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
}

export default CompetenciesTab;
