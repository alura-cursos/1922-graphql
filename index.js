const {ApolloServer, gql} = require('apollo-server')
const users = [{
    nome: 'Ana',
    ativo: true,
},
{
    nome: 'Márcia',
    ativo: false
}
]
const typeDefs = gql `
type User {
    nome: String!
    ativo: Boolean!
    email: String
}
`


const server = new ApolloServer({ typeDefs, resolvers})

