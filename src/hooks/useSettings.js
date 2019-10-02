import { useState, useEffect } from "react";

function useSettings() {
  const [settings, setSettings] = useState({
    ...DEFAULT_SETTINGS,
    ...readSettings()
  });

  useEffect(() => saveSettings(settings), [settings]);

  return [
    settings,
    settings => {
      setSettings(settings);
      saveSettings(settings);
    }
  ];
}

export default useSettings;

const DEFAULT_SETTINGS = {
  radius: 5,
  shadowSize: 5,
  borderWidth: 5,
  rotation: 5
};

function saveSettings(settings) {
  setSettingsInHash(settings);
  setSettingsInLocalStorage(settings);
}

function readSettings() {
  return {
    ...readSettingsFromLocalStorage(),
    ...readSettingsFromHash()
  };
}

function setSettingsInHash(settings) {
  window.history.pushState(
    undefined,
    undefined,
    "#" +
      Object.keys(settings)
        .map(setting => `${setting}=${settings[setting]}`)
        .join("&")
  );
}

const LOCAL_STORAGE_KEY = "STICKER_SETTINGS";

function setSettingsInLocalStorage(settings) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
}

function readSettingsFromHash() {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((settings, keyVal) => {
      const [key, value] = keyVal.split("=");
      settings[key] = Number(value);
      return settings;
    }, {});
}

function readSettingsFromLocalStorage() {
  const contents = localStorage.getItem(LOCAL_STORAGE_KEY);

  try {
    return JSON.parse(contents);
  } catch {
    return {};
  }
}
