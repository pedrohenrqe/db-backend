/*************************************************************************************
* Objetivo: Arquivo para realizar as resquisições de filmes                          *
* Data: 30/01/2024                                                                   *
* Autor: Pedro                                                                       *
* Versão: 1.0                                                                        *
**************************************************************************************/

/************************************************************************************* 
* Para realizar a conexão com o Banco de dados precisamos utilizar uma dependencia:
*       - SEQUELIZE ORM
*       - PRISMA ORM
*       - FASTFY ORM
* Prisma - para utiliza o prisma precisamos instala as seguientes dependencias:
*       npm install prisma --save
*       npm install @prisma/client --save
*
*       Após a instalação do prima, devemos rodar o comando abaixo para inicializar o prisma
*       npx prisma init
*
* 
**************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()


app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST')
    app.use(cors)

    next()

})

/******************************** Imports de arquivos e bibliotecas do Projeto *********************************/

    const controllerFilmes = require('./controller/controller_filme.js')

/***************************************************************************************************************/

//EndPoint: Retorna os dados do arquivo JSON
app.get('/AcmeFilmes/filmes', async(request, response, next) => {

    response.json(functions.listarFilmes())
    response.status(200)
})

//EndPoint: Retorna os dados do Banco de Dados
app.get('/v2/acmefilmes/filmes', cors(), async function(request, response, next){
    
    // Chama a função para retornar os dados do filme
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    // Validação para verificar se existem dados
    if (dadosFilmes){
        response.json(dadosFilmes)
        response.status(200)
    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }

})

//EndPoint: Retorna os dados do filme filtrando pelo ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){
    // Recebe o ID da requisição do Filme
    let idFilme = request.params.id
    
    // Solicita para a controller o Filme filtrando pelo ID
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.listen('8080', function(){
    console.log('teste')
})