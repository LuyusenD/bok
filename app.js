const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const article = require('./routes/article.js');
const user = require('./routes/user.js');

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({
    extended:false
}))

app.listen(3000)
app.use('/article',article);
app.use('/user',user);