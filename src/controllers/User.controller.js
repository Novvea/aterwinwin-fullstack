import UserModel from '../models/User.model.js'

createUser = async (request, response) => {

  const user = new UserModel({
    username: request.body.username,//ska peka på den data som skickas från servern
    password: request.body.password,
    /*     age: request.body.age */
  })

  try {
    const databaseResponse = await user.save()
    response.status(201).send(databaseResponse) //vi skickar tillbaka ett svar från servern, i detta fall att anropet gick som planerat
  } catch (error) {
    response.status(500).send({ //internal server error, servern lyckades inte handskas med det du ville, men vi nådde fram till servern
      message: 'Errro while trying to create user',
      stack: error
    })
  }
}

export default {
  createUser
}