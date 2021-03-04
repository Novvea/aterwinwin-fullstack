import express from 'express'

const application = express() //wrappar hela applikationen, kan även heta app eller server

//api är som en meny därifrån vi kan beställa data beroende på vilken request
//create- skapa/post, read = get, update= put, delete

application.get('/recipee', (request, response) => { //tar först in en url, request: här nås data om det skickas med i anropet response: skicka tillbaka data
  response.send('Ditt API anrop gick igenom igen!') //vi talar om vad vi vill skicka tillbaka när anropet utförs
})

application.get('/recipe', (request, response) => { //tar först in en url, request: här nås data om det skickas med i anropet response: skicka tillbaka data
  response.send('Ditt API anrop gick igenom!') //vi talar om vad vi vill skicka tillbaka när anropet utförs
})

application.get('/throwdice', (request, response) => {
  response.send(Math.random().toString())
})



//logiken för att starta vår server på en port (3000 är default, men samma som react):
application.listen(3001, () => {
  console.log('Servern är igång på port ' + 3001)
})

//ctrl + c stänger av servern