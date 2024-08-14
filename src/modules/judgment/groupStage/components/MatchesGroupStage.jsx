import { LoadingOutlined } from "@ant-design/icons";
import { useMatches } from "@hooks";
import { Spin } from "antd";
import { EditMatchScoreModal } from "../modals";
import { MatchCard } from "./MatchCard";
import "./MatchesGroupStage.scss";

export const MatchesGroupStage = () => {
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

  return isLoading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  ) : error ? (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Ошибка загрузки данных</h2>
      <p>{error}</p>
    </div>
  ) : (
    <div className="matches-group-stage">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          id={match.id}
          team1={match.team1}
          team2={match.team2}
          onEditScore={() => handleEditScore(match)}
        />
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
