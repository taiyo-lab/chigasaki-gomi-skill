import { findCategory as findCategoryInRegistry } from "../../data/calendars/index.js";
import type { GomiCategory } from "./types.js";

/** 指定したISO日付(YYYY-MM-DD)に対応するゴミ種別を返す。データが無い日付はundefined */
export function findCategory(dateIso: string): GomiCategory | undefined {
  return findCategoryInRegistry(dateIso);
}
