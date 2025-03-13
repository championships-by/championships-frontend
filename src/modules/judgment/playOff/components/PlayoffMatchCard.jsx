import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { determinateTheWinner, isScoreZero, MatchResult } from "@utils";
import { Handle, Position } from "reactflow";
import { useMatches } from "@hooks";
import clsx from "clsx";
import "@modules/judgment/playOff/components/sass/match-card.scss";

export function PlayoffMatchCard({ data }) {
  const { matchIndex, team1, team2, onEditScore, lastCreatorEmail } = data;
  const { isPlayoffStageFinished, isPlayoffStageEditable } = useMatches();
  const isEnabled = !isPlayoffStageFinished || isPlayoffStageEditable;

  if (!team1 && !team2) {
    return null;
  }

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
              determinateTheWinner(
                team1 ? team1.score : null,
                team2 ? team2.score : null
              ) === MatchResult.TEAM1,
          })}
        >
          <p>{team1 ? team1.name : "Ожидается команда"}</p>
          <p>{lastCreatorEmail ? team1?.score ?? "–" : "–"}</p>
        </div>
        <div
          className={clsx("match-card__team", {
            ["active"]:
              determinateTheWinner(
                team1 ? team1.score : null,
                team2 ? team2.score : null
              ) === MatchResult.TEAM2,
          })}
        >
          <p>{team2 ? team2.name : "Ожидается команда"}</p>
          <p>{lastCreatorEmail ? team2?.score ?? "–" : "–"}</p>
        </div>
      </div>
      {!isEnabled || !team1 || !team2 ? (
        <div className="match-card__icon-section" />
      ) : (
        <div className="match-card__icon-section" onClick={handleClick}>
          <EditOutlined className="match-card__icon-section--edit-icon" />
        </div>
      )}
      <div>
        <Handle
          type="target"
          position={Position.Right}
          className="opaque-handle"
        />
        <Handle
          type="source"
          position={Position.Left}
          className="opaque-handle"
        />
      </div>
    </div>
  );
}
