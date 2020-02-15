import React, { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import Button from "../Button";
import classNames from "../../utils/classNames";

import FileSelector from "./FileSelector";
import Preview from "./Preview";

const SIDE = 512;

function Sticker({ settings, onSelectFile }) {
  const stickerElement = useRef();
  const [image, setImage] = useState(null);
  const url = image ? URL.createObjectURL(image) : null;

  return (
    <>
      {url && (
        <Preview
          ref={stickerElement}
          imageUrl={url}
          settings={settings}
          side={SIDE}
        />
      )}

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
          onFileSelected={file => {
            setImage(file);
            onSelectFile();
          }}
        />
      </div>
    </>
  );
}

export default Sticker;
