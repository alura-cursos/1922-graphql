const turmaSchema = require('./schema/turma.graphql')
const turmaResolvers = require('./resolvers/turmaResolvers')
const TurmasAPI = require('./datasource/turma')

module.exports = {
  turmaSchema,
  turmaResolvers,
  TurmasAPI
}