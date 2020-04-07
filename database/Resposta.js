const Sequelize = require("sequelize")
const connection = require("./database")

const Respostas = connection.define('respostas', {
    corpo:{
        type: Sequelize.TEXT,//texto curto
        allowNull: false // mesmo que NOT NULL
    },
    //relacionamento entre tabelas
    perguntaId:{
        type: Sequelize.INTEGER, 
        allowNull: false

    }
})
//Criando a tabela caso a tabela não exista. deve ser usado somente uma vez
Respostas.sync({force:false}).then(() =>{
    console.log("Tabela Criada com Sucesso!")
})

module.exports = Respostas;