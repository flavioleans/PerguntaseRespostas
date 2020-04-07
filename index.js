const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")
//DATABASE
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão com banco de dados realizada com sucesso!")
    }).catch((msgErro)=>{
        console.log(msgErro)
    })

//Utilizador do html
app.set('view engine', 'ejs')
//carragando arquivos estaticos(css, imagens)
//puclic é a pasta principal onde ficarão os arquivos estaticos
app.use(express.static('public'))
//bodyparser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/",(req, res) => {
    //listando as perguntas
    Pergunta.findAll({raw: true, order: [
        ['id','DESC']
    ]}).then(perguntas =>{
        console.log(perguntas)
        res.render("index",{
            _perguntas: perguntas
        })
    })
    
})

app.get("/perguntar",(req, res) => {
    res.render("perguntar")
})

//rota salvar pergunta
app.post("/salvarPergunta",(req, res) => {
    var _titulo = req.body.titulo 
    var _descricao = req.body.descricao
    Pergunta.create({
    //  campo db- variável 
        titulo: _titulo,
        descricao: _descricao
    }).then(()=>{
        res.redirect("/")
    })
    //res.send("Formário Recebido!<br> Pergunta: <br>"+ _titulo + "<br> Descricao: <br>" + _descricao+"?") 
})

//Rota pergunta específica
app.get("/pergunta/:id",(req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where:{id: id}
    }).then(pergunta => {
       if(pergunta != undefined){ //pergunta encontrada
       //exibindo as respostas
       Resposta.findAll({
           where: {perguntaId: pergunta.id},
           order: [
               ['id','DESC']
            ]
       }).then(respostas =>{
        res.render("pergunta",{
            pergunta: pergunta,
            respostas: respostas
        }) 
       })
       
       }else{// não encontrada
            res.redirect("/")
       }
    })
    
})

//criando resposta
app.post("/responder",(req, res)=>{
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        //  campo db- variável 
            corpo: corpo,
            perguntaId: perguntaId
        }).then(()=>{
            res.redirect("/pergunta/"+ perguntaId)
        })
})


app.listen(8080,()=>{
    console.log("Aplicação Rodando")
})

/**
 * //adicionando as variaveis antes
app.get("/perfil/:nome",(req, res) => {
    
    var nome = req.params.nome
    var lang = "javascript"
    var msg = false
    res.render("principal/perfil",{
        nome: nome,
        lang: lang,
        //adicionando as variaveis depois
        empresa: "Noovi",
        inscritos: 250,
        Mensagem:  msg
    })
})

//trabalhando com forEach
app.get("/produtos", (req, res) => {
    var listaProdutos = [
        {nome: "Doritos", preco: 3.50},
        {nome: "Coca-Cola", preco: 6.50},
        {nome: "Leite", preco: 3.75},
        {nome: "Bolacha", preco: 2.00},
        {nome: "Açucar", preco: 4.80}
    ]

    res.render("principal/produtos",{
       Produtos: listaProdutos
    })
})

 * 
 * 
 * 
 * 
 * 
 * 
 */