import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'

const application = express() //wrappar hela applikationen, kan även heta app eller server
application.use(helmet())
application.use(morgan('common'))

//api är som en meny därifrån vi kan beställa data beroende på vilken request
//create- skapa/post, read = get, update= put, delete

//middlewarefunktion:
//ska köras innan ett specifikt anrop
const checkIfAdmin = (request, response, next) => {
  console.log(request.query.username)
  next()
}

/* application.use(checkIfAdmin) */

application.get('/recipe', (request, response) => { //tar först in en url, request: här nås data om det skickas med i anropet response: skicka tillbaka data
  response.send('Ditt API anrop gick igenom!') //vi talar om vad vi vill skicka tillbaka när anropet utförs
})

application.get('/throwdice', checkIfAdmin, (request, response) => {
  response.send(Math.random().toString())
})

mongoose.connect('mongodb://localhost/namndb', //namndb blir namnet på databasen som den ska koppla upp sig på, om ej hittar så skapas en sådan databas
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('SUCCESSFYLLY CONNECTED TO DATABASE'))
  .catch((error) => {
    console.log('ERROR WHILE TRYING TO CONNECT TO DATABASE ' + error)
    process.exit()
  })

//logiken för att starta vår server på en port (3000 är default, men samma som react):
application.listen(3001, () => {
  console.log('Servern är igång på port ' + 3001)
})

//ctrl + c stänger av servern