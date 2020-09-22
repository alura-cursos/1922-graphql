const { ApolloServer } = require('apollo-server')
const { mergeTypeDefs } = require('graphql-tools')
const userSchema = require('./users/schema/userSchema.graphql')

const users = [
  {
    nome: "Ana",
    ativo: true
  },
  {
    nome: "Marcia",
    ativo: false
  }
]

const resolvers = {
  Query: {
    users: () => users
  }

}

const typeDefs = mergeTypeDefs([userSchema])

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
  console.log(`Servidor rodando na porta ${url}`)
})