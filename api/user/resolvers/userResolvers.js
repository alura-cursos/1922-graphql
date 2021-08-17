const userResolvers = {
  Query: {
    users: (root, arg, { dataSources }) => dataSources.UsersAPI.getUsers(),
  },
};

module.exports = userResolvers;
