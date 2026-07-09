import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

const FUNCTION_NAME = process.env.LAMBDA_FUNCTION_NAME ?? "chigasaki-gomi-skill";
const REGION = process.env.AWS_REGION ?? "ap-northeast-1";
const ROLE_ARN = process.env.LAMBDA_ROLE_ARN;
const ZIP_PATH = "dist/function.zip";

if (!existsSync(ZIP_PATH)) {
  console.error(`${ZIP_PATH} が見つかりません。先に \`npm run build\` を実行してください。`);
  process.exit(1);
}

function functionExists() {
  try {
    execSync(
      `aws lambda get-function --function-name ${FUNCTION_NAME} --region ${REGION}`,
      { stdio: "pipe" },
    );
    return true;
  } catch {
    return false;
  }
}

if (functionExists()) {
  console.log(`既存のLambda関数 "${FUNCTION_NAME}" のコードを更新します...`);
  execSync(
    `aws lambda update-function-code --function-name ${FUNCTION_NAME} --zip-file fileb://${ZIP_PATH} --region ${REGION}`,
    { stdio: "inherit" },
  );
} else {
  if (!ROLE_ARN) {
    console.error(
      "初回作成には環境変数 LAMBDA_ROLE_ARN (実行ロールのARN) が必要です。例:\n" +
        "  LAMBDA_ROLE_ARN=arn:aws:iam::<account-id>:role/AlexaGomiLambdaRole npm run deploy",
    );
    process.exit(1);
  }
  console.log(`Lambda関数 "${FUNCTION_NAME}" を新規作成します...`);
  execSync(
    `aws lambda create-function --function-name ${FUNCTION_NAME} ` +
      `--runtime nodejs20.x --handler index.handler --role ${ROLE_ARN} ` +
      `--zip-file fileb://${ZIP_PATH} --timeout 8 --memory-size 128 --region ${REGION}`,
    { stdio: "inherit" },
  );
}

console.log("デプロイ完了。Alexa Developer ConsoleのエンドポイントにこのLambdaのARNを設定してください。");
