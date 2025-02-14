import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { useMatches } from "@hooks";
import { getTreeData } from "@utils";
import { PlayoffMatchCard } from "./PlayoffMatchCard";

function PlayoffTree() {
  const { leveledPlayoffMatches, handleEditScore, isPlayoffStageFinished } =
    useMatches();

  const { nodes, edges } = getTreeData(leveledPlayoffMatches, handleEditScore);

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
