import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputNodeProps {
  data: {
    value: number;
    setInputNode: (input: string) => void;
  };
  isConnectable: boolean;
}

function InputNode({ data, isConnectable }: InputNodeProps) {
  if (!Position) {
    console.error("Position is not defined");
    return null;
  }

  return (
    <div className="text-updater-node bg-white border p-4 rounded-lg">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <div className="space-y-2">
        <p className="font-bold">✍️ Input</p>
        <Input
          type="text"
          onChange={(e) => {
            data.setInputNode(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default InputNode;
