import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DocumentNodeProps {
  data: {
    value: number;
    setFileData: (file: File) => void;
    fileData: File[] | null;
  };
  isConnectable: boolean;
}

function DocumentNode({ data, isConnectable }: DocumentNodeProps) {
  const onChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const file = evt.target.files?.[0];
      if (file) {
        console.log(data.setFileData);
        data.setFileData(file);
        console.log(file);
      }
    },
    [data.setFileData]
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
        <label htmlFor="text" className="font-bold">
          📃 Document
        </label>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input id="picture" type="file" onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

export default DocumentNode;
