import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";

interface UrlDocumentNodeProps {
  data: {
    setUrl: (URL: string) => void;
  };
  isConnectable: boolean;
}

function UrlDocumentNode({ data, isConnectable }: UrlDocumentNodeProps) {
  const onChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const url = evt.target.value;
      if (url) {
        data.setUrl(url);
        console.log(url);
      }
    },
    [data.setUrl]
  );

  return (
    <div className="text-updater-node bg-white border p-4 rounded-lg">
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <div className="space-y-2">
        <label htmlFor="text" className="font-bold">
          🌐 URL To Document
        </label>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input id="url" type="text" onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

export default UrlDocumentNode;
