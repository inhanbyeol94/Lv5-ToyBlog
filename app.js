require('dotenv').config();
const { DEVURL, PORT } = process.env;
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use((err, req, res, next) => {
  // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).json({ message: '오류가 발생하였습니다.' }); // 500 상태 표시 후 에러 메시지 전송
});

fs.readdirSync('./Routes').forEach((Route) => {
  app.use('/', require(`./Routes/${Route}`));
});

//test
app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello ;)' });
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log('서버가 구동되었습니다.');
  console.log(DEVURL);
});
