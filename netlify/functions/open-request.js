const express = require("express");
const app = express();

app.use(express.json());

export const handler = async (event) => {
  try {
    const { 기관명, 주소 } = JSON.parse(event.body);
    const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    // Google Sheets 기록 로직 (예: googleapis 사용)
    // ...
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
