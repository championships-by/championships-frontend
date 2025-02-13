import { competenciesApi } from "@api";
import {
  generateCompetenciesDataSource,
  transformCriteriaData,
  transformCriteriaResultsData,
  transformStageStatus,
  downloadProtocol,
  downloadCriteriaExcel,
} from "@utils";
import { Button, message, Tabs, Flex } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ReturnButton from "@modules/judgment/returnButton/ReturnButton";
import { useTranslation } from "react-i18next";
import { CompetenciesResults, CompetenciesTable } from "./components";
import { DownloadOutlined } from "@ant-design/icons";

import "@modules/judgment/competencies/sass/competencies-criteria.scss";

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
  const [maxPlace, setMaxPlace] = useState();

  const handleCompleteStage = useCallback(async () => {
    try {
      const criteriaResults = [];
      let fullFilled = true;

      dataSource.forEach((result) => {
        Object.keys(result).forEach((key) => {
          if (key.startsWith("criteria")) {
            const criterion = result[key];

            if (criterion.score === null) {
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

  const handleDownloadProtocol = async () => {
    try {
      await downloadProtocol(eventId, nominationId);
    } catch {
      message.error(t("TOURNAMENTS.COULDNT_DOWNLOAD_FILE"));
    }
  };

  const handleDownloadExcel = async () => {
    try {
      await downloadCriteriaExcel(eventId, nominationId);
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
          />
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
            maxPlace={maxPlace}
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
            setMaxPlace(criteriaResultsResponse.data.max_place);
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

  const buttonsForUnfinishedStage = (
    <Flex gap="middle">
      <Button onClick={handleDownloadExcel}>
        <Flex gap="small">
          <DownloadOutlined />
          {t("EVENTS.DOWNLOAD_EXCEL")}
        </Flex>
      </Button>
      <Button type="primary" onClick={handleCompleteStage}>
        {t("COMMON.COMPLETE_STAGE")}
      </Button>
    </Flex>
  );

  const buttonsForFinishedStage = (
    <Button type="primary" onClick={handleDownloadProtocol}>
      {t("COMMON.FINAL_PROTOCOL")}
    </Button>
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
}

export default CompetenciesTab;
