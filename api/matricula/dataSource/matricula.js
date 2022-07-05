
const { SQLDataSource } = require('datasource-sql')
const DataLoader = require('dataloader')

const dbConfig = require('../../sqlite-config.js')

class MatriculasAPI extends SQLDataSource {
  constructor(){
    
    super(dbConfig)

    this.respostaPadrao = {
      code:0,
      mensagem:"ok"
    }
  }  

  async matricularEstudante(ids){
    const novaMatricula = {
      estudante_id: ids.estudante,
      turma_id:ids.turma,
      status:"confimada"
    }

    await this.db.insert(novaMatricula).into('matriculas')

    this.respostaPadrao.mensagem = "confirmada"

    return this.respostaPadrao
  }

  async getMatriculasPorTurma(idTurma) {
    const matriculas = await this.db
      .select('*')
      .from('matriculas')
      .where({ turma_id: idTurma})

      return matriculas
  }

  async matricula_del(id){
    await this.db('matriculas').where({id}).del()

    this.respostaPadrao = {mensagem : "delecao efetuada", code:201}
  
    return this.respostaPadrao
  }


  getMatriculasByAluno = new DataLoader(async ids_estudantes => {

    const matriculas = await this.db
    .select('*')
    .from('matriculas')
    .whereIn('estudante_id', ids_estudantes)
    // .select()

    return ids_estudantes.map( id => 
      matriculas.filter( matricula => matricula.estudante_id === id )
    )
    
  })

  async matricula_can(idMatricula){

     await this.db
     .update({status: "cancelado"})
     .where({id: idMatricula})
     .into('matriculas')

    this.respostaPadrao.mensagem = "matrícula cancelada"
   
    return{
      ... this.respostaPadrao,
    } 


  }



}
 
module.exports = MatriculasAPI