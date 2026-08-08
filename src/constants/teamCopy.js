import teamLocalization from "./teamLocalization.json";

/**
 * Returns localized Team Members page/section copy derived from the StaticLocalization API,
 * or falls back to default static localization dictionary / English defaults.
 *
 * @param {Object} [loc] - Flattened localization object returned by getLocalization()
 */
export function getTeamCopy(loc = {}) {
  const get = (key) => {
    const k = key?.toLowerCase();
    const val = loc?.[k] ?? loc?.[key];
    if (val && typeof val === "string" && val.trim() !== "") {
      return val;
    }
    return teamLocalization[key] || "";
  };

  return {
    title: get("team_title") || "Meet Our Team",
    subtitle: get("team_subtitle") || "The passionate individuals driving our vision forward.",
  };
}
