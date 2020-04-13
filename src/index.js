require ('./models/User');
require ('./models/Track')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
const trackRoutes = require('./routes/trackRoutes');



const app = express() 

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 'mongodb+srv://Chunrong:Meihaoweilai2020@cluster0-dpmil.mongodb.net/test?retryWrites=true&w=majority' 
mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true }) 

mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb')
})

mongoose.connection.on ('error', (err) => {
  console.error('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send (`Your email: ${req.user.email}`)
})

app.listen(3001, ()=> {
    console.log('running on port 3001')
})