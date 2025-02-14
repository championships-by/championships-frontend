import React from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";
import { useMatches } from "@hooks";
import { PlayoffMatchCard } from "./PlayoffMatchCard";
import { EditMatchScoreModal } from "../modals";

function PlayoffTree() {
  const { leveledPlayoffMatches, handleEditScore } = useMatches();

  const buildFlowData = (data) => {
    const nodes = [];
    const edges = [];

    data.forEach((level, levelIndex) => {
      level.forEach((match, index) => {
        nodes.push({
          id: match.id.toString(),
          data: {
            id: match.id,
            matchIndex: 0,
            team1: match.team1,
            team2: match.team2,
            onEditScore: () => handleEditScore(match),
            lastCreatorEmail: match.lastResultCreatorEmail,
          },
          type: "customNode",
          // position: { x: index * 300 - levelIndex * 150, y: -levelIndex * 150 },
          position: { x: -levelIndex * 400, y: index * 100 - levelIndex * 50 },
        });

        match.children.forEach((childId) => {
          edges.push({
            id: `e${match.id}-${childId}`,
            source: match.id.toString(),
            target: childId.toString(),
            type: "step",
          });
        });
      });
    });

    return { nodes, edges };
  };

  const { nodes, edges } = buildFlowData(leveledPlayoffMatches);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
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
