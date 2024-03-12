/*************************************************************************************
* Objetivo: Criar a interação com o Banco de dados MySQL para fazer o CRUD de Filmes *
* Data: 30/01/2024                                                                   *
* Autor: Pedro                                                                       *
* Versão: 1.0                                                                        *
**************************************************************************************/
// Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// Instanciando o objeto prisa com as características do prisma client
const prisma = new PrismaClient()

// Inserir um novo filme
const insertFilme = async function (dadosFilme) {
    try {

        let sql

        if (dadosFilme.data_relancamento == null || 
            dadosFilme.data_relancamento == '' || 
            dadosFilme.data_relancamento == undefined) {
            // Script SQL para inserir no BD
            sql = `insert into tbl_filme (
            nome,
            sinopse,
            data_lancamento,
            data_relancamento,
            duracao,
            foto_capa,
            valor_unitario
        ) values (
            '${dadosFilme.nome}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.data_lancamento}',
            null,
            '${dadosFilme.duracao}',
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}'
        )`
    } else {

        // Script SQL para inserir no BD
        sql = `insert into tbl_filme (
            nome,
            sinopse,
            data_lancamento,
            data_relancamento,
            duracao,
            foto_capa,
            valor_unitario
        ) values (
            '${dadosFilme.nome}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.data_lancamento}',
            '${dadosFilme.data_relancamento}',
            '${dadosFilme.duracao}',
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}'
        )`
    }


        // Executa o script SQL no banco de dados (Devemos usar o comando execute e não o Query)
        // Comando execute deve ser utilizado para (insert, update e delete)
        let result = await prisma.$executeRawUnsafe(sql)

        // Validação para verificar se o insert funcionou no BD
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

// Atualizar um Filme existente filtrando pelo ID
const updateFilme = async function (id) {

}

// Excluir um Filme existente filtrando pelo ID
const deleteFilme = async function (id) {

}

// Listar todos os filmes existentes 
const selectAllFilmes = async function () {

    try {
        // Script SQL para listar todos os registros
        let sql = 'select * from tbl_filme order by id desc'

        // Executa o scriptSQL no BD e recebe o retorno dos daods na variável rsFilmes
        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}

// Buscar o filme existente filtrando pelo ID
const selectByIdFilme = async function (id) {
    try {
        // Realiza a busca do Filme pelo ID
        let sql = `select * from tbl_filme where id = ${id}`

        // Executa no Banco de Dados o script SQL
        let rsFilme = await prisma.$queryRawUnsafe(sql)
        return rsFilme

    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}