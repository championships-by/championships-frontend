import { LoadingOutlined } from "@ant-design/icons";
import { competenciesApi } from "@api";
import { tabsButtonEventEmitter, TabsButtonEvents } from "@constants";
import {
  generateCompetenciesDataSource,
  generateCriteriaColumns,
  transformCriteriaData,
  transformCriteriaResultsData,
} from "@utils";
import { InputNumber, Spin, Table } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export const CompetenciesTable = () => {
  const [error, setError] = useState();
  const [criteria, setCriteria] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [changes, setChanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { eventId, nominationId } = useParams();

  const columns = useMemo(
    () => [
      {
        title: "Участник",
        dataIndex: "participant",
        key: "participant",
        render: (text, { participant }) => {
          const { firstName, secondName, thirdName } = participant;
          return `${secondName} ${firstName} ${thirdName}`;
        },
      },
      ...generateCriteriaColumns(criteria, (text, record, index, columnId) => {
        const currentCriteria = record[`criteria${columnId}`];
        return (
          <InputNumber
            placeholder={currentCriteria.maxScore}
            defaultValue={currentCriteria.score}
            max={currentCriteria.maxScore}
            min={0}
            onChange={(value) => {
              const newDataSource = [...dataSource];
              newDataSource[index][`criteria${columnId}`].score = value;
              newDataSource[index].totalScore = Object.keys(
                newDataSource[index]
              )
                .filter((key) => key.startsWith("criteria"))
                .reduce((acc, key) => acc + newDataSource[index][key].score, 0);
              setDataSource(newDataSource);

              const newChanges = [...changes];
              const existingChangeIndex = newChanges.findIndex(
                (change) =>
                  change.criteria_id === currentCriteria.id &&
                  change.team_id === record.team.id
              );

              if (existingChangeIndex !== -1) {
                if (value === currentCriteria.initialScore) {
                  newChanges.splice(existingChangeIndex, 1);
                } else {
                  newChanges[existingChangeIndex].score = value;
                }
              } else if (value !== currentCriteria.initialScore) {
                newChanges.push({
                  criteriaId: currentCriteria.id,
                  teamId: record.team.id,
                  score: value,
                });
              }

              setChanges(
                newChanges.filter(
                  (change) => change.score !== currentCriteria.initialScore
                )
              );
            }}
          />
        );
      }),
      {
        title: "Итоги",
        dataIndex: "totalScore",
        key: "totalScore",
      },
    ],
    [criteria, dataSource, changes]
  );

  const handleCompleteStage = useCallback(() => {
    if (changes.length <= 0) return;

    changes.forEach(({ criteriaId, teamId, score }) => {
      competenciesApi.setCriteriaResult({
        eventId,
        nominationId,
        criteriaId,
        teamId,
        score,
      });
    });
  }, [changes, eventId, nominationId]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      competenciesApi.getCriteria(eventId, nominationId),
      competenciesApi.getCriteriaResults(eventId, nominationId),
    ])
      .then(([criteriaResponse, criteriaResultsResponse]) => {
        const criteriaData = transformCriteriaData(criteriaResponse.data);
        setCriteria(criteriaData);

        const criteriaResultsData = transformCriteriaResultsData(
          criteriaResultsResponse.data
        );
        const generatedDataSource =
          generateCompetenciesDataSource(criteriaResultsData);
        setDataSource(generatedDataSource);

        setIsLoading(false);
      })
      .catch((reason) => {
        setError(reason);
        setIsLoading(false);
      });
  }, [eventId, nominationId]);

  useEffect(() => {
    tabsButtonEventEmitter.on(TabsButtonEvents.ON_CLICK, handleCompleteStage);
  }, [handleCompleteStage]);

  return isLoading ? (
    <Spin indicator={<LoadingOutlined className="icon" spin />} />
  ) : error ? (
    <h1>Произошла ошибка</h1>
  ) : (
    <Table columns={columns} dataSource={dataSource} />
  );
};
