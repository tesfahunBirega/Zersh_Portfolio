import { memo } from "react";
import { NodeResizer } from "reactflow";

const ResizableNode = ({ data, selected }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/reactflow-id", data.id);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        padding: 10,
        border: "1px solid black",
      }}
    >
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <div onDragStart={(event) => onDragStart(event, "group")} draggable>
        {data.label}
      </div>
    </div>
  );
};

export default memo(ResizableNode);
