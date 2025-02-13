/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
import { LoadingOutlined } from "@ant-design/icons";
import { useMatches } from "@hooks";
import { Typography, Spin } from "antd";
import { EditMatchScoreModal } from "../modals";
import { PlayoffMatchCard } from "./PlayoffMatchCard";
import "./MatchesGroupStage.scss";
import { useTranslation } from "react-i18next";
import React from "react";

export function MatchesPlayoffStage() {
  const { t } = useTranslation();

  const {
    eventId,
    nominationId,
    playoffMatches,
    selectedMatch,
    isModalOpen,
    isLoading,
    error,
    handleEditScore,
    handleSubmitScore,
    handleCloseModal,
  } = useMatches();

  return isLoading ? (
    <Spin indicator={<LoadingOutlined className="icon" spin />} />
  ) : error ? (
    <div className="error">
      <h2>{t("MESSAGES.DATA_UPLOAD_ERROR")}</h2>
      <p>{error}</p>
    </div>
  ) : (
    <div>
      <div className="matches-group-grid">
        {playoffMatches.map((match, matchIndex) => (
          <PlayoffMatchCard
            key={match.id}
            id={match.id}
            matchIndex={matchIndex + 1}
            team1={match.team1}
            team2={match.team2}
            lastCreatorEmail={match.lastResultCreatorEmail}
            onEditScore={() => handleEditScore(match)}
          />
        ))}
      </div>
      {selectedMatch && (
        <EditMatchScoreModal
          isOpen={isModalOpen}
          match={selectedMatch}
          onSubmit={(data) =>
            handleSubmitScore({
              ...data,
              eventId,
              nominationId,
            })
          }
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
