import { ImgHTMLAttributes, useState } from "react";

export function ImageWithFallback({
  alt,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={props.className}
        role="img"
        aria-label={alt}
        style={{
          ...props.style,
          display: "grid",
          placeItems: "center",
          background: "#181818",
          color: "#8c8c8c",
        }}
      >
        Imagem indisponível
      </div>
    );
  }

  return <img {...props} alt={alt} onError={() => setFailed(true)} />;
}
