/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import { EditOutlined } from "@ant-design/icons";
import { determinateTheWinner, isScoreZero, MatchResult } from "@utils";
import { Handle, Position } from "reactflow";
import { useMatches } from "@hooks";
import clsx from "clsx";
import "./MatchCard.scss";

export function PlayoffMatchCard({ data }) {
  const { matchIndex, team1, team2, onEditScore, lastCreatorEmail } = data;
  const { isPlayoffStageFinished } = useMatches();

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
          <p>{team1 ? team1.name : ""}</p>
          <p>{lastCreatorEmail ? team1.score : "–"}</p>
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
          <p>{team2 ? team2.name : ""}</p>
          <p>{lastCreatorEmail ? team2.score : "–"}</p>
        </div>
      </div>
      {isPlayoffStageFinished ? (
        <div className="match-card__icon-section"></div>
      ) : (
        <div className="match-card__icon-section" onClick={handleClick}>
          <EditOutlined className="match-card__icon-section--edit-icon" />
        </div>
      )}
      <div>
        <Handle
          type="target"
          position={Position.Right}
          style={{ opacity: 0 }}
        />
        <Handle type="source" position={Position.Left} style={{ opacity: 0 }} />
      </div>
    </div>
  );
}
