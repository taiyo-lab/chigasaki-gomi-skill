export type GomiCategory =
  | "BURNABLE" // 燃やせるごみ
  | "NON_BURNABLE" // 燃やせないごみ
  | "PAPER" // 古紙類
  | "BOTTLE_CAN" // びん・かん・ペットボトル・廃食用油・金属類
  | "PLASTIC" // プラスチック製容器包装
  | "CLOTH" // 衣類・布類
  | "SPRAY" // スプレーかん
  | "NONE"; // 収集無し

export interface CalendarFile {
  district: string;
  fiscalYear: string;
  period: { start: string; end: string };
  source: string;
  days: Record<string, GomiCategory>;
}
