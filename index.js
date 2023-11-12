const app = require('express')()
const {gql} = require('apollo-server-express')

const PORT = process.env.PORT || 4000

// schemas

const Profiles = require('./schemas/Profiles')
const Samples = require('./schemas/Samples')
const Persons = require('./schemas/Persons')
const Oeuvres = require('./schemas/Oeuvres')

// microservices

const {middleware, mongo_connect, apollo_start, slicer, get_id} = require('./libs/microservices')

// database url

const url = 'mongodb+srv://Slavus54:ieOUiW5CNwW5gQ5D@west-sib.4lw1a18.mongodb.net/States-IO'

// middlewares

middleware(app)
mongo_connect(url, 'MongoDB is connected...')

const typeDefs = gql`
    type Query {
        test: String!
    }
    type Cord {
        lat: Float!,
        long: Float!
    }
    input ICord {
        lat: Float!,
        long: Float!
    }
    type UserCookie {
        account_id: String!,
        username: String!,
        search_state: String!
    }
    type Media {
        label: String!,
        icon: String!,
        url: String!
    }
    type AccountComponent {
        shortid: String!,
        title: String!,
        path: String!
    }
    type Skill {
        shortid: String!,
        title: String!,
        rate: Float!
    }
    type Project {
        shortid: String!,
        label: String!,
        skill: String!,
        category: String!,
        photo_url: String!,
        likes: Float!
    }
    type Voting {
        shortid: String!,
        name: String!,
        text: String!,
        isAccept: Boolean!
    }
    type Piece {
        shortid: String!,
        name: String!,
        title: String!,
        format: String!,
        url: String!,
        likes: Float!
    }
    type Quote {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        likes: Float!
    }
    type Fact {
        shortid: String!,
        name: String!,
        content: String!,
        level: String!,
        isTrue: Boolean!
    }
    type Hero {
        id: String!,
        fullname: String!,
        format: String!
    }
    input IHero {
        id: String!,
        fullname: String!,
        format: String!
    }
    type Essay {
        shortid: String!,
        name: String!,
        text: String!,
        check_photo: String!,
        likes: Float!
    }
    type Questtion {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        level: String!,
        variants: [String]!,
        right_answer: String!
    }
    type Oeuvre {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        genre: String!,
        century: String!,
        author: String!,
        heroes: [Hero]!,
        essays: [Essay]!,
        questions: [Questtion]!
    }
    type Person {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        fullname: String!,
        area: String!,
        sex: String!,
        age: Float!,
        century: String!,
        search_state: String!,
        cords: Cord!,
        main_photo: String!,
        quotes: [Quote]!,
        facts: [Fact]!
    }
    type Sample {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        level: String!,
        budget: Float!,
        responsibility: String!,
        search_state: String!,
        cords: Cord!,
        main_photo: String!,
        supports: Float!, 
        votings: [Voting]!,
        pieces: [Piece]!
    }
    type Profile {
        account_id: String!,
        username: String!,
        password: String!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        search_state: String!,
        tax_base: Float!,
        media: [Media]!,
        skills: [Skill]!,
        projects: [Project]!,
        account_components: [AccountComponent]!
    }
    type Mutation {
        register(username: String!, password: String!, region: String!, cords: ICord!, main_photo: String!, search_state: String!) : UserCookie!
        login(password: String!) : UserCookie!
        getProfiles(username: String!) : [Profile]!
        getProfile(account_id: String!) : Profile!
        updateProfileInfo(account_id: String!, username: String!, region: String!, cords: ICord!, main_photo: String!) : String!
        secureProfile(account_id: String!, password: String!) : String!
        manageProfileMedia(account_id: String!, option: String!, label: String!, icon: String!, url: String!) : String!
        manageProfileSkill(account_id: String!, option: String!, title: String!, rate: Float!, coll_id: String!) : String!
        updateProfileState(account_id: String!, search_state: String!, tax_base: Float!) : UserCookie!
        manageProfileProject(account_id: String!, option: String!, label: String!, skill: String!, category: String!, photo_url: String!, coll_id: String!) : String!
        createSample(username: String!, id: String!, title: String!, category: String!, level: String!, budget: Float!, responsibility: String!, search_state: String!, cords: ICord!, main_photo: String!) : String!
        getSamples(username: String!) : [Sample]!
        getSample(username: String!, shortid: String!) : Sample!
        giveSampleVote(username: String!, id: String!, text: String!, isAccept: Boolean!) : String!
        manageSamplePiece(username: String!, id: String!, option: String!, title: String!, format: String!, url: String!, coll_id: String!) : String!
        updateSamplePhoto(username: String!, id: String!, main_photo: String!) : String!
        createPerson(username: String!, id: String!, fullname: String!, area: String!, sex: String!, age: Float!, century: String!, search_state: String!, cords: ICord!, main_photo: String!) : String!
        getPersons(username: String!) : [Person]!
        getPerson(username: String!, shortid: String!) : Person!
        managePersonQuote(username: String!, id: String!, option: String!, text: String!, category: String!, coll_id: String!) : String!
        updatePersonPhoto(username: String!, id: String!, main_photo: String!) : String!
        makePersonFact(username: String!, id: String!, content: String!, level: String!, isTrue: Boolean!) : String!
        subscribePerson(username: String!, id: String!) : String!   
        createOeuvre(username: String!, id: String!, title: String!, category: String!, genre: String!, century: String!, author: String!, heroes: [IHero]!) : String!
        getOeuvres(username: String!) : [Oeuvre]!
        getOeuvre(username: String!, shortid: String!) : Oeuvre!
        manageOeuvreEssay(username: String!, id: String!, option: String!, text: String!, check_photo: String!, coll_id: String!) : String!
        updateOeuvreHero(username: String!, id: String!, coll_id: String!, fullname: String!) : String!
        makeOeuvreQuestion(username: String!, id: String!, title: String!, category: String!, level: String!, variants: [String]!, right_answer: String!) : String! 
    }
`

const resolvers = {
    Query: {
        test: () => 'Hi'
    },
    Mutation: {
        register: async (_, {username, password, region, cords, main_photo, search_state}) => {
            const profile = await Profiles.findOne({username}) 
            let drop_object = {account_id: '', username: '', search_state: ''}

            if (profile === null) {

                let account_id = get_id()

                const newProfile = new Profiles({
                    account_id,
                    username,
                    password,
                    region,
                    cords,
                    main_photo,
                    search_state,
                    tax_base: 0,
                    media: [],
                    skills: [],
                    projects: [],
                    account_components: []
                })

                drop_object = {account_id, username, search_state}
            
                await newProfile.save()
            } 
        
            return drop_object
        },
        login: async (_, {password}) => {
            const profile = await Profiles.findOne({password}) 
            let drop_object = {account_id: '', username: '', search_state: ''}

            if (profile !== null) {
                drop_object = {account_id: profile.account_id, username: profile.username, search_state: profile.search_state}                
            }

            return drop_object
        },
        getProfiles: async (_, {username}) => {
            const profiles = await Profiles.find() 

            return profiles
        },
        getProfile: async (_, {account_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            
            return profile
        },
        updateProfileInfo: async (_, {account_id, username, region, cords, main_photo}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                const changed_name = await Profiles.findOne({username}) 

                if (profile.username !== username && !changed_name) {
                    profile.username = username
                }
                
                profile.region = region
                profile.cords = cords 
                profile.main_photo = main_photo

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        secureProfile: async (_, {account_id, password}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.password = password

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        manageProfileMedia: async (_, {account_id, option, label, icon, url}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
                if (option === 'create') {

                    profile.media = [...profile.media, {
                        label,
                        icon,
                        url
                    }]

                } else {

                    profile.media = profile.media.filter(el => el.label !== label)
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        manageProfileSkill: async (_, {account_id, option, title, rate, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
                if (option === 'create') {

                    let shortid = get_id()

                    profile.skills = [...profile.skills, {
                        shortid,
                        title,
                        rate
                    }]

                    profile.skills = slicer(profile.skills, 25)

                } else {

                    profile.skills = profile.skills.filter(el => el.shortid !== coll_id)
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        updateProfileState: async (_, {account_id, search_state, tax_base}) => {
            const profile = await Profiles.findOne({account_id}) 
            let drop_object = {account_id: '', username: '', search_state: ''}

            if (profile) {

                profile.search_state = search_state
                profile.tax_base = tax_base

                await Profiles.updateOne({account_id}, {$set: profile})

                drop_object = {account_id: profile.account_id, username: profile.username, search_state}
            } 

            return drop_object
        },
        manageProfileProject: async (_, {account_id, option, label, skill, category, photo_url, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
                if (option === 'create') {

                    let shortid = get_id()

                    profile.projects = [...profile.projects, {
                        shortid,
                        label,
                        skill,
                        category,
                        photo_url,
                        likes: 0
                    }]

                    profile.projects = slicer(profile.projects, 25)

                } else if (option === 'like') {

                    profile.projects.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    profile.projects = profile.projects.filter(el => el.shortid !== coll_id)
                }
   
                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        createSample: async (_, {username, id, title, category, level, budget, responsibility, search_state, cords, main_photo}) => {
            const profile = await Profiles.findOne({username, account_id: id}) 
            const sample = await Samples.findOne({username, title, category, level, budget, responsibility, search_state, cords})

            if (profile && !sample) {
                if (profile.account_components.filter(el => el.path === 'sample').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'sample'
                    }]

                    const newSample = new Samples({
                        shortid,
                        account_id: profile.account_id,
                        username,
                        title,
                        category,
                        level,
                        budget,
                        responsibility,
                        search_state,
                        cords,
                        main_photo,
                        supports: 0, 
                        votings: [],
                        pieces: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newSample.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getSamples: async (_, {username}) => {
            const samples = await Samples.find()

            return samples
        },
        getSample: async (_, {username, shortid}) => {
            const sample = await Samples.findOne({shortid})

            return sample
        },
        giveSampleVote: async (_, {username, id, text, isAccept}) => {
            const profile = await Profiles.findOne({username})
            const sample = await Samples.findOne({shortid: id})

            if (profile && sample) {

                sample.votings = [...sample.votings, {
                    shortid: profile.account_id,
                    name: profile.username,
                    text,
                    isAccept
                }]

                sample.supports = isAccept ? sample.supports + 1 : sample.supports - 1

                await Samples.updateOne({shortid: id}, {$set: sample})

                return 'Success'
            }

            return 'Error'
        },
        manageSamplePiece: async (_, {username, id, option, title, format, url, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const sample = await Samples.findOne({shortid: id})

            if (profile && sample) {
                if (option === 'create') {

                    let shortid = get_id()
                    
                    sample.pieces = [...sample.pieces, {
                        shortid,
                        name: profile.username,
                        title,
                        format,
                        url,
                        likes: 0
                    }]

                    sample.pieces = slicer(sample.pieces, 25)

                } else if (option === 'like') {

                    sample.pieces.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    sample.pieces = sample.pieces.filter(el => el.shortid !== coll_id)
                }


                await Samples.updateOne({shortid: id}, {$set: sample})

                return 'Success'
            }

            return 'Error'
        },
        updateSamplePhoto: async (_, {username, id, main_photo}) => {
            const profile = await Profiles.findOne({username})
            const sample = await Samples.findOne({shortid: id})

            if (profile && sample) {

                sample.main_photo = main_photo

                await Samples.updateOne({shortid: id}, {$set: sample})

                return 'Success'
            }

            return 'Error'
        },
        createPerson: async (_, {username, id, fullname, area, sex, age, century, search_state, cords, main_photo}) => {
            const profile = await Profiles.findOne({username, account_id: id}) 
            const person = await Persons.findOne({username, fullname, area, sex, age, century, search_state})
        
            if (profile && !person) {
                if (profile.account_components.filter(el => el.path === 'person').find(el => el.title === fullname) === undefined)  {
                
                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title: fullname,
                        path: 'person'
                    }]

                    const newPerson = new Persons({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        fullname,
                        area,
                        sex,
                        age,
                        century,
                        search_state,
                        cords,
                        main_photo,
                        quotes: [],
                        facts: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newPerson.save()
                
                    return 'Success'
                }
            }

            return 'Error'
        },
        getPersons: async (_, {username}) => {
            const persons = await Persons.find()

            return persons
        },
        getPerson: async (_, {username, shortid}) => {
            const person = await Persons.findOne({shortid})

            return person
        },
        managePersonQuote: async (_, {username, id, option, text, category, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const person = await Persons.findOne({shortid: id})

            if (profile && person) {
                if (option === 'create') {

                    let shortid = get_id()

                    person.quotes = [...person.quotes, {
                        shortid,
                        name: profile.username,
                        text,
                        category,
                        likes: 0
                    }]

                    person.quotes = slicer(person.quotes, 25)

                } else if (option === 'like') {

                    person.quotes.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    person.quotes = person.quotes.filter(el => el.shortid !== coll_id)
                }
                
                await Persons.updateOne({shortid: id}, {$set: person})

                return 'Success'
            }

            return 'Error'
        },
        updatePersonPhoto: async (_, {username, id, main_photo}) => {
            const profile = await Profiles.findOne({username})
            const person = await Persons.findOne({shortid: id})

            if (profile && person) {

                person.main_photo = main_photo

                await Persons.updateOne({shortid: id}, {$set: person})

                return 'Success'
            }

            return 'Error'
        },
        makePersonFact: async (_, {username, id, content, level, isTrue}) => {
            const profile = await Profiles.findOne({username})
            const person = await Persons.findOne({shortid: id})

            if (profile && person) {

                let shortid = get_id()

                person.facts = [...person.facts, {
                    shortid,
                    name: profile.username,
                    content,
                    level,
                    isTrue
                }]

                person.facts = slicer(person.facts, 25)

                await Persons.updateOne({shortid: id}, {$set: person})

                return 'Success'
            }

            return 'Error'
        },
        subscribePerson: async (_, {username, id}) => {
            const profile = await Profiles.findOne({username})
            const person = await Persons.findOne({shortid: id})

            if (profile && person) {

                profile.account_components = [...profile.account_components, {
                    shortid: person.shortid,
                    title: person.fullname,
                    path: 'person'
                }]

                await Profiles.updateOne({username}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        createOeuvre: async (_, {username, id, title, category, genre, century, author, heroes}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const oeuvre = await Oeuvres.findOne({username, title, category, genre, century, author})

            if (profile && !oeuvre) {
                if (profile.account_components.filter(el => el.path === 'oeuvre').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'oeuvre'
                    }]

                    const newOeuvre = new Oeuvres({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        genre,
                        century,
                        author,
                        heroes,
                        essays: [],
                        questions: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newOeuvre.save()

                    return 'Success'
                }
            } 

            return 'Error'
        },
        getOeuvres: async (_, {username}) => {
            const oeuvres = await Oeuvres.find()

            return oeuvres
        },
        getOeuvre: async (_, {username, shortid}) => {
            const oeuvre = await Oeuvres.findOne({shortid})

            return oeuvre
        },
        manageOeuvreEssay: async (_, {username, id, option, text, check_photo, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const oeuvre = await Oeuvres.findOne({shortid: id})

            if (profile && oeuvre) {
                if (option === 'create') {

                    let shortid = get_id()

                    oeuvre.essays = [...oeuvre.essays, {
                        shortid,
                        name: profile.username,
                        text,
                        check_photo,
                        likes: 0
                    }]

                    oeuvre.essays = slicer(oeuvre.essays, 25)

                } else if (option === 'like') {

                    oeuvre.essays.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    oeuvre.essays = oeuvre.essays.filter(el => el.shortid !== coll_id)
                }

                await Oeuvres.updateOne({shortid: id}, {$set: oeuvre})

                return 'Success'
            }

            return 'Error'
        },
        updateOeuvreHero: async (_, {username, id, coll_id, fullname}) => {
            const profile = await Profiles.findOne({username})
            const oeuvre = await Oeuvres.findOne({shortid: id})

            if (profile && oeuvre) {

                oeuvre.heroes.map(el => {
                    if (el.id === coll_id) {
                        el.fullname = fullname
                    }
                })

                await Oeuvres.updateOne({shortid: id}, {$set: oeuvre})

                return 'Success'
            }

            return 'Error'
        },
        makeOeuvreQuestion: async (_, {username, id, title, category, level, variants, right_answer}) => {
            const profile = await Profiles.findOne({username})
            const oeuvre = await Oeuvres.findOne({shortid: id})

            if (profile && oeuvre) {

                let shortid = get_id()

                oeuvre.questions = [...oeuvre.questions, {
                    shortid,
                    name: profile.username,
                    title,
                    category,
                    level,
                    variants,
                    right_answer
                }]

                oeuvre.questions = slicer(oeuvre.questions, 25)
                
                await Oeuvres.updateOne({shortid: id}, {$set: oeuvre})

                return 'Success'
            }

            return 'Error'
        }
       
      
        
       



      
    }
}

apollo_start(typeDefs, resolvers, app)

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))