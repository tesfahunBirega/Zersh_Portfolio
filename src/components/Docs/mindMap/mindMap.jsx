import React, { useEffect, useState, useRef, useCallback } from "react";
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
import { connect } from "react-redux";
import { createMindmap, deleteMindmap, fetchMindmaps, updateMindmap } from "../../../store/mindmap/mindmapAction";
import MindmapCards from "./MindMapCards";

// ----------------------------------------------------------------------

const nodeTypes = {
  group: ResizableNode,
};

// ----------------------------------------------------------------------

 const  Flow =({
  mindmaps,
  loading,
  fetchMindMaps,
  createMindMap,
  updateMindMap,
deleteMindMap
 }) => {

  useEffect(()=>
    {
      fetchMindMaps()
    }
  ,[])
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


  const [target, setTarget] = useState(null);
  const [clickedNodeId, setClickedNodeId] = useState(null);
  const [nodeName, setNodeName] = useState("Node - 1");
  const [title, setTitle]  = useState('')


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

  const [sources, setSources] = useState([])

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>{  
        setSources(prev => [...prev , ...addEdge(params, eds) ])
       return addEdge(params, eds);
      } )},
    [setEdges]
  );

  const onNodeClick = (event, node) => {
    if (node && node.id) {
      setClickedNodeId(node.id);
      setNodeName(node.data.label);
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

  const [newMindmap , setNewMindmap] = useState(false)


  const [selectedMindmap , setSelectedMindmap] = useState(null)
  const handleSave =()=>{
    if(newMindmap){
      createMindMap({ nodes:nodes,name: title , sources} )

    }else{
      updateMindMap({id:selectedMindmap?._id ,mindmapData:{ nodes:nodes,name: title , sources} })
    }
  }

  const handleTextChange = (e) => {
    setTitle(e.target.value)
  }

  const handleMindmapSelect = (mindmap) => {
    setSelectedMindmap(mindmap);
    setTitle(mindmap?.name );
    setNodes(mindmap?.nodes);

    mindmap?.sources?.map(src =>{
      onConnect(src)
    }) 
  };
  return (
    <div className="w-full h-full">
      <button  type="submit" className="bg-primary rounded-lg px-4 py-2 hover:bg-black hover:font-bold text-center hover:transition-all hover:duration-100 hover:translate-y-0.5" onClick={()=> setNewMindmap(true)} >
        New  
      </button>

      <MindmapCards handleMindmapDelete={(id)=>deleteMindMap(id)} handleMindmapSelect={handleMindmapSelect} mindmaps={mindmaps}/>

      {(selectedMindmap || newMindmap )&&  <>
      
       <div className="my-8 flex justify-between items-center mr-8 ">
        <input value={title}  onChange={handleTextChange} type="text" placeholder="insert the title of the mind map" className="border border-gray-300 rounded-md p-2 focus placeholder-gray-500 text-sm" />
      <button  type="submit" className="bg-primary rounded-lg px-4 py-2 hover:bg-black hover:font-bold text-center hover:transition-all hover:duration-100 hover:translate-y-0.5" onClick={handleSave} >
        Save 
      </button>
      </div>
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
      </>}

     
    </div>
  );
}

// ------------------------------------------------------------------ //
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


const mapStateToProps = (state) => {
  return {
    mindmaps: state?.mindmaps?.mindmaps,
    mindmap:state?.mindmaps?.mindmap,
    loading: state?.mindmaps?.loading,
    error: state?.mindmaps?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMindMaps: () => dispatch(fetchMindmaps()),
    createMindMap: (data) => dispatch(createMindmap(data)),
    updateMindMap: (data) => dispatch(updateMindmap(data)),
    deleteMindMap:(id)=>dispatch(deleteMindmap(id))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Flow);