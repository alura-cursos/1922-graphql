const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/';
  }

  async getUsers() {
    return this.get('/users');
  }

  async getUserById(id) {
    return this.get(`/users/${id}`);
  }
}

module.exports = UsersAPI;
