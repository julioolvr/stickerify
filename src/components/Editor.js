import React from "react";

import Sticker from "./Editor/Sticker";
import Configuration from "./Editor/Configuration";

function Editor({ settings, onChange }) {
  return (
    <div>
      <Sticker settings={settings} />

      <Configuration
        settings={settings}
        onSettingsChange={updatedSetting =>
          onChange({ ...settings, ...updatedSetting })
        }
      />
    </div>
  );
}

export default Editor;
