export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const range = (length) => Array.from({ length }, (v, i) => i);

export const hankaku2Zenkaku = (str) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
}
