/*************************************************************************************
* Objetivo: Arquivo para realizar as resquisições de filmes                          *
* Data: 30/01/2024                                                                   *
* Autor: Pedro Barbosa                                                                      *
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
*       Após a instalação do prisma, devemos rodar o comando abaixo para inicializar o prisma
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
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())

    next()

})

// Cria um objeto do tipo JSON para receber os dados via Body nas requisições POST ou PUT
const bodyParserJSON = bodyParser.json()

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


app.get('/v2/acmeFilmes/atores', cors(), async function(request, response){
    let resultDadosAtores = await controllerAtores.getAllAtores()

    response.status(resultDadosAtores.status_code)
    response.json(resultDadosAtores)
})

//endpoint que busca um ator filtrando pelo id
app.get('/v2/acmeFilmes/ator/:id', cors(), async function(request, response){
    let idAtor = request.params.id

    let resultDadosAtor = await controllerAtores.getAtor(idAtor)

    response.status(resultDadosAtor.status_code)
    response.json(resultDadosAtor)
})

//endpoint que cadastra um ator no banco de dados
app.post('/v2/acmeFilmes/ator', cors(), bodyParserJSON, async function(request, response){
    const contentType = request.header('content-type')

    const dadosAtor = request.body

    let resultDadosAtor = await controllerAtores.setInserirAtor(dadosAtor, contentType)

    response.status(resultDadosAtor.status_code)
    response.json(resultDadosAtor)
})

//endpoint que deleta um ator do banco de dados
app.delete('/v2/acmeFilmes/ator/:id', cors(), async function(request, response){
    let idAtor = request.params.id

    let resultDadosAtor = await controllerAtores.setDeletarAtor(idAtor)

    response.status(resultDadosAtor.status_code)
    response.json(resultDadosAtor.message)
})

//endpoint que atualiza um filme do banco de dados
app.put('/v2/acmeFilmes/ator/:id', cors(), bodyParserJSON, async function(request, response){
    let idAtor = request.params.id
    const novosDados = request.body
    const contentType = request.header('content-type')

    let resultDadosAtor = await controllerAtores.setupdateAtor(idAtor, novosDados, contentType)

    response.status(resultDadosAtor.status_code)
    response.json(resultDadosAtor)

})

//endpoint que retorna todos os gêneros do banco de dados
app.get('/v2/acmeFilmes/generos', cors(), async function(request, response){
    //requisição do app para retornar todos os gêneros
    let resultDadosGeneros = await controllerGenero.getListarALlGeneros()

    response.status(resultDadosGeneros.status_code)
    response.json(resultDadosGeneros)
})

//endpoint que retorna um gênero filtrando pelo id
app.get('/v2/acmeFilmes/genero/:id', cors(), async function(request, response){
    let idGenero = request.params.id

    let resultDadosGenero = await controllerGenero.getBuscarGenero(idGenero)

    response.status(resultDadosGenero.status_code)
    response.json(resultDadosGenero)
})

//endpoint que cadstra um gênero no banco de dados
app.post('/v2/acmeFilmes/genero', cors(), bodyParserJSON, async function(request, response){
    const contentType = request.header('content-type')

    const dadosGenero = request.body

    let resultDadosGenero = await controllerGenero.setCadastrarGenero(dadosGenero, contentType)

    response.status(resultDadosGenero.status_code)
    response.json(resultDadosGenero)
})

//endpoint que deleta um filme do banco de dados filtrando pelo id
app.delete('/v2/acmeFilmes/genero/:id', cors(), async function(request, response){
    let generoId = request.params.id

    let resultDadosGenero = await controllerGenero.setDeletarGenero(generoId)

    response.status(resultDadosGenero.status_code)
    response.json(resultDadosGenero.message)
})

//endpoint que atualiza um filme do banco de dados filtrando pelo id
app.put('/v2/acmeFilmes/genero/:id', cors(), bodyParserJSON, async function(request, response){
    let generoId = request.params.id
    const contentType = request.header('content-type')
    const dadosGenero = request.body

    let resultDadosGenero = await controllerGenero.setAtualizarGenero(generoId, dadosGenero, contentType)

    response.status(resultDadosGenero.status_code)
    response.json(resultDadosGenero)
})

//endpoint que retorna todos os gêneros do banco de dados
app.get('/v2/acmeFilmes/generos', cors(), async function(request, response){
    //requisição do app para retornar todos os gêneros
    let resultDadosGeneros = await controllerGenero.getListarALlGeneros()

    response.status(resultDadosGeneros.status_code)
    response.json(resultDadosGeneros)
})

//endpoint que retorna um gênero filtrando pelo id
app.get('/v2/acmeFilmes/genero/:id', cors(), async function(request, response){
    let idGenero = request.params.id

    let resultDadosGenero = await controllerGenero.getBuscarGenero(idGenero)

    response.status(resultDadosGenero.status_code)
    response.json(resultDadosGenero)
})

//endpoint que cadstra um gênero no banco de dados
app.post('/v2/acmeFilmes/genero', cors(), bodyParserJSON, async function(request, response){
    const contentType = request.header('content-type')

    const dadosGenero = request.body

    let resultDadosGenero = await controllerGenero.setCadastrarGenero(dadosGenero, contentType)

    response.status(resultDadosGenero.status_code)
    response.json(resultDadosGenero)
})

//endpoint que deleta um filme do banco de dados filtrando pelo id
app.delete('/v2/acmeFilmes/genero/:id', cors(), async function(request, response){
    let generoId = request.params.id

    let resultDadosGenero = await controllerGenero.setDeletarGenero(generoId)

    response.status(resultDadosGenero.status_code)
    response.json(resultDadosGenero.message)
})

//endpoint que atualiza um filme do banco de dados filtrando pelo id
app.put('/v2/acmeFilmes/genero/:id', cors(), bodyParserJSON, async function(request, response){
    let generoId = request.params.id
    const contentType = request.header('content-type')
    const dadosGenero = request.body

    let resultDadosGenero = await controllerGenero.setAtualizarGenero(generoId, dadosGenero, contentType)

    response.status(resultDadosGenero.status_code)
    response.json(resultDadosGenero)
})

//endpoint que retorna todas as classificações do banco de dados
app.get('/v2/acmeFilmes/classificacoes', cors(), async function(request, response){
    //arquivo que aciona a controller para realizar a requisição
    let dadosClassificacacoes = await controllerClassificacao.getAllClassificacoes()

    response.status(dadosClassificacacoes.status_code)
    response.json(dadosClassificacacoes)
})

//endpoint que busca a classificacao filtrando pelo id
app.get('/v2/acmeFilmes/classificacao/:id', cors(), async function(request, response){
    let idClassificacao = request.params.id
   
    //arquivo que aciona a controller para realizar a requisição
    let dadosClassificacacao = await controllerClassificacao.getBuscarClassificacao(idClassificacao)

    response.status(dadosClassificacacao.status_code)
    response.json(dadosClassificacacao)
})

//endpoint que cadastra uma nova classificação no banco de dados
app.post('/v2/acmeFilmes/classificacao', cors(), bodyParserJSON, async function(request, response){
    //variável que vai realizar o tratamento do tipo do body
    const contentType = request.header('content-type')

    //variável que recebe os dados do Json do body
    let dadosBody = request.body

    //variável que vai realizar a requisição
    let resultDadosClassificacao = await controllerClassificacao.setInserirNovaClassificacao(dadosBody, contentType)

    //return da requisição
    response.status(resultDadosClassificacao.status_code)
    response.json(resultDadosClassificacao)
})

//endpoint que deleta uma classificação do banco de dados
app.delete('/v2/acmeFilmes/classificacao/:id', cors(), async function(request, response){
    //variável local que recebe id da requisição
    let id = request.params.id
    //variável que realiza a requisição
    let dadosClassificacacao = await controllerClassificacao.setDeletarClassificacao(id)

    response.status(dadosClassificacacao.status_code)
    response.json(dadosClassificacacao.message)
})
