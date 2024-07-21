import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LlamaNode({ data, isConnectable }: { data: any; isConnectable: any }) {
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
        <p className="font-bold">🤖 Llama</p>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="text" className="font-bold">
            API Key
          </label>
          <Input id="text" type="text" />
        </div>
      </div>
    </div>
  );
}

export default LlamaNode;
