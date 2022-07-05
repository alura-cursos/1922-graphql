const {GraphQLScalarType} = require ('graphql')

const turmaResolvers = {
  
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'string de data e hora no formato ISO-8601',
    serialize: (value) => new Date(value).toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value).toISOString()
  }),

  Query: {
    turmas: (_, args, {dataSources}, info) => {
      return dataSources.turmasAPI.turmas(args)
    },

    turma_get: (_, {id}, {dataSources}) => {
      return dataSources.turmasAPI.turma_get(id)
    }

  },

  Mutation: {
 
    turma_add:(_, {novaTurma}, {dataSources}) => dataSources.turmasAPI.turma_add(novaTurma),
    
    turma_del:(_, {id}, {dataSources}) => dataSources.turmasAPI.turma_del(id),

    turma_upd: (_, {id, turma}, {dataSources}) => {
      return dataSources.turmasAPI.turma_upd(id, turma)
    },

    
  },

  Turma:{
    matriculas:(parent, _, {dataSources} ) => dataSources.matriculasAPI.getMatriculasPorTurma(parent.id),

    docente:(parent, _, {dataSources} ) => dataSources.usersAPI.getUserById(parent.docente_id) 

  }

}

module.exports = turmaResolvers