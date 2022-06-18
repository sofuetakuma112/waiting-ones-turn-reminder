import puppeteer from "puppeteer";
import { sendMail } from "./mailer.js";
import { sleep, hankaku2Zenkaku } from "./utils/index.js";
import { getTextContentFromElemHandler } from "./utils/pupeteer.js";

const receiptNum = Number(process.argv[2]);
const to = process.argv[3];
const threshold = Number(process.argv[4]) || 5;

const startTime = performance.now(); // 開始時間

// スクレイピング設定
const options = {
  headless: true,
};
const browser = await puppeteer.launch(options);
const page = await browser.newPage();

const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36";
page.setUserAgent(userAgent);
page.setDefaultNavigationTimeout(60000);

const startUrl =
  "https://ssc5.doctorqube.com/sogame-hifuka/index.html?stamp=092621";
await sleep(2000);

const extractInfoFromSinglePage = async (page) => {
  // 詳細ページへのURL一覧を取得
  const nowInfoElems = await page.$$(".nowinfo > span");
  const orderListElems = await page.$(".waitlistall");
  const nowNumber_zenkaku = await getTextContentFromElemHandler(
    nowInfoElems[0]
  );
  const orders_zenkaku = await getTextContentFromElemHandler(orderListElems);

  const orders = hankaku2Zenkaku(orders_zenkaku).split("、");
  const nowNumber = Number(hankaku2Zenkaku(nowNumber_zenkaku));

  return orders
    .map((num_str) => Number(num_str))
    .filter((num) => num > nowNumber)
    .indexOf(receiptNum);
};

const scraping = (page) => {
  return new Promise(async (resolve, reject) => {
    const remaining = await extractInfoFromSinglePage(page);
    await sleep(3000);
    resolve(remaining);
  });
};

while (true) {
  await Promise.all([
    page.goto(startUrl),
    page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
  ]);
  const remaining = await scraping(page);
  console.log(`現在${remaining}人待ちです`);
  if (remaining < threshold + 1) {
    sendMail(`現在${remaining}人待ちです`, to);
    break;
  }
  await sleep(60 * 1000 * 1);
}

const endTime = performance.now(); // 終了時間
console.log((endTime - startTime) / 1000, " [s]"); // 何ミリ秒かかったかを表示する

await browser.close();
