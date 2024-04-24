// import React, { useCallback } from 'react';
// import { Button, Card, Input } from 'antd';
// import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';

// const { Meta } = Card;

// function MindMap() {
//   // Initial nodes and edges
//   const initialNodes = [
//     { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1', children: [] }, draggable: true },
//     { id: '2', position: { x: 0, y: 100 }, data: { label: 'Node 2', children: [] }, draggable: true },
//   ];
//   const initialEdges = [];

//   // State management for nodes and edges
//   const [nodes, setNodes] = useNodesState(initialNodes);
//   const [edges, setEdges] = useEdgesState(initialEdges);

//   // Function to add a new card (idea)
//   const handleAddCard = () => {
//     const newNodeId = `node-${nodes.length + 1}`;
//     const newNode = {
//       id: newNodeId,
//       position: { x: 0, y: 0 },
//       data: { label: '', children: [] },
//       draggable: true,
//     };
//     setNodes([...nodes, newNode]);
//   };

//   // Function to handle the input change for a node
//   const handleInputChange = (event, nodeId) => {
//     const updatedNodes = nodes.map((node) =>
//       node.id === nodeId ? { ...node, data: { ...node.data, label: event.target.value } } : node
//     );
//     setNodes(updatedNodes);
//   };

//   // Function to handle connecting nodes
//   const handleConnect = useCallback((params) => {
//     const { source, target } = params;
//     const updatedNodes = nodes.map((node) => {
//       if (node.id === source || node.id === target) {
//         const updatedChildren = [...node.data.children, node.id === source ? target : source];
//         return { ...node, data: { ...node.data, children: updatedChildren } };
//       }
//       return node;
//     });
//     setNodes(updatedNodes);
//     setEdges((edges) => addEdge(params, edges));
//   }, [setNodes, setEdges, nodes]);

//   return (
//     <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
//       {/* Render the ReactFlow component */}
//       <ReactFlow
//         elements={nodes.concat(edges)}
//         onConnect={handleConnect}
//         snapToGrid={true}
//         snapGrid={[15, 15]}
//       />
//       {/* Button to add a new card */}
//       <Button type="primary" onClick={handleAddCard} style={{ position: 'absolute', top: 20, right: 20 }}>
//         Add Card
//       </Button>
//       {/* Render Card components for each node */}
//       {nodes.map((node) => (
//         <Card
//           key={node.id}
//           style={{ position: 'absolute', left: node.position.x, top: node.position.y, width: 200 }}
//           title={`Node ${node.id}`}
//           draggable={true}
//         >
//           <Input
//             value={node.data.label}
//             onChange={(event) => handleInputChange(event, node.id)}
//             placeholder="Enter idea"
//           />
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default MindMap;







import React, { useEffect, useState, useRef, useCallback } from "react";
// mui
import {
  Container,
  Grid,
  Card,
  Button,
  TextField,
  Stack,
  Box,
  Typography,
} from "@mui/material";
// routes
// sections
import ResizableNode from "./ResizableNode";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Panel,
  useReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

// ----------------------------------------------------------------------

const nodeTypes = {
  group: ResizableNode,
};

// ----------------------------------------------------------------------

export default function Flow() {
  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const initialNodes = [];

  const initialEdges = [];

  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const dragRef = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  console.log(nodes , 'nodes');
  const [target, setTarget] = useState(null);
  const [clickedNodeId, setClickedNodeId] = useState(null);
  const [nodeName, setNodeName] = useState("Node - 1");

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeDragStart = (evt, node) => {
    dragRef.current = node;
  };

  const onNodeDrag = (evt, node) => {
    // calculate the center point of the node from position and dimensions
    const centerX = node.position.x + node.width / 2;
    const centerY = node.position.y + node.height / 2;
    // find a node where the center point is inside
    console.log(centerX);
    console.log(centerY);
    const targetNode = nodes.find(
      (n) =>
        centerX > n.position.x &&
        centerX < n.position.x + n.width &&
        centerY > n.position.y &&
        centerY < n.position.y + n.height &&
        n.type === "group" &&
        n.id !== node.id
    );
    setTarget(targetNode);
    console.log(target);
  };

  const onNodeDragStop = (evt, node) => {
    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === node.id && target) {
          if (node.type !== "group") {
            n.data = { ...n.data };
            n.parentNode = target?.id;
            n.extent = "parent";

            // Use the position directly from the node object
            n.position = { x: node.position.x, y: node.position.y };
          }
        } else if (n.id === target?.id) {
          n.data = { ...n.data };
        }
        return n;
      })
    );
    setTarget(null);
    dragRef.current = null;
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (event, node) => {
    if (node && node.id) {
      setClickedNodeId(node.id);
      setNodeName(node.data.label);
      console.log(node);
    }
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === clickedNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: nodeName,
            },
          };
        }

        return node;
      })
    );
  }, [clickedNodeId, nodeName, setNodes]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type + id} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const { setViewport } = useReactFlow();

  const handleTransform = useCallback(() => {
    setViewport({ x: 10, y: 10, zoom: 1 }, { duration: 800 });
  }, [setViewport]);

  return (
    <div className="w-full h-full">
    <Container maxWidth={"1684px"} className="w-full h-full">
      <Grid container>
        <Grid item xs={12} sm={2} md={1}>
          <Card
            sx={{
              height: { sm: "60vh" },
              my: { xs: 1, sm: 0 },
              borderRadius: { xs: 2, sm: "16px 0 0 16px" },
            }}
          >
            <Sidebar />
          </Card>
        </Grid>
        <Grid item xs={12} sm={10} md={11}>
          <Card
            sx={{
              width: "100%",
              height: "60vh",
              borderRadius: { xs: 2, sm: "0 16px 16px 0" },
            }}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onNodeDragStart={onNodeDragStart}
              onNodeDrag={onNodeDrag}
              onNodeDragStop={onNodeDragStop}
              onDragOver={onDragOver}
              snapToGrid
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              fitView
              nodeTypes={nodeTypes}
            >
              <Panel position="top-right">
                <Stack spacing={1}>
                  <Button varant="contained" onClick={handleTransform}>
                    Reset
                  </Button>
                  <TextField
                    value={nodeName}
                    onChange={(evt) => setNodeName(evt.target.value)}
                    placeholder="Node Name"
                    variant="filled"
                  />
                </Stack>
              </Panel>
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}

// ------------------------------------------------------------------
const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" textAlign={"center"} sx={{ mb: 3 }}>
        Nodes
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Card
            onDragStart={(event) => onDragStart(event, "input")}
            draggable
            sx={{ display: "flex", alignItems: "center", p: 3 }}
          >
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>Input Node</Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            onDragStart={(event) => onDragStart(event, "default")}
            draggable
            sx={{ display: "flex", alignItems: "center", p: 3 }}
          >
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>Default Node</Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            onDragStart={(event) => onDragStart(event, "output")}
            draggable
            sx={{ display: "flex", alignItems: "center", p: 3 }}
          >
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>Output Node</Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            onDragStart={(event) => onDragStart(event, "group")}
            draggable
            sx={{ display: "flex", alignItems: "center", p: 3 }}
          >
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>Group Node</Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
