import { useCallback, useEffect, useState } from "react";
import { applyTheme, readPref, resolveTheme, savePref, type ThemePref } from "./theme";

const QUERY = "(prefers-color-scheme: dark)";

export function useTheme(): { pref: ThemePref; setPref: (p: ThemePref) => void } {
  const [pref, setPrefState] = useState<ThemePref>(() => readPref());

  // Apply whenever the pref changes (and on mount).
  useEffect(() => {
    applyTheme(resolveTheme(pref, window.matchMedia(QUERY).matches));
  }, [pref]);

  // While on auto, follow the OS live.
  useEffect(() => {
    if (pref !== "auto") return;
    const mq = window.matchMedia(QUERY);
    const onChange = () => applyTheme(resolveTheme("auto", mq.matches));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  const setPref = useCallback((p: ThemePref) => {
    savePref(p);
    setPrefState(p);
  }, []);

  return { pref, setPref };
}
