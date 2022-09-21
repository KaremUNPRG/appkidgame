import { listarJuegos,verificarClave } from "../components/api/CompetenciaJugar.js";
let params = new URLSearchParams(location.search);

const buscarJuego = (tipo,codigo,competencia) => {
    if(tipo == 2){  
        $(location).attr('href',`/jugarAhorcado?id=${btoa(codigo)}&id2=${btoa(competencia)}`);  
    }  
    if(tipo == 1){
        var win = window.open(`/jugar-memoria/${codigo}?id=${codigo}&id2=${btoa(competencia)}`, '_blank');
        // Cambiar el foco al nuevo tab (punto opcional)
        win.focus();
        // $(location).attr('href',`/jugar-memoria/${codigo}?id=${codigo}&id2=${btoa(competencia)}`);
        
    }
}

$(document).on('click','.jugar',function () { 
    var key = $(this).data('key')
    var codigo = $(this).data('id')
    var codigoCompetencia = $(this).data('competencia')
    buscarJuego(key, codigo,codigoCompetencia)
});

$('#sendClave').click(function () {  
    verificarClave({
        Competencia: $('#idCompetencia').val(),
        Clave:$('#itmClaveAcceso').val()
    },function (response) {  
        if (response.estado) {
            $(location).attr('href',`${window.location.pathname}?key=${(response.clave)}`);  
        }else{
            Swal.fire({
                title: 'Clave Incorrecta',
                icon:'info',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok',
            })
        }
    })
})