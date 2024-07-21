"use client";
import { useState, useCallback, useEffect } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import DocumentNode from "./Nodes/DocumentNode";
import RAGNode from "./Nodes/RAGNode";
import LlamaNode from "./Nodes/OpenAINode";
import UrlDocumentNode from "./Nodes/UrlDocumentNode";
import TextSummarizerNode from "./Nodes/TextSummarizer";
import FindElementsNode from "./Nodes/FindElements";
import InputNode from "./Nodes/InputNode";
import OutputNode from "./Nodes/OutputNode";
import { Button } from "@/components/ui/button";

const initialEdges: any = [
  {
    id: "edge-document-rag",
    source: "document-node",
    target: "rag-node",
    sourceHandle: null,
    targetHandle: "chatbot-handle",
  },
  {
    id: "edge-url-document-rag",
    source: "url-document-node",
    target: "rag-node",
    sourceHandle: null,
    targetHandle: "chatbot-handle",
  },
  {
    id: "edge-input-rag",
    source: "input-node",
    target: "rag-node",
    sourceHandle: null,
    targetHandle: "document -handle",
  },
  {
    id: "edge-rag-output",
    source: "rag-node",
    target: "output-node",
    sourceHandle: null,
    targetHandle: null,
  },
];

const nodeTypes = {
  DocumentNode,
  RAGNode,
  LlamaNode,
  UrlDocumentNode,
  TextSummarizerNode,
  FindElementsNode,
  InputNode,
  OutputNode,
};

function Flow() {
  const [fileData, setFileData] = useState<File[] | null>(null);
  const [URLs, setURLs] = useState("");
  const [input, setInput] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const initialNodes: any = [
    {
      id: "rag-node",
      type: "RAGNode",
      position: { x: 0, y: 0 },
      data: {
        value: input,
        fileData,
        urls: URLs,
        setBotResponse: setBotResponse,
      },
    },
    {
      id: "document-node",
      type: "DocumentNode",
      position: { x: -400, y: -150 },
      data: {
        setFileData: (file) =>
          setFileData((prevData) => (prevData ? [...prevData, file] : [file])),
        fileData: null,
      },
    },
    {
      id: "url-document-node",
      type: "UrlDocumentNode",
      position: { x: -400, y: 0 },
      data: {
        setUrl: (URL) => setURLs(URL),
      },
    },
    {
      id: "input-node",
      type: "InputNode",
      position: { x: -400, y: 150 },
      data: {
        setInputNode: (input) => setInput(input),
      },
    },
    {
      id: "output-node",
      type: "OutputNode",
      position: { x: 500, y: 0 },
      data: {
        response: botResponse,
      },
    },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === "RAGNode") {
          return {
            ...node,
            data: {
              ...node.data,
              value: input,
              urls: URLs,
              fileData,
            },
          };
        } else if (node.type === "OutputNode") {
          return {
            ...node,
            data: {
              ...node.data,
              response: botResponse,
            },
          };
        }
        return node;
      })
    );
  }, [fileData, input, URLs, botResponse]);

  const addNode = (type) => {
    let data = { value: 123 };

    if (type === "InputNode") {
      data = { ...data, setInputNode: (input) => setInput(input) };
    } else if (type === "DocumentNode") {
      data = {
        ...data,
        setFileData: (file) =>
          setFileData((prevData) => (prevData ? [...prevData, file] : [file])),
        fileData: null,
      };
    } else if (type === "RAGNode") {
      data = {
        ...data,
        value: input,
        fileData,
        urls: URLs,
        setBotResponse: setBotResponse,
      };
    } else if (type === "OutputNode") {
      data = {
        ...data,
        response: botResponse,
      };
    } else if (type === "UrlDocumentNode") {
      data = {
        ...data,
        setUrl: (URL) => setURLs(URL),
      };
    }

    const newNode = {
      id: `node-${nodes.length + 1}`,
      type,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data,
    };

    console.log("Adding node:", newNode); // Debugging log
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 left-0 right-0 bg-white shadow p-4 flex space-x-2 z-10 justify-between items-center">
        <div className="flex space-x-2 items-center">
          <p className="font-bold text-xl">LlamaFlow</p>
          <Button onClick={() => addNode("DocumentNode")} disabled>
            Add Document
          </Button>
          <Button onClick={() => addNode("RAGNode")} disabled>
            Add RAG
          </Button>
          <Button onClick={() => addNode("UrlDocumentNode")} disabled>
            Add Url To Document
          </Button>
          <Button onClick={() => addNode("InputNode")} disabled>
            Add Input
          </Button>
          <Button onClick={() => addNode("OutputNode")} disabled>
            Add Output
          </Button>
        </div>
        <p className="text-red-500">
          Adding nodes are disabled to prevent attacks
        </p>
      </div>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
