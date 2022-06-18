export const getTextContentFromElemHandler = async (elementHandle) => {
  const textContentProperty = await elementHandle.getProperty("textContent");
  return textContentProperty.jsonValue();
};

export const getHrefFromElemHandler = async (elementHandle) => {
  const hrefProperty = await elementHandle.getProperty("href");
  return hrefProperty.jsonValue();
};

export const getSrcFromElemHandler = async (elementHandle) => {
  const srcProperty = await elementHandle.getProperty("src");
  return srcProperty.jsonValue();
};

export const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 10);
    });
  });
};