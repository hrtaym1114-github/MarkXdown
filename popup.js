document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: scrapeXPostAndReplies,
  }, (results) => {
    const data = results[0].result;
    document.getElementById("output").value = data;
  });

  document.getElementById("copy").addEventListener("click", () => {
    const text = document.getElementById("output").value;
    navigator.clipboard.writeText(text);
  });

  document.getElementById("save").addEventListener("click", () => {
    const text = document.getElementById("output").value;
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: "x_post.md"
    });
  });
});

function scrapeXPostAndReplies() {
  const tweetSelector = 'article';
  const articles = Array.from(document.querySelectorAll(tweetSelector));
  const results = [];

  for (const article of articles) {
    const textEl = article.querySelector('div[lang]');
    const text = textEl ? textEl.innerText.trim() : '';

    // 投稿URLの取得（Tweet内のanchorから判定）
    const tweetLink = article.querySelector('a[href*="/status/"]');
    const tweetURL = tweetLink ? `https://x.com${tweetLink.getAttribute('href')}` : '';

    // 画像の取得（twimg 画像のみフィルタ）
    const imgTags = article.querySelectorAll('img');
    const imageUrls = Array.from(imgTags)
      .map(img => img.src)
      .filter(src => src.includes('twimg.com') && !src.includes('profile_images')); // プロフ画像除外

    const imageMarkdown = imageUrls.map(url => `![](${url})`).join('\n');

    // 動画のサムネイル画像も含まれてる（amplify_video_thumb など）
    const isVideo = imageUrls.some(url => url.includes('amplify_video_thumb'));

    let videoMarkdown = '';
    if (isVideo && tweetURL) {
      videoMarkdown = `[動画はこちら](${tweetURL})`;
    }

    const markdown = `${text}\n\n${imageMarkdown}\n${videoMarkdown}`.trim();
    results.push(markdown);
  }

  return results.join('\n\n---\n\n');
}
