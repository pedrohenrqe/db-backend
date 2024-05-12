const message = require('../modulo/config.js')

const atorDAO = require('../model/DAO/atores.js')


const getAllAtores = async function () {
    const atoresJSON = {}

    let dadosAtores = await atorDAO.selectAllAtores()

    if (dadosAtores) {
        if (dadosAtores.length > 0) { 
            

            atoresJSON.atores = dadosAtores
            atoresJSON.quantidade = dadosAtores.length
            atoresJSON.status_code = 200

            return atoresJSON
        }
        else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500 
    }

}

const getAtor = async function (id) {
    let idAtor = id

    const atorJSON = {}

    if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let resultDadosAtor = await atorDAO.selectBuscarAtor(id)
        if (resultDadosAtor) {
            if (resultDadosAtor.length > 0) {
                atorJSON.ator = resultDadosAtor
                atorJSON.status_code = 200

                return atorJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

const setInserirAtor = async function (dadosAtor, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let novoAtorJSON = {} 

            if (
                dadosAtor.nome == '' || dadosAtor.nome == null || dadosAtor.nome == undefined || dadosAtor.nome.length > 80 ||
                dadosAtor.foto == '' || dadosAtor.foto == null || dadosAtor.foto == undefined || dadosAtor.foto.length > 80 ||
                dadosAtor.biografia == '' || dadosAtor.biografia == null || dadosAtor.biografia == undefined ||
                dadosAtor.id_sexo == '' || dadosAtor.id_sexo == null || dadosAtor.id_sexo == undefined || isNaN(dadosAtor.id_sexo) 
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let novoAtor = await atorDAO.insertAtor(dadosAtor)
                let novoId = await atorDAO.selectLastIdAtor()
                let sexoAtor = await atorDAO.selectSexo(dadosAtor.id_sexo)

                console.log(novoAtor);

                if (novoAtor) {
                    novoAtorJSON.id = Number(novoId[0].id)
                    novoAtorJSON.ator = dadosAtor
                    novoAtorJSON.sexo = sexoAtor[0].sexo
                    novoAtorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code //200
                    novoAtorJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return novoAtorJSON
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

const setDeletarAtor = async function (id) {
    let idAtor = id

    let validarId = await atorDAO.selectBuscarAtor(idAtor)

    if (validarId.length > 0) {
        if (idAtor == '' || idAtor == null || idAtor == undefined) {
            return message.ERROR_INVALID_ID //400
        } else {
            let dadosAtor = await atorDAO.deleteAtor(idAtor)

            if (dadosAtor) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }
    } else {
        return message.ERROR_NOT_FOUND //404
    }
}

const setupdateAtor = async function(id, dadosAtor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            let idLocal = id

            const validarId = await atorDAO.selectBuscarAtor(idLocal)
            if(validarId.length > 0){
                let atorAtualizadoJSON = {}

                if(
                    dadosAtor.nome == ''      || dadosAtor.nome == null      || dadosAtor.nome == undefined      || dadosAtor.nome.length > 80      ||
                    dadosAtor.foto == '' || dadosAtor.foto == null || dadosAtor.foto == undefined || dadosAtor.foto.length > 80 ||
                    dadosAtor.biografia == '' || dadosAtor.biografia == null || dadosAtor.biografia == undefined ||
                    dadosAtor.id_sexo == ''  || dadosAtor.id_sexo == null  || isNaN(dadosAtor.id_sexo)        
                 ){
                    return message.ERROR_REQUIRED_FIELDS //400
                 }
                 else{
                    dadosAtor.id = Number(idLocal)
                    let atualizarAtor = await atorDAO.updateAtor(dadosAtor)
                    let sexoAtor = await atorDAO.selectSexo(dadosAtor.id_sexo)

                    if(atualizarAtor){
                        atorAtualizadoJSON.ator = dadosAtor
                        atorAtualizadoJSON.sexo = sexoAtor[0].sexo
                        atorAtualizadoJSON.status = message.SUCCESS_UPDATED_ITEM
                        atorAtualizadoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        atorAtualizadoJSON.message = message.SUCCESS_UPDATED_ITEM.message

                        return atorAtualizadoJSON
                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                 }
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500
    }
}
module.exports = {
    getAllAtores,
    getAtor,
    setInserirAtor,
    setDeletarAtor,
    setupdateAtor    
}