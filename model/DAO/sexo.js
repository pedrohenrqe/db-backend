const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient

// 1 listar
const selectAllSexo = async function() {

    try {

        let sql = 'SELECT * FROM tbl_sexo ORDER BY id DESC'

        console.log(sql)

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        if (rsSexo.length > 0)
            return rsSexo
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllSexo
}