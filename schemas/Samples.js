const {Schema, model} = require('mongoose') 

const Samples = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    level: String,
    budget: Number,
    responsibility: String,
    search_state: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    supports: Number, 
    votings: [{
        shortid: String,
        name: String,
        text: String,
        isAccept: Boolean
    }],
    pieces: [{
        shortid: String,
        name: String,
        title: String,
        format: String,
        url: String,
        likes: Number
    }]
})

module.exports = model('Samples', Samples)