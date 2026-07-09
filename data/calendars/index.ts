import type { CalendarFile, GomiCategory } from "../../src/lib/types.js";
import r8 from "./r8-district3.json";

const calendars: CalendarFile[] = [r8 as CalendarFile];

/** 指定したISO日付(YYYY-MM-DD)が属する年度のカレンダーからゴミ種別を探す */
export function findCategory(dateIso: string): GomiCategory | undefined {
  const cal = calendars.find((c) => dateIso >= c.period.start && dateIso <= c.period.end);
  return cal?.days[dateIso];
}
