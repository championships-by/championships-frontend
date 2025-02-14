import React from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";
import { useMatches } from "@hooks";
import { PlayoffMatchCard } from "./PlayoffMatchCard";
import { EditMatchScoreModal } from "../modals";

function PlayoffTree() {
  const { leveledPlayoffMatches, handleEditScore, isPlayoffStageFinished } =
    useMatches();

  const buildFlowData = (data) => {
    const nodes = [];
    const edges = [];
    const coeffY = 150;

    const nodesCount = data.reduce(
      (accumulator, level) => accumulator + level.length,
      0
    );

    let overallIndex = 0;
    data.forEach((level, levelIndex) => {
      level.forEach((match, index) => {
        const levels = data.length;
        const deltaY = (levels / 2 ** levelIndex) * coeffY;

        nodes.push({
          id: match.id.toString(),
          data: {
            id: match.id,
            matchIndex: nodesCount - overallIndex,
            team1: match.team1,
            team2: match.team2,
            onEditScore: () => handleEditScore(match),
            lastCreatorEmail: match.lastResultCreatorEmail,
          },
          type: "customNode",
          position: {
            x: -levelIndex * 400,
            y: -index * deltaY,
          },
        });

        match.children.forEach((childId) => {
          edges.push({
            id: `e${match.id}-${childId}`,
            source: match.id.toString(),
            target: childId.toString(),
            type: "step",
          });
        });
        overallIndex++;
      });
    });

    return { nodes, edges };
  };

  const { nodes, edges } = buildFlowData(leveledPlayoffMatches);

  return (
    <div
      style={{
        width: "100vw",
        height: isPlayoffStageFinished ? "70vh" : "100vh",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ customNode: PlayoffMatchCard }}
        fitView
      />
    </div>
  );
}

export default PlayoffTree;
