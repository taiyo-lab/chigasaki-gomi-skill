import calendar from "../data/calendars/r8-district1.json" with { type: "json" };
import type { GomiCategory } from "../src/lib/types.js";

type Warning = { date: string; message: string };

function weekday(dateIso: string): number {
  const [y, m, d] = dateIso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay(); // 0=Sun ... 6=Sat
}

function nthWeekdayOfMonth(dateIso: string): number {
  const d = Number(dateIso.split("-")[2]);
  return Math.floor((d - 1) / 7) + 1;
}

const warnings: Warning[] = [];
const dates = Object.keys(calendar.days as Record<string, GomiCategory>).sort();

let lastTueCategory: GomiCategory | null = null;
const WED_CYCLE: GomiCategory[] = ["NON_BURNABLE", "CLOTH", "NON_BURNABLE", "SPRAY"];

for (const date of dates) {
  const category = (calendar.days as Record<string, GomiCategory>)[date];
  const dow = weekday(date);

  if (dow === 0 || dow === 6) {
    if (category !== "NONE") {
      warnings.push({ date, message: `土日だが${category}になっている` });
    }
    continue;
  }

  if (dow === 1 || dow === 4) {
    if (category !== "BURNABLE" && category !== "NONE") {
      warnings.push({ date, message: `月/木だが${category}になっている(BURNABLE想定)` });
    }
    continue;
  }

  if (dow === 5) {
    if (category !== "PLASTIC" && category !== "NONE") {
      warnings.push({ date, message: `金だが${category}になっている(PLASTIC想定)` });
    }
    continue;
  }

  if (dow === 2) {
    if (category !== "PAPER" && category !== "BOTTLE_CAN" && category !== "NONE") {
      warnings.push({ date, message: `火だが${category}になっている(PAPER/BOTTLE_CAN想定)` });
    } else if (category !== "NONE") {
      if (lastTueCategory !== null && lastTueCategory === category) {
        warnings.push({ date, message: `火の隔週交互パターンが崩れている(前回も${category})` });
      }
      lastTueCategory = category;
    }
    continue;
  }

  if (dow === 3) {
    const nth = nthWeekdayOfMonth(date);
    if (nth <= 4) {
      const expected = WED_CYCLE[nth - 1];
      if (category !== expected && category !== "NONE") {
        warnings.push({ date, message: `水の${nth}週目は${expected}想定だが${category}` });
      }
    } else if (category !== "NONE") {
      warnings.push({ date, message: `水の5週目は収集無し想定だが${category}` });
    }
    continue;
  }
}

console.log(`検証対象日数: ${dates.length}`);
if (warnings.length === 0) {
  console.log("既知パターンからの逸脱なし。");
} else {
  console.log(`要確認: ${warnings.length}件`);
  for (const w of warnings) {
    console.log(`  ${w.date}: ${w.message}`);
  }
}
