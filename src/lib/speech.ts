import type { GomiCategory } from "./types.js";

export const CATEGORY_LABEL: Record<GomiCategory, string> = {
  BURNABLE: "燃やせるごみ",
  NON_BURNABLE: "燃やせないごみ",
  PAPER: "古紙類",
  BOTTLE_CAN: "びん・かん・ペットボトル・廃食用油・金属類",
  PLASTIC: "プラスチック製容器包装",
  CLOTH: "衣類・布類",
  SPRAY: "スプレーかん",
  NONE: "収集はありません",
};

export function buildAnswer(dateLabel: string, category: GomiCategory | undefined): string {
  if (category === undefined) {
    return `${dateLabel}のゴミ収集データがまだありません。`;
  }
  if (category === "NONE") {
    return `${dateLabel}は収集はありません。`;
  }
  return `${dateLabel}は${CATEGORY_LABEL[category]}の日です。`;
}
