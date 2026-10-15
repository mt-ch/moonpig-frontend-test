import { useEffect, useState, type ImgHTMLAttributes, type ReactNode } from "react";

const MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 500;

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "src"> {
  src: string;
  alt: string;
  fallback?: ReactNode;
}

type Status = "loading" | "loaded" | "failed";

const ImageInner = ({ src, alt, fallback = null, loading = "lazy", decoding = "async", className = "", onError, onLoad, ...rest }: ImageProps) => {
  const [status, setStatus] = useState<Status>("loading");
  // Bumping the attempt remounts the <img> (via key) so the browser re-requests it
  const [attempt, setAttempt] = useState(0);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    if (!retrying) return;
    const timer = setTimeout(
      () => {
        setAttempt((n) => n + 1);
        setRetrying(false);
      },
      RETRY_BASE_DELAY_MS * 2 ** attempt,
    );
    return () => clearTimeout(timer);
  }, [retrying, attempt]);

  if (status === "failed") return <>{fallback}</>;

  const placeholder = status === "loaded" ? "" : "animate-pulse bg-gray-300 w-full h-full aspect-3/2 text-transparent";

  return (
    <img
      key={attempt}
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={`${className} ${placeholder}`.trim()}
      aria-busy={status === "loading"}
      onLoad={(e) => {
        setStatus("loaded");
        onLoad?.(e);
      }}
      onError={(e) => {
        if (attempt < MAX_RETRIES) setRetrying(true);
        else {
          setStatus("failed");
          onError?.(e);
        }
      }}
      {...rest}
    />
  );
};

// Keyed on src so a new image always starts from a clean loading/retry state
const Image = (props: ImageProps) => <ImageInner key={props.src} {...props} />;

export default Image;
