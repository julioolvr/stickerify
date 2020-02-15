import React, { useState } from "react";

import { buttonStyles } from "../../Button";
import classNames from "../../../utils/classNames";

function FileSelector({ onFileSelected, className }) {
  const [fileSelected, setFileSelected] = useState(false);

  return (
    <div
      className={classNames({
        "flex flex-col justify-center items-center": true,
        [className]: className,
        "flex-grow": !fileSelected
      })}
    >
      <label>
        <div className={buttonStyles}>
          Select image
          <input
            type="file"
            onChange={e => {
              setFileSelected(true);
              onFileSelected(e.target.files[0]);
            }}
            className="hidden"
          />
        </div>
      </label>
    </div>
  );
}

export default FileSelector;
