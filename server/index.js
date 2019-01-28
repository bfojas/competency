
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');

const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
const connect = require('connect-pg-simple')
dotenv.config()

app.use(bodyParser.json())
app.use(express.static(`${__dirname}/../build`))

massive(process.env.CONNECTION_STRING).then(db=>{
    app.set('db',db)
})
.catch(err=> console.log('massive shit', err))
let dbInstance = app.get('db')

app.use(session({
    store: new(connect(session))({
        conString: process.env.CONNECTION_STRING
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
}))

app.post('/api/postOne', (req,res)=>{
    const {name, number}= req.body
    req.session.name = name
    app.get('db').add_one({name, number})
    console.log('req.session', req.session)
})

app.post('/api/postTwo', (req,res)=>{
    const {name, number}= req.body
    app.get('db').add_two({name, number})
})

app.put('/api/put', (req, res)=>{
    console.log(req.query)
    const {id} = req.query
    const {name} = req.body
    
    app.get('db').edit({id, name})
})

app.get('/api/join', (req,res)=>{
    console.log('join hit')
    app.get('db').join()
    .then(res=> console.log(res))
})


const PORT=4000;
app.listen(PORT, ()=>console.log(`listening to ${PORT}`))