const userResolvers = {
  Query: {
    users: (root, arg, { dataSources }) => dataSources.usersAPI.getUsers(),
    user: (root, { id }, { dataSources }) =>
      dataSources.usersAPI.getUserById(id),
  },
};

module.exports = userResolvers;
