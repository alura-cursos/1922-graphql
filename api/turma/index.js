const turmaSchema = require('./schema/turma.graphql')
const turmaResolvers = require('./resolvers/turmaResolvers.js')
const TurmasAPI = require('./dataSource/turma.js')


module.exports = {
  turmaSchema,
  turmaResolvers,
  TurmasAPI
}
