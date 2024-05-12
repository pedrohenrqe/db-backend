const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllAtores = async function () {
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
        let sql = `select * from tbl_sexo where id = ${id}`

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
                foto,
                biografia,
                data_nascimento,
                id_sexo
            )values(
                '${dadosAtor.nome}',
                '${dadosAtor.foto}',
                '${dadosAtor.biografia}',
                '${dadosAtor.data_nascimento}',
                ${dadosAtor.id_sexo}
            )`
            console.log(sql);
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
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_ator limit 1'

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

module.exports = {
    selectAllAtores,
    selectSexo,
    selectBuscarAtor,
    insertAtor,
    selectLastIdAtor,
    deleteAtor    
}