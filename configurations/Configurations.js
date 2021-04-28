const mongoose = require('mongoose')
const keys = require('./keys')

const PORT = process.env.PORT || 5000 //env variable set up by Heroku

const connectToDatabase = async () => {
  try {
    await mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  } catch (error) {
    console.log('ERROR OCCURED WHILE TRYING TO CONNECT TO THE DATABASE')
    process.exit()
  }
}

const connectToPort = (application) => {
  application.listen(PORT, () => {
    console.log('SERVER IS RUNNING ON PORT ' + PORT)
  })
}

module.exports = {
  connectToDatabase,
  connectToPort
}

//import dotenv from 'dotenv'
//dotenv.config()
// const { DATABASE_URL, PORT } = process.env

/* mongoose.connect('mongodb://localhost/namndb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('SUCCESSFYLLY CONNECTED TO DATABASE'))
  .catch((error) => {
    console.log('ERROR WHILE TRYING TO CONNECT TO DATABASE ' + error)
    process.exit()
  })

//logiken för att starta vår server på en port (3000 är default, men samma som react):
application.listen(3001, () => {
  console.log('Servern är igång på port ' + 3001)
}) */