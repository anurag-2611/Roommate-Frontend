import { useState } from "react";

const ImageContent = ({
  src,
  alt,
  className,
  imageClassName,
  fallback,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imageSource = failed ? fallback : src;

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${className}`}
      aria-busy={!loaded}
    >
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse">
          <span
            aria-hidden="true"
            className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"
          />
          <span className="text-xs font-medium text-slate-500">
            Loading room image...
          </span>
        </div>
      )}
      <img
        {...props}
        src={imageSource || fallback}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (failed) setLoaded(true);
          else setFailed(true);
        }}
        className={`h-full w-full transition-opacity duration-300 ${imageClassName} ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export const CloudImage = ({
  src,
  alt = "",
  className = "",
  imageClassName = "object-cover",
  fallback = "/fallback-room.jpg",
  ...props
}) => {
  return <ImageContent key={src || fallback} {...{ src, alt, className, imageClassName, fallback, ...props }} />;
};
