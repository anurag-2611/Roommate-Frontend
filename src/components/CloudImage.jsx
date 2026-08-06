import { useEffect, useState } from "react";

export const CloudImage = ({
  src,
  alt = "",
  className = "",
  imageClassName = "object-cover",
  fallback = "/fallback-room.jpg",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  const imageSource = failed ? fallback : src;

  return (
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      {!loaded && (
        <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-linear-to-r from-slate-200 via-slate-100 to-slate-200" />
      )}
      <img
        {...props}
        src={imageSource}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!failed) setFailed(true);
          else setLoaded(true);
        }}
        className={`h-full w-full transition-opacity duration-300 ${imageClassName} ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};
