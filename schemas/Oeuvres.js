const {Schema, model} = require('mongoose') 

const Oeuvres = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    genre: String,
    century: String,
    author: String,
    heroes: [{
        id: String,
        fullname: String,
        format: String
    }],
    essays: [{
        shortid: String,
        name: String,
        text: String,
        check_photo: String,
        likes: Number
    }],
    questions: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        level: String,
        variants: [String],
        right_answer: String
    }]
})

module.exports = model('Oeuvres', Oeuvres)