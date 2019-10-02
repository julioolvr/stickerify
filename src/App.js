import React, { useState } from "react";

import useSettings from "./hooks/useSettings";
import FileSelector from "./components/FileSelector";
import Editor from "./components/Editor";

function App() {
  const [image, setImage] = useState(null);
  const [settings, setSettings] = useSettings();

  return (
    <div>
      <Editor imageFile={image} settings={settings} onChange={setSettings} />
      <FileSelector onFileSelected={file => setImage(file)} />
    </div>
  );
}

export default App;
