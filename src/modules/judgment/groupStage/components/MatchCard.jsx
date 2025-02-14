import { EditOutlined } from "@ant-design/icons";
import { determinateTheWinner, isScoreZero, MatchResult } from "@utils";
import { useMatches } from "@hooks";

import clsx from "clsx";
import "./MatchCard.scss";

export const MatchCard = ({
  id,
  matchIndex,
  team1,
  team2,
  onEditScore,
  lastCreatorEmail,
}) => {
  const { isGroupStageFinished } = useMatches();

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
      {isGroupStageFinished ? (
        <div className="match-card__icon-section"></div>
      ) : (
        <div className="match-card__icon-section" onClick={handleClick}>
          <EditOutlined className="match-card__icon-section--edit-icon" />
        </div>
      )}
    </div>
  );
};
