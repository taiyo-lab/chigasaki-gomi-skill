const JST_TIME_ZONE = "Asia/Tokyo";

function toJstParts(date: Date): { year: number; month: number; day: number } {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: JST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);
  return { year, month, day };
}

/** Lambda実行環境(UTC)に依存せず、現在時刻からJSTでの"今日+offsetDays"の日付をISO(YYYY-MM-DD)で返す */
export function getJstDateString(offsetDays: number, now: Date = new Date()): string {
  const { year, month, day } = toJstParts(now);
  // JSTの日付部分だけをUTC正午として扱い、日数加算時の夏時間等の影響を避ける
  const base = new Date(Date.UTC(year, month - 1, day, 12));
  base.setUTCDate(base.getUTCDate() + offsetDays);
  const y = base.getUTCFullYear();
  const m = String(base.getUTCMonth() + 1).padStart(2, "0");
  const d = String(base.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** "2026-07-10" のようなISO日付を「7月10日」の読み上げ用表記に変換する */
export function formatForSpeech(dateIso: string): string {
  const [, month, day] = dateIso.split("-").map(Number);
  return `${month}月${day}日`;
}

/** AMAZON.DATEスロットの解決値がYYYY-MM-DD形式(単一の日付)かどうかを判定する */
export function isResolvedSingleDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
