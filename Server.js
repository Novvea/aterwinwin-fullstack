import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import Middlewares from './src/middlewares/Middlewares.js'
import Configurations from './configurations/Configurations.js'
import UserRoutes from './src/routes/User.route.js'

const application = express() //wrappar hela applikationen, kan även heta app eller server
application.use(express.json()) //istället för body-Parser
application.use(cors({ credentials: true }))
application.use(helmet())
application.use(morgan('common'))

UserRoutes.routes(application)
application.use(Middlewares.notFound) //det sista som körs om den inte hittar någon matchning
application.use(Middlewares.errorHandler)

Configurations.connectToDatabase()
Configurations.connectToPort(application)

//NOTES
//ctrl + c stänger av servern

//api är som en meny därifrån vi kan beställa data beroende på vilken request
//create- skapa/post, read = get, update= put, delete

//middlewarefunktion:
//ska köras innan ett specifikt anrop tex:
/* const checkIfAdmin = (request, response, next) => {
  console.log(request.query.username)
  next()
} */

/* application.get('/recipe', (request, response) => { //tar först in en url, request: här nås data om det skickas med i anropet response: skicka tillbaka data
  response.send('Ditt API anrop gick igenom!') //vi talar om vad vi vill skicka tillbaka när anropet utförs
})

application.get('/throwdice', checkIfAdmin, (request, response) => { //.get anropas endast om någon gör ett anrop på servern
  response.send(Math.random().toString())
}) */

//stacktracesn ska aldrig synas i produktion!!!!