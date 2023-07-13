require('dotenv').config();
const { DEVURL, PORT } = process.env;
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

fs.readdirSync('./routes').forEach((Route) => {
    app.use('/', require(`./routes/${Route}`));
});

//test
app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Hello test ;)' });
});

app.listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log('서버가 구동되었습니다.');
    console.log(DEVURL);
});
