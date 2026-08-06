import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { StatusMessage } from "./StatusMessage";
import { statusFeedback } from "../utils/statusFeedback";

export const AppStatus = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => statusFeedback.subscribe(setStatus), []);
  if (!status) return null;

  return (
    <div className="fixed left-1/2 top-4 z-[100] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2">
      <div className="relative">
        <StatusMessage status={status} className="mb-0 pr-12" />
        <button type="button" aria-label="Dismiss message" onClick={() => setStatus(null)} className="absolute right-3 top-3 rounded p-1 text-gray-600 hover:bg-black/5">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
