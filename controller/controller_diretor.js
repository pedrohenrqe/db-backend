const message = require('../modulo/config.js')

const diretorDAO = require('../model/DAO/diretores.js')

const getAllDiretores = async function () {
    const diretoresJSON = {}

    let dadosDiretores = await diretorDAO.selectALlDiretores()

    if (dadosDiretores) {
        if (dadosDiretores.length > 0) { 

            diretoresJSON.diretores = dadosDiretores
            diretoresJSON.quantidade = dadosDiretores.length
            diretoresJSON.status_code = 200

            return diretoresJSON
        }
        else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }

}

const getDiretor = async function (id) {
    let idDiretor = id

    const diretorJSON = {}

    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let resultDadosDiretor = await diretorDAO.selectBuscarDiretor(idDiretor)

        if (resultDadosDiretor) {
            if (resultDadosDiretor.length > 0) {
                diretorJSON.ator = resultDadosDiretor
                diretorJSON.status_code = 200

                return diretorJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

const setInserirDiretor = async function (dadosDiretor, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let novoDiretorJSON = {} 

            if (
                dadosDiretor.nome == ''            || dadosDiretor.nome == null            || dadosDiretor.nome == undefined                  || dadosDiretor.nome.length > 80 ||
                dadosDiretor.foto == ''    || dadosDiretor.foto == null    || dadosDiretor.foto == undefined          || dadosDiretor.foto.length > 80    ||
                dadosDiretor.data_nascimento == '' || dadosDiretor.data_nascimento == null || dadosDiretor.data_nascimento == undefined       || dadosDiretor.data_nascimento.length > 10 ||
                dadosDiretor.biografia == ''       || dadosDiretor.biografia == null       || dadosDiretor.biografia == undefined             
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let novoDiretor = await diretorDAO.insertDiretor(dadosDiretor)
                let novoId = await diretorDAO.selectLastIdDiretor()

                if (novoDiretor) {
                    novoDiretorJSON.id = Number(novoId[0].id)
                    novoDiretorJSON.diretor = dadosDiretor
                    novoDiretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code //200
                    novoDiretorJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return novoDiretorJSON
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500
    }
}

module.exports = {
    getAllDiretores,
    getDiretor,
    setInserirDiretor
}