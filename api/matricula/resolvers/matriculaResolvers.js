const {GraphQLScalarType} = require ('graphql')

const matriculaResolvers = {

  DateTime: new GraphQLScalarType({ 
    name: 'DateTime',
    description: 'string datetime formato iso-8601',
    serialize:(value) => value,
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value)
  }),
  
  Mutation:{ 
    matricularEstudante:(_, ids, {dataSources}) => dataSources.matriculasAPI.matricularEstudante(ids),

    matricula_del:(_, {id}, {dataSources}) => dataSources.matriculasAPI.matricula_del(id),

    matricula_can:(_, {idMatricula}, {dataSources}) => dataSources.matriculasAPI.matricula_can(idMatricula)

  },

  Matricula:{
    estudante: (parent, _, {dataSources}) =>{
      return dataSources.usersAPI.getUserById(parent.estudante_id)
    },   

    turma:(parent, _, {dataSources}) => {
      console.log('turmaid', parent.turma_id)
      return dataSources.turmasAPI.getTurmasCarregadas.load(parent.turma_id)
    } 
  }

}

module.exports = matriculaResolvers