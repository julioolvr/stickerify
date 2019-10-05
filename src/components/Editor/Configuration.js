import React from "react";

function Configuration({ settings, onSettingsChange }) {
  return (
    <div>
      <label>
        Radius:{" "}
        <input
          type="number"
          value={settings.radius}
          onChange={e => onSettingsChange({ radius: Number(e.target.value) })}
          min="0"
        />
      </label>

      <label>
        Shadow size:{" "}
        <input
          type="number"
          value={settings.shadowSize}
          onChange={e =>
            onSettingsChange({ shadowSize: Number(e.target.value) })
          }
          min="0"
        />
      </label>

      <label>
        Border width:{" "}
        <input
          type="number"
          value={settings.borderWidth}
          onChange={e =>
            onSettingsChange({ borderWidth: Number(e.target.value) })
          }
          min="0"
        />
      </label>

      <label>
        Rotation:{" "}
        <input
          type="number"
          value={settings.rotation}
          onChange={e => onSettingsChange({ rotation: Number(e.target.value) })}
        />
      </label>
    </div>
  );
}

export default Configuration;
