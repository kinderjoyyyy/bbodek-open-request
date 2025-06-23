const { google } = require("googleapis");

exports.handler = async (event) => {
  try {
    const { 기관명, 주소 } = JSON.parse(event.body);
    const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "오픈요청!A:C",
      valueInputOption: "RAW",
      requestBody: {
        values: [[기관명, 주소, now]],
      },
    });

return {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  },
  body: JSON.stringify({ success: true })
};
  } catch (err) {
    console.error("오류:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
