import React, { useRef, useState, useEffect } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import rotatedWidth from "../utils/rotatedWidth";

const SIDE = 512;

function Editor({ imageFile }) {
  const url = imageFile ? URL.createObjectURL(imageFile) : null;
  const [stickerUrl, setStickerUrl] = useState(null);
  const stickerElement = useRef();

  const initialSettings = readSettingsFromHash();

  const [radius, setRadius] = useState(initialSettings.radius || 5);
  const [shadowSize, setShadowSize] = useState(initialSettings.shadowSize || 5);
  const [borderWidth, setBorderWidth] = useState(
    initialSettings.borderWidth || 5
  );
  const [rotation, setRotation] = useState(initialSettings.rotation || 10);

  const xScale = SIDE / rotatedWidth(SIDE, rotation);

  useEffect(() => {
    setSettingsInHash({ radius, shadowSize, borderWidth, rotation });
  }, [radius, shadowSize, borderWidth, rotation]);

  return (
    <div>
      <div>
        <label>
          Radius:{" "}
          <input
            type="number"
            value={radius}
            onChange={e => setRadius(Number(e.target.value))}
            min="0"
          />
        </label>

        <label>
          Shadow size:{" "}
          <input
            type="number"
            value={shadowSize}
            onChange={e => setShadowSize(Number(e.target.value))}
            min="0"
          />
        </label>

        <label>
          Border width:{" "}
          <input
            type="number"
            value={borderWidth}
            onChange={e => setBorderWidth(Number(e.target.value))}
            min="0"
          />
        </label>

        <label>
          Rotation:{" "}
          <input
            type="number"
            value={rotation}
            onChange={e => setRotation(Number(e.target.value))}
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
            border: `${borderWidth}px solid white`,
            borderRadius: `${radius}px`,
            boxShadow: `0 0 ${shadowSize}px black`,
            lineHeight: 0,
            overflow: "hidden",
            transform: `rotate(${rotation}deg) scale(${xScale})`
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

function setSettingsInHash(settings) {
  window.history.pushState(
    undefined,
    undefined,
    "#" +
      Object.keys(settings)
        .map(setting => `${setting}=${settings[setting]}`)
        .join("&")
  );
}

function readSettingsFromHash() {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((settings, keyVal) => {
      const [key, value] = keyVal.split("=");
      settings[key] = value;
      return settings;
    }, {});
}
