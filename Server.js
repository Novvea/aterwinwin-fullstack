import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import cookieSession from 'cookie-session'
import passport from 'passport'
import Middlewares from './src/middlewares/Middlewares.js'
import Configurations from './configurations/Configurations.js'
import AuthRoutes from './src/routes/Auth.route.js'
import UserRoutes from './src/routes/User.route.js'
import ItemRoutes from './src/routes/Item.route.js'
import keys from './configurations/keys.js'
import './src/services/Passport.js' //does not work without this line

//mongoose.connect ligger i Configurations.js

const application = express() //wrappar hela applikationen, kan även heta app eller server
application.use(express.json()) //istället för body-Parser
application.use(cors({ credentials: true }))
application.use(helmet())
application.use(morgan('common'))

application.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, //=30 days
  keys: [keys.cookieKey]
}))
application.use(passport.initialize())
application.use(passport.session())


AuthRoutes.routes(application)
UserRoutes.routes(application)
ItemRoutes.routes(application)
application.use(Middlewares.notFound) //det sista som körs om den inte hittar någon matchning
application.use(Middlewares.errorHandler)

Configurations.connectToDatabase()
Configurations.connectToPort(application)

export default application
