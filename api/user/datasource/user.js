const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:4000';
  }

  async getUsers() {
    return this.get('/users');
  }
}

module.exports = UsersAPI;
