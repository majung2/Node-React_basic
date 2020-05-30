const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser'); // body-parser 가져오기
const { User } = require("./models/User"); // User 모델 가져오기

const config = require('./config/key');

// application/x-www-form-urlendcoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('Mongoose DB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!~안~'))

app.post('/register',(req, res) => {

  // 회원 가입시 필요한 정보를 client에서 가져오면 데이터베이스에 넣는다.

  const user = new User(req.body) // req.body에 json형태로 정보가 들어가있음

  user.save((err,doc) => { // 몽고DB 메소드
    if(err) return res.json({success:false, err}) //에러 발생시, 에러메시지 보냄
    return res.status(200).json({ // 200: 성공
      success: true
    })
  }) 
})


app.get('/', (req, res) => res.send('Hello World!~안녕하세요~'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)) 