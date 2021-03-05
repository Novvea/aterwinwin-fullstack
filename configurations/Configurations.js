import mongoose from 'mongoose'

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost/namndb', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) //namndb blir namnet på databasen som den ska koppla upp sig på, om ej hittar så skapas en sådan databas
    console.log('SUCCESSFULLT CONNECTED TO DATABASE...')
  } catch (error) {
    console.log('ERROR OCCURED WHILE TRYING TO CONNECT TO THE DATABASE')
    process.exit()
  }
}

const connectToPort = (application) => {
  application.listen(3001, () => {
    console.log('SERVER IS RUNNING ON PORT ' + 3001)
  })
}

export default {
  connectToDatabase,
  connectToPort
}


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