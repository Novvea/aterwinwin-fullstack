import dotenv from 'dotenv'

dotenv.config()
const { ENVIRONMENT } = process.env

const notFound = (request, response, next) => {
  const error = new Error('invalid URL = NOT FOUND')
  response.status(404)
  next(error) //går vidare om next används
}

const errorHandler = (error, request, response, next) => {
  const statuscode = response.statusCode === 200 ? 500 : response.statusCode
  response.status(statuscode) // här svarar vi antagligen 500 eller 404
  response.json({
    statuscode: statuscode,
    message: error.message, //talar om vad som gick fel
    stackTrace: ENVIRONMENT === 'PRODUCTION' ? null : error.stack //visar endast stacktrace när vi är i developmentmode
  })
}

export default {
  notFound,
  errorHandler
}