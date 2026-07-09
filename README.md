# chigasaki-gomi-skill

茅ヶ崎市（香川・松風台・甘沼・行谷・芹沢・堤・下寺尾・みずき地区）のゴミ収集日を教えてくれる、個人利用のAlexaカスタムスキル。

「アレクサ、ごみの日を開いて」と話しかけると今日のゴミの種類を答える。Alexaアプリの Routine 機能を使うことで、「今日は何のゴミの日」のような一言呼びかけや、毎朝の自動通知も設定できる（後述）。

## データについて

`data/calendars/r8-district1.json` に令和8年度（2026-04-01〜2027-03-31）の収集カレンダーを日付ごとに格納している。市が公開しているカレンダーPDFはグラフィック中心で自動解析が難しいため、目視で書き出した静的データを使っている。次年度のカレンダーが公開されたら「年次更新」の節を参照。

## セットアップ

### 0. ローカル準備

```bash
npm install
npm run test              # 純粋関数のユニットテスト
npm run validate-calendar # カレンダーデータの曜日パターン検証
```

### 1. AWSアカウント

1. https://aws.amazon.com/ でアカウント作成し、ルートユーザーにMFAを設定
2. Billing → Budgets で低額のアラームを設定（無料利用枠内に収まる想定）
3. IAM → ユーザー作成（プログラムアクセス）→ `AWSLambda_FullAccess` + `IAMFullAccess` を付与
4. ローカルで `aws configure` を実行し、アクセスキーとデフォルトリージョン（`ap-northeast-1` 推奨）を設定

### 2. Lambda実行ロール

IAM → ロール作成 → 信頼されたエンティティ「Lambda」→ ポリシー `AWSLambdaBasicExecutionRole` をアタッチ。ロールのARNを控えておく（例: `arn:aws:iam::<account-id>:role/AlexaGomiLambdaRole`）。

### 3. Lambda関数の作成・デプロイ

```bash
npm run build
LAMBDA_ROLE_ARN=arn:aws:iam::<account-id>:role/AlexaGomiLambdaRole npm run deploy
```

初回は `aws lambda create-function`、2回目以降は `LAMBDA_ROLE_ARN` なしで `npm run deploy` を実行すれば `update-function-code` が走る。

### 4. Amazon Developerアカウント & Alexaスキル作成

1. https://developer.amazon.com/ でアカウント作成（AWSとは別物、無料）
2. Alexa Developer Console → 「スキルの作成」→ 日本語 → モデル「カスタム」→ ホスティング「自分でプロビジョニングする」
3. 左メニュー「JSON Editor」に `interactionModels/ja-JP.json` の内容を貼り付けて保存 → 「モデルを構築」
4. 左メニュー「エンドポイント」→ AWS Lambda ARN に手順3で作成したLambdaのARNを入力
5. Lambdaコンソール側で「トリガーを追加」→「Alexa Skills Kit」→ スキルID を貼り付け（呼び出し許可が自動生成される）
6. 「テスト」タブで「開発中の状態でスキルテストを有効化」をON

development状態のスキルは、作成に使ったAmazonアカウントに紐づくデバイス/アプリでのみ利用できる（ストア公開・審査は不要）。

## Alexaアプリでの Routine 設定

Routineの「スキル」アクションはスキルの起動（LaunchRequest）のみをサポートするため、`LaunchRequestHandler` が直接「今日のゴミ」を答える設計にしている。

**呼びかけ式**（例:「今日は何のゴミの日」）
1. Alexaアプリ → その他 → ルーティン → ＋
2. トリガーを追加 → 音声 → 独自の言い方 → 好きなフレーズを入力
3. アクションを追加 → スキル → 本スキルを選択 → 実行デバイス「発話したデバイスから応答」

**毎朝の自動通知**
1. ルーティン作成 → トリガーを追加 → スケジュール（時刻・毎日）
2. アクションを追加 → スキル → 本スキルを選択 → 実行デバイスを明示的に指定
3. 保存

## テスト方法

1. Alexa Developer Console の Simulator でテキスト入力して応答確認
2. 実機Echoで「アレクサ、ごみの日を開いて」→ Routine設定後は実際のトリガーで確認
3. `npm run test` で日付計算・カレンダー参照・読み上げ文生成のユニットテスト
4. `npm run validate-calendar` で曜日パターンから外れる日付を一覧化

## 年次更新（次年度カレンダー公開時）

1. `data/calendars/r9-district1.json` を新規作成（`CalendarFile` 型に準拠、`period.start/end` を新年度に設定）
2. `data/calendars/index.ts` の `calendars` 配列に追加
3. `npm run validate-calendar` で異常有無を確認
4. `npm run deploy` でLambdaに反映（対話モデル側の変更は通常不要）
