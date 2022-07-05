  const { RESTDataSource } = require('apollo-datasource-rest')

  class ProductAPI extends RESTDataSource {
    constructor() {
      super()
      this.baseURL = "http://localhost:3000"
    }

    async getProducts(){
      return this.get("/products") 
    }

  }

  module.exports = ProductAPI