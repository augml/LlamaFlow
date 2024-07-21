import { useCallback, useState } from "react";
import axios from "axios"; // Add axios
import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { parse } from "node-html-parser"; // Add node-html-parser

function searchWeb() {
  const axios = require("axios");

  const url = "https://www.searchapi.io/api/v1/search";
  const params = {
    engine: "google",
    q: "chatgpt",
    api_key: "QYi4VKBHEmDNqP4bbj2s1jkG",
  };

  axios
    .get(url, { params })
    .then((response: any) => {
      console.log(response.data);
    })
    .catch((error: any) => {
      console.error("Error:", error);
    });
}

interface DocumentNodeProps {
  data: {
    value: number;
    setParsedData: (data: any) => void;
  };
  isConnectable: boolean;
}

function SearchDocumentNode({ data, isConnectable }: DocumentNodeProps) {
  const onBlur = useCallback(
    async (evt: React.FocusEvent<HTMLInputElement>) => {
      const url = evt.target.value;
      if (url) {
        try {
          const response = await axios.get(url);
          const html = response.data;
          const root = parse(html);
          console.log(root);
          data.setParsedData(root); // Pass the parsed data to the next component
        } catch (error) {
          console.error("Error fetching URL:", error);
        }
      }
    },
    [data.setParsedData]
  );

  if (!Position) {
    console.error("Position is not defined");
    return null;
  }

  return (
    <div className="text-updater-node bg-white border p-4 rounded-lg">
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <div className="space-y-2">
        <p className="font-bold">🌐 URL To Document</p>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input id="text" type="text" onBlur={onBlur} />
        </div>
      </div>
    </div>
  );
}

export default SearchDocumentNode;
