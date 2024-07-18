require('dotenv').config()
const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')



// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
//   }
// app.use(requestLogger)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

// app.use(morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'), '-',
//       tokens['response-time'](req, res), 'ms',
//       JSON.stringify(req.body)
//     ].join(' ')
//   }))


// app.get('/info', (request, response) => {

//     let date = new Date()

//     response.send(`
//         <div>
//             <p>Phonebook has info for 2 people</p>
//             <p>${date}</p>
//         </div>
//     `);
// })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})


app.delete('/api/persons/:id', (request, response, next) => {
  // const id = String(request.params.id)
  // book = book.filter(person => person.id !== id)

  // response.status(204).end()

  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  // console.log(request.params.id)

  // console.log(person)
  // console.log(request.body)
  // const updatedPerson = {
  //     name: request.body.name,
  //     number: request.body.number
  // }

  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new : true, runValidators: true, context: 'query' })
    .then(updatedPerson => {

      response.json(updatedPerson)
    })
    .catch(error => {
      console.log(error)
      next(error)
    })

  // console.log(updatedPerson)
  // book = book.map(p => p.id === id ? updatedPerson : p)
  // response.status(200).send(updatedPerson);
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // console.log(request.headers)

  if (!body.name) {
    return response.status(400).json({
      error: 'error missing name'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'error missing number'
    })
  }


  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))

  // book = book.concat(person)
  // response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

let PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})