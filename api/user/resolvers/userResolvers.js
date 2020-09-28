const { GraphQLScalarType } = require('graphql')

const userResolvers = {
  RolesType: {
    ESTUDANTE: "ESTUDANTE",
    DOCENTE: "DOCENTE",
    COORDENACAO: "COORDENACAO"
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'string de data e hora no formato ISO-8601',
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value)
  }),
  Query: {
    users: (root, args, { dataSources }) => dataSources.usersAPI.getUsers(),
    user: (root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
  },
  Mutation: {
    adicionaUser: async (root, { user }, { dataSources }) => dataSources.usersAPI.adicionaUser(user),
    atualizaUser: async (root, novosDados, { dataSources }) => {
      console.log(novosDados)
      return dataSources.usersAPI.atualizaUser(novosDados)
    },
    deletaUser: async (root, { id }, { dataSources }) => dataSources.usersAPI.deletaUser(id)
  } 
}

module.exports = userResolvers