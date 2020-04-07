const Sequelize = require("sequelize")
const connection = require("./database")
//                                 nome tabela a ser criada
const Pergunta = connection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING,//texto curto
        allowNull: false // mesmo que NOT NULL
    },
    descricao:{
        type: Sequelize.TEXT, //texto longo
        allowNull: false

    }
})
//Criando a tabela caso a tabela não exista. deve ser usado somente uma vez
Pergunta.sync({force:false}).then(() =>{
    console.log("Tabela Criada com Sucesso!")
})

module.exports = Pergunta;
