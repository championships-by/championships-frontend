import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useMatches } from "@hooks";
import { Typography, Spin, Flex } from "antd";
import { EditMatchScoreModal } from "../modals";
import PlayoffTree from "./PlayoffTree";
import { useTranslation } from "react-i18next";

import "./MatchesGroupStage.scss";

export function MatchesPlayoffStage() {
  const { t } = useTranslation();

  const {
    eventId,
    nominationId,
    selectedMatch,
    isModalOpen,
    isLoading,
    error,
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
