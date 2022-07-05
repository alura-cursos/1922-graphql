
const {GraphQLScalarType} = require ('graphql')

const userResolvers = {
  
  RolesType: {
    ESTUDANTE: "ESTUDANTE",
    DOCENTE: "DOCENTE",
    COORDENACAO: "COORDENACAO",
    MONITOR: "MONITOR"
  },

  DateTime: new GraphQLScalarType({ 
    name: 'DateTime',
    description: 'string datetime formato iso-8601',
    serialize:(value) => value,
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value)
  }),

  respostaCustom: {
    __resolveType(obj, context, info) { 
      return false
    },
  },

  Query: {
    users: (root, args, {dataSources}, info ) =>  { 
      return dataSources.usersAPI.getUsers(args)
    },
    
    user: (root, {id}, {dataSources}, info ) => {
      return dataSources.usersAPI.getUserById(id)
    },

    userByName: (root, {userName}, {dataSources}, info) => {
      return dataSources.usersAPI.getUserByName(userName)
    }
    
  }, 

  Mutation:{
    user_add: (root, {user}, {dataSources}) => {
      console.log(user)
      return dataSources.usersAPI.user_add(user)
    }, 

    user_upd: (root, user, {dataSources}) => {
      return dataSources.usersAPI.user_upd(user)
    },
    
    user_del: (root, user_del, {dataSources}) => {
      return dataSources.usersAPI.user_del(user_del.id)
    }
  },

  User: {

    matriculas: (parent, _, {dataSources}) => dataSources.matriculasAPI.getMatriculasByAluno.load(parent.id)    

  }


}


module.exports = userResolvers