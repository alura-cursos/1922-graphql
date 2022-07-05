// https://www.apollographql.com/blog/backend/data-sources/a-deep-dive-on-apollo-data-sources/
const path = require('path')


const {ApolloServer} = require('apollo-server')
const { mergeTypeDefs } = require('graphql-tools')

const  { userSchema, userResolvers, UsersAPI } =  require('./user' )
const  { turmaSchema, turmaResolvers, TurmasAPI } =  require('./turma' )
const  { matriculaSchema, matriculaResolvers, MatriculasAPI } =  require('./matricula' )

const typeDefs = mergeTypeDefs([userSchema, turmaSchema, matriculaSchema])
const resolvers = [userResolvers, turmaResolvers, matriculaResolvers]

const dataSources =  () =>{
  return {
    usersAPI: new UsersAPI(),
    turmasAPI: new TurmasAPI(),
    matriculasAPI : new MatriculasAPI()
  }
}

const server = new ApolloServer( {typeDefs, resolvers, dataSources}
  ,{resolverValidationOptions: {requireResolversForResolveType: false}}
)
 
server.listen(({port:4001})).then( ({port}) => {
  console.log('')
  console.log(`Server rodando na porta ${port}`)
})