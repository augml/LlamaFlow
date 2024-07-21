import { Handle, Position } from "@xyflow/react";

interface OutputNodeProps {
  data: {
    value: number;
    response: string;
  };
  isConnectable: boolean;
}

function OutputNode({ data, isConnectable }: OutputNodeProps) {
  if (!Position) {
    console.error("Position is not defined");
    return null;
  }

  return (
    <div className="text-updater-node bg-white border p-4 rounded-lg max-w-[400px]">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="space-y-2">
        <p className="font-bold">💬 Output</p>
        {data.response && <div>{data.response}</div>}
      </div>
    </div>
  );
}

export default OutputNode;
