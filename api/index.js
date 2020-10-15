const { ApolloServer } = require('apollo-server')
const { mergeTypeDefs } = require('graphql-tools')
const path = require('path')

const {UsersAPI, userResolvers, userSchema} = require('./user')
const {TurmasAPI, turmaResolvers, turmaSchema} = require('./turma')
const {MatriculasAPI, matriculaResolvers, matriculaSchema} = require('./matricula')

const typeDefs = mergeTypeDefs([userSchema, turmaSchema, matriculaSchema])
const resolvers = [userResolvers, turmaResolvers, matriculaResolvers]

const dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, './data/database.db')
  },
  useNullAsDefault: true
}

const dataSources = () => ({
  usersAPI: new UsersAPI(),
  turmasAPI: new TurmasAPI(dbConfig),
  matriculasAPI: new MatriculasAPI(dbConfig)
})

const server = new ApolloServer( { 
  typeDefs,
  resolvers,
  dataSources,
})

server.listen().then(({url}) => {
  console.log(`Servidor rodando na porta ${url}`)
})