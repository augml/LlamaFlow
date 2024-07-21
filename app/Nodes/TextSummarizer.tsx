import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function TextSummarizerNode({
  data,
  isConnectable,
}: {
  data: any;
  isConnectable: any;
}) {
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
        <p className="font-bold">✍️ Text Summarizer</p>
      </div>
    </div>
  );
}

export default TextSummarizerNode;
