/*************************************************************************************
* Objetivo: Criar a interação com o Banco de dados MySQL para fazer o CRUD de Filmes *
* Data: 30/01/2024                                                                   *
* Autor: Pedro                                                                       *
* Versão: 1.0                                                                        *
**************************************************************************************/
// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instanciando o objeto prisa com as características do prisma client
const prisma = new PrismaClient()

// Inserir um novo filme
const insertFilme = async function(){

}

// Atualizar um Filme existente filtrando pelo ID
const updateFilme = async function(id){

}

// Excluir um Filme existente filtrando pelo ID
const deleteFilme = async function(id){

}

// Listar todos os filmes existentes 
const selectAllFilmes = async function(){
    
    // Script SQL para listar todos os registros
    let sql = 'select * from tbl_filme'
 
    // Executa o scriptSQL no BD e recebe o retorno dos daods na variável rsFilmes
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    // Tratamento de erro para retornar os dados ou retornar false
    if (rsFilmes.length > 0)
        return rsFilmes
    else 
        return false

}

// Buscar o filme existente filtrando pelo ID
const selectByIdFilme = async function(id){
    
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}