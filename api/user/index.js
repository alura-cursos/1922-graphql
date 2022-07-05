const userSchema = require('./schema/user.graphql')
const userResolvers = require('./resolvers/userResolvers.js')
const UsersAPI = require('./dataSource/user.js')


module.exports = {
  userSchema,
  userResolvers,
  UsersAPI
}
