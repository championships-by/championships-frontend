import React, { useCallback } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { useMatches } from "@hooks";
import { getTreeData } from "@utils";
import { PlayoffMatchCard } from "@modules/judgment/groupStage/components";

import "@modules/judgment/groupStage/components/sass/playoff-tree.scss";

export function PlayoffTree() {
  const { leveledPlayoffMatches, handleEditScore, isPlayoffStageFinished } =
    useMatches();
  const { nodes, edges } = getTreeData(leveledPlayoffMatches, handleEditScore);

  const onInit = useCallback((reactFlowInstance) => {
    reactFlowInstance.fitView({ maxZoom: 1 });

    const viewport = reactFlowInstance.getViewport();

    const ratio = window.innerWidth / window.innerHeight;
    const offsetX = (window.innerWidth / 3) * ((ratio - 1) / (ratio + 1));

    reactFlowInstance.setViewport({
      ...viewport,
      x: viewport.x - offsetX,
    });
  }, []);

  return (
    <div
      className={
        isPlayoffStageFinished
          ? "playoff-tree__inactive"
          : "playoff-tree__active"
      }
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
