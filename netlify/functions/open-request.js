// open-request.js
export const handler = async (event) => {
  try {
    const { 기관명, 주소 } = JSON.parse(event.body);
    const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    console.log("요청 도착:", 기관명, 주소, now); // 🔍 확인용

    // 여기에 Google Sheets 기록 로직 작성

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error("에러 발생:", err.message);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
