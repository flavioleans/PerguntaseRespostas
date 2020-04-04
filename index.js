const express = require("express")
const app = express()
//Utilizador do html
app.set('view engine', 'ejs')

app.get("/",(req, res) => {
    res.render("index")
})

app.get("/perfil/:nome",(req, res) => {
    //adicionando as variaveis antes
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

app.listen(8080,()=>{
    console.log("Aplicação Rodando")
})
