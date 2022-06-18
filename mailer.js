import NodeMailer from "nodemailer";
import "dotenv/config";

// メール送信関数
const _sendMail = (smtpData, mailData) => {
  // SMTPサーバの情報をまとめる
  const transporter = NodeMailer.createTransport(smtpData);

  // メール送信
  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

export const sendMail = (text, to) => {
  // SMTP情報を格納（Gmailの場合）
  const smtpData = {
    host: "smtp.gmail.com",
    port: 465,
    secure: "ssl",
    auth: {
      user: process.env.GMAIL_MAILER_EMAIL,
      pass: process.env.GMAIL_MAILER_PASS || "",
    },
  };

  // 送信内容を作成
  const mailData = {
    from: "nodemailer@gmail.com", // 送信元名
    to, // 送信先
    subject: "診察時間が近づいています", // 件名
    text, // 通常のメール本文
    html: `<b>${text}</b>`, // HTMLメール
  };

  // メールを送信
  _sendMail(smtpData, mailData);
};
