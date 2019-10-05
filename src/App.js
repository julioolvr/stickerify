import React from "react";

import useSettings from "./hooks/useSettings";
import Editor from "./components/Editor";

function App() {
  const [settings, setSettings] = useSettings();

  return (
    <div className="w-screen min-h-screen bg-orange-200">
      <h1 className="text-center text-xl">Stickers!</h1>
      <Editor settings={settings} onChange={setSettings} />
    </div>
  );
}

export default App;
