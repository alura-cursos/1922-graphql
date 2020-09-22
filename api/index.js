const { ApolloServer, gql } = require('apollo-server')

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

const typeDefs = gql `
  type User {
    nome: String!
    ativo: Boolean!
    email: String
  }

  type Query {
    users: [User]
  }

`

const resolvers = {
  Query: {
    users: () => users
  }

}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
  console.log(`Servidor rodando na porta ${url}`)
})