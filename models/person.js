const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MONGODB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: (val) => {
                if (!val.includes("-")) {
                    throw new Error("Number must include a hyphen (-).")
                }

                const num = val.split("-")
                
                if (!/^\d+$/.test(num[1])) {
                    throw new Error("The part after the hyphen must contain only digits.")
                }
                
                if (!(num[0].length === 2 || num[0].length === 3)) {
                    throw new Error("The part before the hyphen must be 2 or 3 digits long.")
                }

                return true
            }
        },
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)