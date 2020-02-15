import React, { useState, useRef } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import classNames from "../utils/classNames";
import Button from "./Button";

import Preview from "./Editor/Preview";
import FileSelector from "./Editor/FileSelector";
import Configuration from "./Editor/Configuration";

const SIDE = 512;

function Editor({ settings, onChange }) {
  const stickerElement = useRef();
  const [image, setImage] = useState(null);
  const url = image ? URL.createObjectURL(image) : null;

  return (
    <div className="flex flex-col justify-between flex-grow md:flex-row">
      {url && (
        <Preview
          ref={stickerElement}
          imageUrl={url}
          settings={settings}
          side={SIDE}
          className="flex-1"
        />
      )}

      <div
        className={classNames({
          "flex flex-col flex-1": true,
          "flex-grow": !image
        })}
      >
        <div
          className={classNames({
            "flex justify-around my-4": true,
            "flex-grow": !image
          })}
        >
          {image && (
            <Button
              className="mx-2"
              disabled={!image}
              onClick={() =>
                domtoimage
                  .toPng(stickerElement.current, {
                    // TODO: Maybe pad by shadowSize * xScale?
                    // Or maybe wrap in a huge element, convert to PNG and trim and resize?
                    style: { height: SIDE, width: SIDE }
                  })
                  .then(stickerUrl => saveAs(stickerUrl, "sticker.png"))
              }
            >
              Download
            </Button>
          )}

          <FileSelector
            className="mx-2"
            onFileSelected={file => setImage(file)}
          />
        </div>

        {image && (
          <Configuration
            settings={settings}
            onSettingsChange={updatedSetting =>
              onChange({ ...settings, ...updatedSetting })
            }
          />
        )}
      </div>
    </div>
  );
}

export default Editor;
