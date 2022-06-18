[十亀皮フ科｜松山市](https://ssc5.doctorqube.com/sogame-hifuka/)の予約があと何人待ちかをメールでリマインドするサービス

メール送信に[nodemailer](https://www.npmjs.com/package/nodemailer)を使用しているので、[nodemailerでgmailのアカウントを利用して送信する](https://thundermiracle.com/blog/2020-06-13-smtp-gmail-by-nodemailer/)を参考に、2FAを有効にしてアプリパスワードを発行してください。

発行されたアプリパスワードと2FAを有効化したアカウントのメールアドレスを`.env.example`に貼り付けて`.env`にファイル名をリネームしてください

ターミナルから以下のコマンドを入力して実行すると、5人待ちになったタイミングでリマインドメールが送信されます。

`node index.js 自分の受付番号 リマインドメールの送信先`
