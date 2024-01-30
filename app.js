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

app.get('/ACME filmes/filmes', async(request, response, next) => {

    response.json(functions.listarFilmes())
    response.status(200)
})

app.listen('8080', function(){
    console.log('teste')
})