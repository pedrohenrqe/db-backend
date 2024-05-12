/****************************************************
 * Autor: Pedro Barbosa
 * Objetivo: Projeto Empresa – “Filmes Online Acme”
 * Data: 25/01/2024
 * Versão:1.0
 ****************************************************/

var filmes = require('../modulo/filmes.js')
const filmesJson = filmes.filmes

const getFilmes = function(){
    
    let arrayLocal = []
    let JSonLocal ={}

    filmesJson.filmes.forEach(function(movies){
        let filmesLocal = {}
        filmesLocal.nome = movies.nome
        filmesLocal.data_lancamento = movies.data_lancamento
        filmesLocal.data_relancamento = movies.data_relancamento
        filmesLocal.duracao = movies.duracao
        filmesLocal.sinopse = movies.sinopse
        filmesLocal.valor_unitario = movies.valor_unitario

        arrayLocal.push(filmesLocal)
        JSonLocal.filmes = arrayLocal
    })
    
    return(JSonLocal)
}

const getFilmesId = function(id){
    let status = false
    let filmeFiltrado = {}
    let arrayLocal = []
    let infoFilme = {}
    let idRecebido = id
    
    filmesJson.filmes.forEach(function(idFilme){
        
        
        
        if(idFilme.id == idRecebido  ){
            infoFilme = {
            IdFilme:idFilme.nome,
            Lancamento :idFilme.data_lancamento,
            Relancamento:idFilme.data_relancamento,
            duracao :idFilme.duracao,
            sinopse : idFilme.sinopse,
            valor_unitario : idFilme.valor_unitario
         }

        arrayLocal.push(infoFilme)
            status = true
        }

        
    })
    filmeFiltrado.filmes = arrayLocal

    if(status){
        return filmeFiltrado
        
    }else{
        return false
    }
}

console.log(getFilmesId(2))
module.exports = {
    getFilmes,
    getFilmesId
}