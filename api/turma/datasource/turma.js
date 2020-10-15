const { SQLDataSource } = require('datasource-sql')
 
class TurmasAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig)
  }
 
  async getTurmas() {
    return this.db
      .select('*')
      .from('turmas')  
  }

  async getTurma(id) {
    const turma = await this.db
      .select('*')
      .from('turmas')
      .where({ id: Number(id)})
    return turma[0]
  }

  async incluiTurma(novaTurma) {
    const novaTurmaId = await this.db
      .insert(novaTurma)
      .returning('id')
      .into('turmas')

    const turmaInserida = await this.getTurma(novaTurmaId[0])
    return ({ ...turmaInserida })
  }

  async atualizaTurma(novosDados) {
    await this.db
      .update({ ...novosDados.turma })
      .where({ id: Number(novosDados.id) })
      .into('turmas')

    const turmaAtualizada = await this.getTurmaById(novosDados.id)
    return ({
      ...turmaAtualizada
    })
  }

  async deletaTurma(id) {
    await this.db('turmas')
      .where({ id: id })
      .del()

    return this.Resposta
  }

}

module.exports = TurmasAPI