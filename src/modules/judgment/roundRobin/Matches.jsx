import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useMatches } from "@hooks";
import { Typography, Spin } from "antd";
import { EditMatchScoreModal } from "@modules/judgment/roundRobin/EditScoreModal";
import { MatchCard } from "@modules/judgment/roundRobin/MatchCard";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { judgmentApi } from "@api";

import "@modules/judgment/roundRobin/sass/matches.scss";

export function MatchesGroupStage({
  matches,
  isFinished,
  isLoading,
  error,
  fetchData,
}) {
  const { t } = useTranslation();
  const { eventId, nominationId } = useParams();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditScore = (match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleSubmitScore = async ({
    id,
    eventId,
    nominationId,
    team1,
    team2,
    isPlayoff,
  }) => {
    try {
      if (isPlayoff) {
        await judgmentApi.setPlayoffMatch(
          eventId,
          nominationId,
          id,
          team1.score,
          team2.score
        );
      } else {
        await judgmentApi.setMatches(
          eventId,
          nominationId,
          id,
          team1.score,
          team2.score
        );
      }
      fetchData();
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const groupedMatches = matches.reduce((groups, match) => {
    const group = match.group_id;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(match);
    return groups;
  }, {});

  return isLoading ? (
    <Spin indicator={<LoadingOutlined className="icon" spin />} />
  ) : error ? (
    <div className="error">
      <h2>{t("MESSAGES.DATA_UPLOAD_ERROR")}</h2>
      <p>{error}</p>
    </div>
  ) : (
    <div>
      {Object.keys(groupedMatches).map((group, index) => (
        <div key={index} className="group">
          {Object.keys(groupedMatches).length > 1 && (
            <Typography.Title level={3}>
              {`${t("COMMON.GROUP")} ${index + 1}`}
            </Typography.Title>
          )}
          <div className="matches-group-grid">
            {groupedMatches[group].map((match, matchIndex) => (
              <MatchCard
                key={match.id}
                matchIndex={matchIndex + 1}
                team1={match.team1}
                team2={match.team2}
                lastCreatorEmail={match.lastResultCreatorEmail}
                onEditScore={() => handleEditScore(match)}
                isFinished={isFinished}
              />
            ))}
          </div>
        </div>
      ))}
      {selectedMatch && (
        <EditMatchScoreModal
          isOpen={isModalOpen}
          match={selectedMatch}
          onSubmit={(data) =>
            handleSubmitScore({
              ...data,
              eventId,
              nominationId,
              isPlayoff: false,
            })
          }
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
