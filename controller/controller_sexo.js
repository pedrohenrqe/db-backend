const { application } = require('express')       
const sexoDAO = require('../model/DAO/sexo.js')
const message = require('../modulo/config.js')

// 1 Listar
const getListarSexo = async function() {

    try {

        let dadosSexo = await sexoDAO.selectAllSexo()

        let sexoJSON = {}

        if (dadosSexo) {

            if (dadosSexo.length > 0) {
                sexoJSON.nome = dadosSexo
                sexoJSON.nome = dadosSexo.length
                sexoJSON.status_code = 200
                return sexoJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_API
    }
}

module.exports = {
    getListarSexo
}