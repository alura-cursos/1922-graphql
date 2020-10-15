const matriculaSchema = require('./schema/matricula.graphql')
const matriculaResolvers = require('./resolvers/matriculaResolvers')
const MatriculasAPI = require('./datasource/matricula')

module.exports = {
  matriculaSchema,
  matriculaResolvers,
  MatriculasAPI
}