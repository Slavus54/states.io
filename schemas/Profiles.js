const {Schema, model} = require('mongoose') 

const Profiles = new Schema({
    account_id: String,
    username: String,
    password: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    search_state: String,
    tax_base: Number,
    media: [{
        label: String,
        icon: String,
        url: String
    }],
    skills: [{
        shortid: String,
        title: String,
        rate: Number
    }],
    projects: [{
        shortid: String,
        label: String,
        skill: String,
        category: String,
        photo_url: String,
        likes: Number
    }],
    account_components: [{
        shortid: String,
        title: String,
        path: String
    }]
})

module.exports = model('Profiles', Profiles)