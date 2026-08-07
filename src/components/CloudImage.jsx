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
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-linear-to-r from-slate-200 via-slate-100 to-slate-200"
        />
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
