import React, { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import rotatedWidth from "../utils/rotatedWidth";

const SIDE = 512;

function Editor({ imageFile, settings, onChange }) {
  const url = imageFile ? URL.createObjectURL(imageFile) : null;
  const [stickerUrl, setStickerUrl] = useState(null);
  const stickerElement = useRef();

  const xScale = SIDE / rotatedWidth(SIDE, settings.rotation);

  return (
    <div>
      <div>
        <label>
          Radius:{" "}
          <input
            type="number"
            value={settings.radius}
            onChange={e =>
              onChange({ ...settings, radius: Number(e.target.value) })
            }
            min="0"
          />
        </label>

        <label>
          Shadow size:{" "}
          <input
            type="number"
            value={settings.shadowSize}
            onChange={e =>
              onChange({ ...settings, shadowSize: Number(e.target.value) })
            }
            min="0"
          />
        </label>

        <label>
          Border width:{" "}
          <input
            type="number"
            value={settings.borderWidth}
            onChange={e =>
              onChange({ ...settings, borderWidth: Number(e.target.value) })
            }
            min="0"
          />
        </label>

        <label>
          Rotation:{" "}
          <input
            type="number"
            value={settings.rotation}
            onChange={e =>
              onChange({ ...settings, rotation: Number(e.target.value) })
            }
          />
        </label>
      </div>

      <div
        ref={stickerElement}
        style={{
          display: "inline-flex",
          height: `${SIDE}px`,
          width: `${SIDE}px`,
          alignItems: "center",
          padding: "5px",
          position: "relative"
        }}
      >
        <div
          style={{
            width: `${SIDE}px`,
            border: `${settings.borderWidth}px solid white`,
            borderRadius: `${settings.radius}px`,
            boxShadow: `0 0 ${settings.shadowSize}px black`,
            lineHeight: 0,
            overflow: "hidden",
            transform: `rotate(${settings.rotation}deg) scale(${xScale})`
          }}
        >
          {url && (
            <img alt="Sticker preview" style={{ width: "100%" }} src={url} />
          )}
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

      {stickerUrl && <img alt="Generated sticker" src={stickerUrl} />}
      {stickerUrl && (
        <button onClick={() => saveAs(stickerUrl, "sticker.png")}>
          Download
        </button>
      )}
    </div>
  );
}

export default Editor;
