import React, { useState } from "react";

import Sticker from "./Editor/Sticker";
import Configuration from "./Editor/Configuration";

function Editor({ settings, onChange }) {
  const [activeSticker, setActiveSticker] = useState(false);

  return (
    <div className="flex flex-col justify-between flex-grow">
      <Sticker
        settings={settings}
        onSelectFile={() => setActiveSticker(true)}
      />

      {activeSticker && (
        <Configuration
          settings={settings}
          onSettingsChange={updatedSetting =>
            onChange({ ...settings, ...updatedSetting })
          }
        />
      )}
    </div>
  );
}

export default Editor;
