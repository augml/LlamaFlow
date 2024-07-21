import { useCallback, useState } from "react";
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
} from "@xyflow/react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const handleStyle = { top: 67 };

function RAGNode({ data, isConnectable }: { data: any; isConnectable: any }) {
  const [responseText, setResponseText] = useState<string | null>(null); // Update to string
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleRun = useCallback(async () => {
    console.log(data.value);
    setIsLoading(true);
    console.log(data);
    console.log("running");
    try {
      let urlFormData = new FormData();
      urlFormData.append(
        "url",
        data.urls == "" ? "https://www.google.com" : data.urls
      );
      const urlResult = await axios.post(
        "https://llamaflow-backend.onrender.com/scrape/",
        urlFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("URL: " + urlResult.data);

      let files = data.fileData;

      if (!files || files.length === 0) {
        console.warn("No files selected, creating an empty text file.");
        const emptyFile = new File([""], "empty.txt", { type: "text/plain" });
        files = [emptyFile];
      }

      console.log(input);
      const formData = new FormData();
      files.forEach((file: File) => {
        formData.append("files", file); // Append multiple files under the same key
      });
      if (input == "" && data.urls == "") {
        formData.append("prompt", data.value);
      } else if (input == "" && data.urls != "") {
        formData.append(
          "prompt",
          "Source from the web: " + urlResult.data + "prompt: " + data.value
        );
      } else if (input != "" && data.urls == "") {
        console.log("Using input as prompt");
        formData.append("prompt", input);
      } else if (input != "" && data.urls != "") {
        formData.append(
          "prompt",
          "Source from the web: " + urlResult.data + "prompt: " + input
        );
      }

      console.log(formData);
      const result = await axios.post(
        "https://llamaflow-backend.onrender.com/query/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(result.data.response);
      setResponseText(result.data.response.response);
      data.setBotResponse(result.data.response.response);
    } catch (error) {
      console.error("Error querying files:", error);
    } finally {
      setIsLoading(false);
    }
  }, [data, input]);

  return (
    <div className="text-updater-node bg-white border p-4 rounded-lg min-w-[350px] max-w-[350px]">
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={handleStyle}
      />
      <div className="">
        <label htmlFor="text" className="text-xl font-bold">
          🗃️ RAG Bot
        </label>
        <div className="h-2"></div>
        <div>
          <div className="text-lg font-bold">Document</div>
          <Handle
            id="document-handle"
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
            style={{
              top: 160,
            }}
          />
          <p>
            Connect this to a document node.
            <div></div>It serves as the source for the bot.
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <div className="text-lg font-bold">Input</div>
          <Handle
            id="chatbot-handle"
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
            style={handleStyle}
          />
          {data.value && (
            <div>
              <p>{data.value}</p>
            </div>
          )}
        </div>
        <div className="h-2"></div>
        <div className="flex justify-end mt-2">
          <Button variant="outline" onClick={handleRun} disabled={isLoading}>
            Run
          </Button>
          <Dialog>
            <DialogTrigger className="w-full">
              <div className="flex justify-end">
                <Button disabled={isLoading}>
                  {isLoading ? "Chatting..." : "Chat"}
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="min-w-[1000px] min-h-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Chat with RAG Bot
                </DialogTitle>
                <DialogDescription>
                  You&apos;re chatting with the bot created in the flow.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
                placeholder="Ask me anything..."
              />
              <Button onClick={handleRun} disabled={isLoading}>
                Ask
              </Button>
              {!responseText && (
                <div className="mt-4 p-4 border rounded h-[200px] bg-gray-100"></div>
              )}
              {responseText && (
                <div className="mt-4 p-4 border rounded h-[200px] bg-gray-100">
                  <p>{responseText}</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default RAGNode;
