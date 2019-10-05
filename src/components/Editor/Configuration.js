import React from "react";

function Configuration({ settings, onSettingsChange }) {
  return (
    <div className="text-gray-800 text-lg">
      <div className="py-4 px-2 flex bg-red-200">
        <label htmlFor="radius">Radius:</label>
        <input
          id="radius"
          type="number"
          value={settings.radius}
          onChange={e => onSettingsChange({ radius: Number(e.target.value) })}
          min="0"
          className="ml-3 flex-grow text-right"
        />
      </div>

      <div className="py-4 px-2 flex bg-yellow-200">
        <label htmlFor="shadow-size">Shadow size: </label>
        <input
          id="shadow-size"
          type="number"
          value={settings.shadowSize}
          onChange={e =>
            onSettingsChange({ shadowSize: Number(e.target.value) })
          }
          min="0"
          className="ml-3 flex-grow text-right"
        />
      </div>

      <div className="py-4 px-2 flex bg-green-200">
        <label htmlFor="border-width">Border width: </label>
        <input
          id="border-width"
          type="number"
          value={settings.borderWidth}
          onChange={e =>
            onSettingsChange({ borderWidth: Number(e.target.value) })
          }
          min="0"
          className="ml-3 flex-grow text-right"
        />
      </div>

      <div className="py-4 px-2 flex bg-teal-200">
        <label htmlFor="rotation">Rotation: </label>
        <input
          id="rotation"
          type="number"
          value={settings.rotation}
          onChange={e => onSettingsChange({ rotation: Number(e.target.value) })}
          min="0"
          max="360"
          className="ml-3 flex-grow text-right"
        />
      </div>
    </div>
  );
}

export default Configuration;
