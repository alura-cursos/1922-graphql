const userResolvers = {
  Query: {
    users: (root, args, { dataSources }) => dataSources.usersAPI.getUsers(),
    user: (root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
  },
  Mutation: {
    adicionaUser: async (root, user, { dataSources }) => dataSources.usersAPI.adicionaUser(user),
  } 
}

module.exports = userResolvers