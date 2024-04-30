/********************************************************************************************************************************************
* Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, CRUD tabela de atores *
* Data: 30/01/2024                                                                                                                          *
* Autor: Pedro Barbosa                                                                                                                      *
* Versão: 1.0                                                                                                                               *
*********************************************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const filmesDao = require('./filme.js')

const selectALlAtores = async function () {
    try {
        let sql = 'select * from tbl_ator'

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        if (rsAtor) {
            return rsAtor
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectBuscarAtor = async function (id) {
    try {
        let sql = `select * from tbl_ator where id = ${id}`

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        if (rsAtor) {
            return rsAtor
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectSexo = async function (id) {
    try {
        let sql = `select * from tbl_sexoA where id = ${id}`

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        if (rsSexo) {
            return rsSexo
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const insertAtor = async function (dadosAtor) {
    try {
        let sql = ` insert into tbl_ator(
                nome,
                foto_ator,
                biografia,
                id_sexoA
            )values(
                '${dadosAtor.nome}',
                '${dadosAtor.foto_ator}',
                '${dadosAtor.biografia}',
                ${dadosAtor.id_sexoA}
            )`
        let rsAtor = await prisma.$executeRawUnsafe(sql)

        if (rsAtor) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectLastIdAtor = async function () {
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_classificacao limit 1'

        let resultId = await prisma.$queryRawUnsafe(sql)

        if (resultId) {
            return resultId
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteAtor = async function (id) {
    try {
        let sql = `delete from tbl_ator where id = ${id}`

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        if (rsAtor) {
            return rsAtor
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const updateAtor = async function(dadosAtor){
    try {
        let sql = 
        
        ` update tbl_ator
                      set
                      nome = '${dadosAtor.nome}',
                      foto_ator = '${dadosAtor.foto_ator}',
                      biografia = '${dadosAtor.biografia}',
                      id_sexoA = ${dadosAtor.id_sexoA}

                      where id = ${dadosAtor.id}
        `
        let rsAtor = prisma.$executeRawUnsafe(sql)

        if(rsAtor){
            return rsAtor
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const selectNacionalidadeAtor = async function(idAtor){
    try {
        let sql = `select * from tbl_nacionalidadeAator where id_ator = ${idAtor}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        if(rsNacionalidade){
            let sqlNacionalidade = `select * from tbl_nacionalidadeA where id = ${rsNacionalidade[0].id_nacionalidadeA}`

            let rsFinal = await prisma.$queryRawUnsafe(sqlNacionalidade)

            if(rsFinal){
                return rsFinal
            }else{
                return false
            }
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectFilmesAtor = async function(idAtor){
    try {
        let sql = `select * from tbl_ator_filme where id_ator = ${idAtor}`

        let rsFilmeA = await prisma.$queryRawUnsafe(sql)

        if(rsFilmeA){
            let rsFilme = await filmesDao.selectByIdFilme(Number(rsFilmeA[0].id_filme))

            if(rsFilme){
                return rsFilme
            }else{
                return false
            }

        }else{
            return false
        }
    } catch (error) {
        return false
    }
}
module.exports = {
    selectALlAtores,
    selectSexo,
    selectBuscarAtor,
    insertAtor,
    selectLastIdAtor,
    deleteAtor,
    updateAtor,
    selectNacionalidadeAtor,
    selectFilmesAtor
}