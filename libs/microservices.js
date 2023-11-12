const mongoose = require('mongoose')
const body_parser = require('body-parser')
const shortid = require('shortid')
const {ApolloServer} = require('apollo-server-express')
const html = require('html-pdf')
const pdf_generator = require('./pdf-generator')

const common_middleware = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    
    next()
}

const middleware = (app, limit = '10mb') => {
    app.use(common_middleware)
    app.use(body_parser.urlencoded({extended: true}))
    app.use(body_parser.json({limit}))
}

const mongo_connect = async (url, label = 'MongoDB connected') => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log(label))
}

const apollo_start = async (typeDefs, resolvers, app) => {
    let server = new ApolloServer({typeDefs, resolvers})

    await server.start()
    await server.applyMiddleware({app})
}

const slicer = (arr, length, type = 'new') => {
    let diff = type === 'new' ? arr.length - length : 0

    return arr.slice(diff, type === 'new' ? arr.length : length) || []
}

const get_id = (length = 9) => {
    let result = shortid.generate().toString()

    return result.length > length ? result.slice(0, length) : result
}

const generate_pdf = async (res, filename, data, delay = 3500) => {
    let location = `${__dirname}/${filename}.pdf`

    await html.create(pdf_generator({...data}), {}).toFile(location, (err, res) => {
        if (err) {
            return new Error(err)
        }
    })

    setTimeout(() => {
        res.sendFile(location)
    }, delay)
}
 
module.exports = {
    middleware,
    mongo_connect,
    apollo_start,
    slicer,
    get_id,
    generate_pdf
}