const { GraphQLScalarType } = require('graphql')

const turmas = [
  {
    id: 1,
    descricao: "básico",
    horario: "manhã"
  },
  {
    id: 2,
    descricao: "intermediário",
    horario: "tarde"
  }
]

const turmaResolvers = {
  Query: {
    turmas: (_, __, ___) => turmas,
  }
}

module.exports = turmaResolvers