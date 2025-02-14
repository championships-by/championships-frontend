/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
import { LoadingOutlined } from "@ant-design/icons";
import { useMatches } from "@hooks";
import { Typography, Spin, Flex } from "antd";
import { EditMatchScoreModal } from "../modals";
import { PlayoffMatchCard } from "./PlayoffMatchCard";
import "./MatchesGroupStage.scss";
import { useTranslation } from "react-i18next";
import PlayoffTree from "./PlayoffTree";
import React from "react";

export function MatchesPlayoffStage() {
  const { t } = useTranslation();

  const {
    eventId,
    nominationId,
    leveledPlayoffMatches,
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
      <PlayoffTree />
      {selectedMatch && (
        <EditMatchScoreModal
          isOpen={isModalOpen}
          match={selectedMatch}
          onSubmit={(data) =>
            handleSubmitScore({
              ...data,
              eventId,
              nominationId,
              isPlayoff: true,
            })
          }
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
