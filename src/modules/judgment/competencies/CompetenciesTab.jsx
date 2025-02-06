import { competenciesApi } from "@api";
import {
  generateCompetenciesDataSource,
  transformCriteriaData,
  transformCriteriaResultsData,
  transformStageStatus,
  downloadProtocol,
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
  const [activeTabKey, setActiveTabKey] = useState("1");

  const handleCompleteStage = useCallback(async () => {
    try {
      const criteriaResults = [];
      let fullFilled = true;

      dataSource.forEach((result) => {
        Object.keys(result).forEach((key) => {
          if (key.startsWith("criteria")) {
            const criterion = result[key];

            if (criterion.score == null) {
              fullFilled = false;
            }

            criteriaResults.push({
              nomination_event: {
                event_id: eventId,
                nomination_id: nominationId,
              },

              criteria_id: criterion.id,
              team_id: result.team.id,
              score: criterion.score,
            });
          }
        });
      });

      if (!fullFilled) {
        message.error(t("MESSAGES.FILL_ALL_FIELDS"));
        return;
      }

      await competenciesApi.setCriteriaResults(criteriaResults);

      await competenciesApi.finishCriteriaStage({
        event_id: eventId,
        nomination_id: nominationId,
      });

      setIsStageFinished(true);
      setActiveTabKey("2");
    } catch {}
  }, [criteria, dataSource, eventId, nominationId]);

  const handleDownload = async () => {
    try {
      downloadProtocol(eventId, nominationId);
    } catch {
      message.error(t("TOURNAMENTS.COULDNT_DOWNLOAD_FILE"));
    }
  };

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
              !stageStatus.tournamentFinished &&
              !isStageFinished
            }
э          />
        ),
      },
      {
        key: "2",
        label: t("COMMON.RESULTS"),
        disabled: !stageStatus.tournamentFinished && !isStageFinished,
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
      isStageFinished,
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
  }, [eventId, isDataLoaded, nominationId, stageStatus, isStageFinished]);

  return (
    <Tabs
      activeKey={activeTabKey}
      onChange={setActiveTabKey}
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
