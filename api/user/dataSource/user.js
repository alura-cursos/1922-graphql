  const { RESTDataSource } = require('apollo-datasource-rest')

  class UserAPI extends RESTDataSource {
    constructor() {
      super()
      this.baseURL = "http://localhost:3000"
      this.respostaCustom = {
        code:200,
        mensagem: "ok"
      }
    }

    async getUsers({page = 1, limit = 0}){

      const query = limit 
      ? `/users?_page=${page}&_limit=${limit}` 
      : `/users?_page=${page}` 

      const users = await this.get(query) 

      return users.map( async(user) => {

        const role = await this.get(`/roles/${user.role}`)

        const ret = Object.assign(user, {role:{...role}} )
        
        return (ret)        
      })
    }

    async getUserById(id){
      const user = await this.get(`/users/${id}`) 
     
      const role = await this.get(`/roles/${user.role}`)

      const ret = Object.assign(user, {role:{...role}} )
        
      return (ret)        
    }

    async getUserByName(userName){
      return this.get( `/users?q=${userName}` )
    }

    async user_add(user){
      const users = await this.getUsers()

      user.id = users.length +  1

      const role = await this.get(`/roles?type=${user.role}`)

      await this.post('users', {...user, role: role[0].id})

      return ({
        ...user,
        role:role[0]
      })
    }

    async user_upd(newUser){
      
      const role = await this.get(`/roles?type=${newUser.user.role}`)
       
      await this.put(`users/${newUser.id}`, {...newUser.user, role: role[0].id} )

      newUser.user.id = newUser.id

      this.respostaCustom = {
        code: 201,
        mensagem: "pessoa criada com sucesso"
      }

      return  ({
        ...this.respostaCustom,    
        user: {
          ...newUser.user, 
          role:role[0]
        }
      })

    }

    async user_del(id){

      await this.delete(`/users/${id}`)

      return {
        ... this.respostaCustom
      }
    }



    



  }

  module.exports = UserAPI