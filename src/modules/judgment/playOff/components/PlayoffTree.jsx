import React, { useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import clsx from "clsx";
import { useMatches } from "@hooks";
import { getTreeData } from "@utils";
import { PlayoffMatchCard } from "@modules/judgment/playOff/components";

import "@modules/judgment/playOff/components/sass/playoff-tree.scss";

export function PlayoffTree() {
  const { leveledPlayoffMatches, handleEditScore, isPlayoffStageFinished } =
    useMatches();
  const { nodes, edges } = getTreeData(leveledPlayoffMatches, handleEditScore);

  const onInit = (reactFlowInstance) => {
    reactFlowInstance.fitView({ maxZoom: 1 });

    const viewport = reactFlowInstance.getViewport();

    const ratio = window.innerWidth / window.innerHeight;
    const offsetX = (window.innerWidth / 3) * ((ratio - 1) / (ratio + 1));

    reactFlowInstance.setViewport({
      ...viewport,
      x: viewport.x - offsetX,
    });
  };

  return (
    <div
      className={clsx("playoff-tree", { ["active"]: !isPlayoffStageFinished })}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={onInit}
        nodeTypes={{ customNode: PlayoffMatchCard }}
        zoomOnScroll={true}
        panOnScroll={true}
        panOnDrag={false}
        zoomOnPinch={true}
      />
    </div>
  );
}
