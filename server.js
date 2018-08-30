const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server');

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:57303ea2-09c5-4bef-8221-12d7b37b21e7',
  key: 'abb77fb0-ea26-453a-bb9a-4dab11815fdf:hOPQVv5gAy/w6VMPz+2hLS5WgEdSnaoN9KYXWauyz08=',
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req,res)=>{
  console.log(req);
  const {username} = req.body;

  chatkit
    .createUser({
      name: username,
      id: username
    })
    .then( ()=>res.sendStatus(201))
    .catch(error=>{
      //res.send(error);
      if(error.error === 'services/chatkit/user_already_exists'){
        res.sendStatus(200)
      }else{
        res.status(error.statusCode).json(error)
      }
    })
});


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
