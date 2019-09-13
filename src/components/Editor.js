import React, { useState } from "react";

function Editor({ imageFile }) {
  const url = imageFile ? URL.createObjectURL(imageFile) : null;

  return <div>{url && <img src={url} />}</div>;
}

export default Editor;
