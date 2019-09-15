import React, { useRef, useState, useEffect } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import rotatedWidth from "../utils/rotatedWidth";

const SIDE = 512;

function Editor({ imageFile }) {
  const url = imageFile ? URL.createObjectURL(imageFile) : null;
  const [stickerUrl, setStickerUrl] = useState(null);
  const stickerElement = useRef();

  const initialSettings = readSettings();

  const [radius, setRadius] = useState(initialSettings.radius || 5);
  const [shadowSize, setShadowSize] = useState(initialSettings.shadowSize || 5);
  const [borderWidth, setBorderWidth] = useState(
    initialSettings.borderWidth || 5
  );
  const [rotation, setRotation] = useState(initialSettings.rotation || 10);

  const xScale = SIDE / rotatedWidth(SIDE, rotation);

  useEffect(() => {
    saveSettings({ radius, shadowSize, borderWidth, rotation });
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

function saveSettings(settings) {
  setSettingsInHash(settings);
  setSettingsInLocalStorage(settings);
}

function readSettings() {
  return {
    ...readSettingsFromLocalStorage(),
    ...readSettingsFromHash()
  };
}

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

const LOCAL_STORAGE_KEY = "STICKER_SETTINGS";

function setSettingsInLocalStorage(settings) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
}

function readSettingsFromHash() {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((settings, keyVal) => {
      const [key, value] = keyVal.split("=");
      settings[key] = Number(value);
      return settings;
    }, {});
}

function readSettingsFromLocalStorage() {
  const contents = localStorage.getItem(LOCAL_STORAGE_KEY);

  try {
    return JSON.parse(contents);
  } catch {
    return {};
  }
}
