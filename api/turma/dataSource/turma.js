const { SQLDataSource } = require('datasource-sql')

const dbConfig = require('../../sqlite-config.js')

const DataLoader = require('dataloader')

class TurmasAPI extends SQLDataSource {
  constructor() {

    super(dbConfig)

    this.respostaPadrao = {
      code: 0,
      mensagem: "ok"
    }

    this.configuracao = dbConfig
  }

  async turmas({page = 0, pageOffset = Infinity }) {

    const registroInicial = page === 0 || page === 1
    ? 0
    : (page * pageOffset) - pageOffset

    console.log(registroInicial)
    console.log(pageOffset)

    return this.db
      .select('*')
      .from('turmas')
    //  .orderBy('id')
      .offset(registroInicial)
      .limit(pageOffset)
      // .offset(pageOffset) 
  }

  async turma_nextId() {
    return await this.db('turmas').max('id as id').first()
  }

  async turma_get(index) {
    const turma = await this.db.select('*').from('turmas').where({ id: Number(index) })

    console.log('turma_get=>', turma)

    return turma[0]
  }

  async turma_add(novaTurma) {

    const id = await this.turma_nextId()

    novaTurma.id = id.id + 1

    const novaTurmaId = await this.db
      .insert(novaTurma)
      .returning('id')
      .into('turmas')

    const turmaInserida = await this.turma_get(novaTurmaId[0])
    return this.respostaPadrao
  }


  async turma_del(id) {

    await this.db('turmas')
      .where({ id })
      .del()

    this.respostaPadrao = {
      code: 200,
      mensagem: "delecao efetuada"
    }

    return this.respostaPadrao
  }


  async turma_upd(id, turma) {
    await this.db("turmas")
      .update({ ...turma })
      .where({ id })
      .then(status => {
        console.log(status)
      })

    turma.id = id

    return {
      code: 200,
      mensagem: "efetuada a atualizacao",
      turma: { ...turma }
    }
  }

  getTurmasCarregadas = new DataLoader(async idsTurmas => {
    const turmas = await this.db
      .select('*')
      .from('turmas')
      .whereIn('id', idsTurmas)


    return idsTurmas
      .map(id => turmas
        .find(turma => turma.id === id))
  })

}

module.exports = TurmasAPI