const min = 750;
const globalMax = 7500;
const mediaMax = 4000;
let count = 0;

function listener(requestDetails) {
  count++;
  const url = new URL(requestDetails.url);
  let max = globalMax;
  if (requestDetails.type === "media"
    || url.host === "v.redd.it") {
    max = mediaMax;
  }
  const timeout = Math.min(
    Math.max(
      min + count * 3,
      Math.random() * (min + count * 5)),
    max);
  console.log(count, url, requestDetails, timeout);
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({ url: requestDetails.url });
    }, timeout);
  });
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {
    urls: [
      "*://*.reddit.com/*",
      "*://*.redd.it/*",
      "*://*.redditmedia.com/*",
      "*://*.gfycat.com/*",
      "*://*.imgur.com/*"
    ]
  },
  ["blocking"]
);
