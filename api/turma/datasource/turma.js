const { SQLDataSource } = require('datasource-sql')

class TurmasAPI extends SQLDataSource {

  constructor(dbConfig) {
    super(dbConfig)
  }
}

module.exports = TurmasAPI