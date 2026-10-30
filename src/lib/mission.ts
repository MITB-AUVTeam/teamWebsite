/**
 * The next competition, shown on the Home telemetry strip and at the end of the
 * About timeline. Set `date` (ISO, IST) once it is announced and the telemetry
 * panel switches from "Dates TBA" to a live countdown.
 */
export const NEXT_MISSION: { name: string; place: string; date: string | null } = {
  name: "RoboSub 2027",
  place: "Dates to be announced",
  date: null,
};
