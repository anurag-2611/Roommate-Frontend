import { CheckCircle2, CircleAlert } from "lucide-react";

export const StatusMessage = ({ status, className = "" }) => {
  if (!status?.message) return null;

  const isError = status.type === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live="polite"
      className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-sm ${
        isError
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      } ${className}`}
    >
      {isError ? (
        <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      )}
      <div>
        <p className="font-semibold">{isError ? "We couldn’t complete that action" : "Success"}</p>
        <p className="mt-0.5">{status.message}</p>
        {status.code && <p className="mt-1 text-xs opacity-75">Error code: {status.code}</p>}
      </div>
    </div>
  );
};
