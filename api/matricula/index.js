const matriculaSchema = require('./schema/matricula.graphql')
const matriculaResolvers = require('./resolvers/matriculaResolvers.js')
const MatriculasAPI = require('./dataSource/matricula.js')

module.exports = {
  matriculaSchema,
  matriculaResolvers,
  MatriculasAPI
}
