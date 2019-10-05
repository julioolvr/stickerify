import React from "react";

function FileSelector({ onFileSelected }) {
  return (
    <label>
      Select file
      <input
        type="file"
        onChange={e => onFileSelected(e.target.files[0])}
        className="invisible"
      />
    </label>
  );
}

export default FileSelector;
