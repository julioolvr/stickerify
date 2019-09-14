import React, { useRef, useState } from "react";
import domtoimage from "dom-to-image";

function Editor({ imageFile }) {
  const url = imageFile ? URL.createObjectURL(imageFile) : null;
  const [stickerUrl, setStickerUrl] = useState(null);
  const stickerElement = useRef();

  const [radius, setRadius] = useState(5);
  const [shadowSize, setShadowSize] = useState(5);

  return (
    <div>
      <div>
        <label>
          Radius:{" "}
          <input
            type="number"
            value={radius}
            onChange={e => setRadius(e.target.value)}
            min="0"
          />
        </label>

        <label>
          Shadow size:{" "}
          <input
            type="number"
            value={shadowSize}
            onChange={e => setShadowSize(e.target.value)}
            min="0"
          />
        </label>
      </div>

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
            borderRadius: `${radius}px`,
            boxShadow: `0 0 ${shadowSize}px black`,
            lineHeight: 0,
            overflow: "hidden"
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
