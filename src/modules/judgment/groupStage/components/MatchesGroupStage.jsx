import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useMatches } from "@hooks";
import { Typography, Spin } from "antd";
import { EditMatchScoreModal } from "@modules/judgment/groupStage/modals";
import { MatchCard } from "@modules/judgment/groupStage/components";
import { useTranslation } from "react-i18next";

import "@modules/judgment/groupStage/components/sass/matches-group-stage.scss";

export function MatchesGroupStage() {
  const { t } = useTranslation();

  const {
    eventId,
    nominationId,
    matches,
    selectedMatch,
    isModalOpen,
    isLoading,
    error,
    handleEditScore,
    handleSubmitScore,
    handleCloseModal,
    isGroupStageFinished,
  } = useMatches();

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
                id={match.id}
                matchIndex={matchIndex + 1}
                team1={match.team1}
                team2={match.team2}
                lastCreatorEmail={match.lastResultCreatorEmail}
                onEditScore={() => handleEditScore(match)}
                isGroupStageFinished={isGroupStageFinished}
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
