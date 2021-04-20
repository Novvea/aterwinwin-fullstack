import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20' //osäker på var jag ska placera .Strategy
import Middlewares from './src/middlewares/Middlewares.js'
import Configurations from './configurations/Configurations.js'
import UserRoutes from './src/routes/User.route.js'
import ItemRoutes from './src/routes/Item.route.js'

const application = express() //wrappar hela applikationen, kan även heta app eller server
application.use(express.json()) //istället för body-Parser
application.use(cors({ credentials: true }))
application.use(helmet())
application.use(morgan('common'))

if (process.env.NODE_ENV === 'production') {
  application.use(express.static('client/build'))
}

//nytt från nodekursen -->
import keys from './configurations/keys.js'
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => { //now we can use this to save our user to the database
    console.log('accessToken: ', accessToken)
    console.log('refreshToken: ', refreshToken)
    console.log('profile: ', profile)
  })
)

application.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'] //what access we want to have from google
  })
)

application.get('/auth/google/callback', passport.authenticate('google'))

//<-- nytt från nodekursen 


UserRoutes.routes(application)
ItemRoutes.routes(application)
application.use(Middlewares.notFound) //det sista som körs om den inte hittar någon matchning
application.use(Middlewares.errorHandler)

Configurations.connectToDatabase()
Configurations.connectToPort(application)

export default application

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