const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
const nunjucks = require('nunjucks')
const fetch = require('node-fetch')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { sortBy, split, zipObject } = require('lodash')
const { createApolloFetch } = require('apollo-fetch')
const compression = require('compression')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.common.js')
const compiler = webpack(config)
const fs = require('fs') //using it in http2 push files
const asyncHandler = require('express-async-handler')

// Initialize the app
const app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'))

nunjucks.configure('./views', {
  express: app,
  autoescape: false,
  noCache: false,
  watch: true
});
app.set('view engine', 'njk')

//middleware
//json parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//compress files
app.use(compression())
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))
//logging
app.use(logger('dev'))
//public path
app.use('/static', express.static(path.join(__dirname, 'public')))

// GraphQl stuff
// schema imports
import typeDefs from './api/typeDefinitions'
import resolvers from './api/resolvers'
// The schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ 
  schema,
  context: {},
  tracing: true,
  cacheControl: true 
}))
// GraphiQL, visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

//http2 - push styles //TODO figure out why res.push needs to go here, after graphql stuff
const filesToPush = [
  'public/global.css',
  'public/users.css',
  'public/user.css'
];

filesToPush.forEach(element => {
  const f = fs.readFileSync(element)
  const fName = split(element, '/')
  const pushFiles = function (req, res, next) {
    var stream = res.push(`/static/${fName[1]}`, {
      status: 200, // optional
      method: 'GET', // optional
      request: {
        accept: '*/*'
      },
      response: {
        'content-type': 'text/css'
      }
    })
    stream.on('error', function (e) {
      console.log(e);
    })
    stream.end(f)
    next()
  }
  app.use(pushFiles)
})

//routes
import { getUserData, getUserById } from './api/graphqlRouter'

app.get('/', asyncHandler(async (req, res, next) => {
  const allUsers = await getUserData()
  res.render('index', {
    users: allUsers.users
  })
}))

app.get('/user/:id/', asyncHandler(async (req, res, next) => {
  const userById = await getUserById(req.params.id)
  res.render('user', {
    user: userById.user
  })
}))

export default app