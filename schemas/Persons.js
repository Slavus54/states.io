const {Schema, model} = require('mongoose') 

const Persons = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    fullname: String,
    area: String,
    sex: String,
    age: Number,
    century: String,
    search_state: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    quotes: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        likes: Number
    }],
    facts: [{
        shortid: String,
        name: String,
        content: String,
        level: String,
        isTrue: Boolean
    }]
})

module.exports = model('Persons', Persons)