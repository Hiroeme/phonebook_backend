// import mongoose from 'mongoose'

// if (process.argv.length<3) {
//     console.log('give password as argument')
//     process.exit(1)
//   }

// // node mongo.js yourpassword Anna 040-1234556
// const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]

// const url =
// `mongodb+srv://hiroeapis:${password}@cluster0.spjyadt.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.set('strictQuery',false)
// mongoose.connect(url)

// const personScheme = new mongoose.Schema({
//     name: String,
//     number: String,
// })

// const Person = mongoose.model('Person', personScheme)


// const displayAll = () => {
//     Person.find({}).then(result => {
//         console.log("phonebook:")
//         result.forEach(person => {
//             console.log(person.name, person.number)
//         })
//         mongoose.connection.close()
//     })
// }

// const addPerson = (new_name, new_number) => {
//     const person = new Person({
//         name: new_name,
//         number: new_number,
//     })

//     person.save().then(result => {
//         console.log(`added ${person.name} ${person.number} to phonebook`)
//         mongoose.connection.close()
//     })
// }

// if (name !== undefined && number !== undefined) {
//     addPerson(name, number)
// } else {
//     displayAll()
// }
