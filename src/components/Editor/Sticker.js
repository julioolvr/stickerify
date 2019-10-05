import React, { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import FileSelector from "../../components/FileSelector";
import Preview from "./Sticker/Preview";

const SIDE = 512;

function Sticker({ settings }) {
  const stickerElement = useRef();
  const [image, setImage] = useState(null);
  const url = image ? URL.createObjectURL(image) : null;

  return (
    <>
      <FileSelector onFileSelected={file => setImage(file)} />
      {url && <Preview imageUrl={url} settings={settings} side={SIDE} />}

      <button
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
      </button>
    </>
  );
}

export default Sticker;
