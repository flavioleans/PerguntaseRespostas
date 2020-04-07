const Sequelize = require('sequelize')
//                                       db         usr     psw
const connection = new Sequelize('guiaperguntas','root', 'admin',{
    host: 'localhost',//endereço do banco
    dialect: 'mysql'// tipo de banco de dados
})
//exportando conexão
module.exports = connection