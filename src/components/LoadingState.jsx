import { Home, LoaderCircle } from "lucide-react";

export const LoadingState = ({
  message = "Finding your perfect space",
  description = "Please wait a moment…",
  fullScreen = false,
  className = "",
}) => (
  <div
    className={`flex w-full items-center justify-center px-4 py-12 ${
      fullScreen ? "min-h-screen" : "min-h-[18rem]"
    } ${className}`}
    role="status"
    aria-live="polite"
  >
    <div className="w-full max-w-xs rounded-3xl border border-white/70 bg-white/80 p-8 text-center shadow-xl shadow-blue-900/10 backdrop-blur-md">
      <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
        <Home className="h-8 w-8 text-white" aria-hidden="true" />
        <LoaderCircle className="absolute -right-3 -top-3 h-9 w-9 animate-spin text-blue-600" aria-hidden="true" />
      </div>
      <p className="text-lg font-bold text-slate-800">{message}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-blue-100">
        <div className="h-full w-2/3 animate-pulse rounded-full bg-linear-to-r from-blue-500 to-indigo-500" />
      </div>
    </div>
  </div>
);
