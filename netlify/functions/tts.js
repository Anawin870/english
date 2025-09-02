import fetch from "node-fetch";

export async function handler(event, context) {
  const text = event.queryStringParameters.text || "hello";
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });

  const arrayBuffer = await response.arrayBuffer();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Access-Control-Allow-Origin": "*",
    },
    body: Buffer.from(arrayBuffer).toString("base64"),
    isBase64Encoded: true,
  };
}
