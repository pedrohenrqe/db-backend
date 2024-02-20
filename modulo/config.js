/***************************************************************************************************************
* Objetivo: Arquivo responsável pelas configurações globais de mensagens, valores e conteúdos para o projeto
* Data: 20/02/2024
* Autor: Pedro Barbosa
* Versão: 1.0
***************************************************************************************************************/

/****************** MENSAGENS DE ERRO ******************/
const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na inquisição não é válido!!!'}

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Nenhum item encontrado na requisição!!'}


module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND
}