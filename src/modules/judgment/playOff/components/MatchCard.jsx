import { EditOutlined } from "@ant-design/icons";
import { determinateTheWinner, isScoreZero, MatchResult } from "@/utils";
import { useMatches } from "@/hooks";
import clsx from "clsx";
import "@/modules/judgment/playOff/components/sass/match-card.scss";

export const MatchCard = ({
  id,
  matchIndex,
  team1,
  team2,
  onEditScore,
  lastCreatorEmail,
}) => {
  const { isGroupStageFinished, isGroupStageEditable } = useMatches();
  const isEnabled = !isGroupStageFinished || isGroupStageEditable;

  const handleClick = (e) => {
    e.preventDefault();
    onEditScore();
  };

  return (
    <div className="match-card">
      <div className="match-card__match-section">
        <p>{matchIndex}</p>
      </div>
      <div className="match-card__team-section">
        <div
          className={clsx("match-card__team", {
            ["active"]:
              determinateTheWinner(team1.score, team2.score) ===
              MatchResult.TEAM1,
          })}
        >
          <p>{team1.name}</p>
          <p>{lastCreatorEmail ? team1.score : "–"}</p>
        </div>
        <div
          className={clsx("match-card__team", {
            ["active"]:
              determinateTheWinner(team1.score, team2.score) ===
              MatchResult.TEAM2,
          })}
        >
          <p>{team2.name}</p>
          <p>{lastCreatorEmail ? team2.score : "–"}</p>
        </div>
      </div>
      {!isEnabled ? (
        <div className="match-card__icon-section" />
      ) : (
        <div className="match-card__icon-section" onClick={handleClick}>
          <EditOutlined className="match-card__icon-section--edit-icon" />
        </div>
      )}
    </div>
  );
};
