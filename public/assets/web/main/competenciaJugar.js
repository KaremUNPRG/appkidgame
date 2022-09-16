import { listarJuegos } from "../components/api/CompetenciaJugar.js";
let params = new URLSearchParams(location.search);

const buscarJuego = (tipo,codigo,competencia) => {
    if(tipo == 2){  
        $(location).attr('href',`/jugarAhorcado?id=${btoa(codigo)}&id2=${btoa(competencia)}`);  
    }  
    if(tipo == 1){
        $(location).attr('href',`jugar-memoria/${codigo}?id=${codigo}`);
        
    }
}

$(document).on('click','.jugar',function () { 
    // alert('sasas');
    var key = $(this).data('key')
    var codigo = $(this).data('id')
    var codigoCompetencia = $(this).data('competencia')
    buscarJuego(key, codigo,codigoCompetencia)
});