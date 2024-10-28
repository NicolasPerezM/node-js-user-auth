import express from 'express'
import {PORT} from './config.js' //es mejor separar este tipo de variables en otro archivo

const app = express()

app.get('/', (req, res) => {
    res.send('Hello bitches')
})

//endpoints

app.post('/login', (req,res)=>{})
app.post('/register', (req,res)=>{})
app.post('/logout', (req,res)=>{})

app.get('/protected', (req,res)=>{})


//levantar servidor
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})


