const { ApolloServer } = require('apollo-server')
const userSchema = require('./user/schema/user.graphql')
const userResolver = require('./user/resolvers/userResolvers')

const typeDefs = [userSchema]
const resolvers = [userResolver]

const server = new ApolloServer( { typeDefs, resolvers } )

server.listen().then(({url}) => {
  console.log(`Servidor rodando na porta ${url}`)
})