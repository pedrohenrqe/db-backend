const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectALlDiretores = async function () {
    try {
        let sql = 'select * from tbl_diretor'

        let rsDiretor = await prisma.$queryRawUnsafe(sql) 

        if (rsDiretor) {
            return rsDiretor
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


const selectBuscarDiretor = async function (id) {
    try {
        let sql = `select * from tbl_diretor where id = ${id}`

        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        if (rsDiretor) {
            return rsDiretor
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectLastIdDiretor = async function () {
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_diretor limit 1'

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

const insertDiretor = async function (dadosDiretor) {
    try {
        let sql = ` insert into tbl_diretor(
                nome,
                foto,
                biografia,
                data_nascimento
            )values(
                '${dadosDiretor.nome}',
                '${dadosDiretor.foto}',
                '${dadosDiretor.biografia}',
                '${dadosDiretor.data_nascimento}'        
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



module.exports = {
    selectALlDiretores,
    selectBuscarDiretor,
    selectLastIdDiretor,
    insertDiretor
}