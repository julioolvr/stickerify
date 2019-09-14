import React, { useRef, useState } from "react";
import domtoimage from "dom-to-image";

function Editor({ imageFile }) {
  const url = imageFile ? URL.createObjectURL(imageFile) : null;
  const [stickerUrl, setStickerUrl] = useState(null);
  const stickerElement = useRef();

  return (
    <div>
      <div
        ref={stickerElement}
        style={{
          display: "inline-flex",
          height: "512px",
          width: "512px",
          alignItems: "center",
          padding: "5px"
        }}
      >
        <div
          style={{
            width: "100%",
            border: "5px solid white",
            borderRadius: "5px",
            boxShadow: "0 0 3px black",
            lineHeight: 0
          }}
        >
          {url && <img style={{ width: "100%" }} src={url} />}
        </div>
      </div>
      <button
        onClick={() =>
          domtoimage
            .toPng(stickerElement.current)
            .then(dataUrl => setStickerUrl(dataUrl))
        }
      >
        Do something
      </button>
      {stickerUrl && <img src={stickerUrl} />}
    </div>
  );
}

export default Editor;
