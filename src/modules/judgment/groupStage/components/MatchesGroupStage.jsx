import { LoadingOutlined } from "@ant-design/icons";
import { useMatches } from "@hooks";
import { Typography, Spin } from "antd";
import { EditMatchScoreModal } from "../modals";
import { MatchCard } from "./MatchCard";
import "./MatchesGroupStage.scss";
import { useTranslation } from "react-i18next";

export const MatchesGroupStage = () => {
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
  } = useMatches();

  const groupedMatches = matches.reduce((groups, match) => {
    const group = match.group;
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
          <Typography.Title level={3}>{`${t("COMMON.GROUP")} ${
            index + 1
          }`}</Typography.Title>
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
            })
          }
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
