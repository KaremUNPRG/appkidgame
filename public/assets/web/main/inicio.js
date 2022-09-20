import { listaJuego, listaValoracion, insertValoracion } from "../components/api/Inicio.js";

var valoracionGlobal = 0;
var codigoJuegoGlobal = null;

const templateValoracion = (cantidad) => {
    let renderHtml = ''
    for (let index = 0; index < Number(cantidad); index++) {
        renderHtml += '<span class="ion-ios-star text-warning"></span>'
    }
    //console.log(renderHtml);
    return renderHtml
}

const templateItemJuego = (element) => {
    return `<div class="col-md-6 col-lg-4">
                <div class="blog-entry" style="box-shadow: 1px 1px 11px 1px rgb(0 0 0 / 10%);">
                    <a href="#" data-key="${element.Tipo}" data-id="${element.CodigoJuego}" class="jugar block-20 d-flex align-items-end"
                        style="background-image: url('assets/web/img/${element.Tipo == 1 ? 'perspectiva' 
                        : (element.Tipo == 2 ? 'verdugo' : 'letras') }.png');background-size: auto;">
                    </a>
                    <div class="text bg-white p-4">
                        <h3 class="heading"><a href="#">${element.TitJuego}</a></h3>
                        <p>${element.TitTema}</p>
                        <div class="d-flex align-items-center mt-4">
                            <p class="mb-0"><a data-key="${element.Tipo}" data-id="${element.CodigoJuego}" href="#" class="jugar btn btn-primary">Jugar <span
                                        class="ion-ios-arrow-round-forward"></span></a></p>
                            <p class="ml-auto mb-0 viewComentario modal-trigger" data-key="${element.CodigoJuego}" href="#mComentario">
                                <a href="#" class="mr-2">
                                    ${(element.ValoracionPunto > 0) ? templateValoracion(element.ValoracionPunto) : ''}
                                </a>
                                <a href="#" class="meta-chat">
                                    <span class="ion-md-chatboxes"></span> 
                                    <span>${element.CantidadComentario}</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>`
}

$(document).ready(function () {
    listaJuego(function (response) { 
        let renderHtmlListaJuego = '' 
        response.data.forEach(element => {
            renderHtmlListaJuego += templateItemJuego(element)
        });
        $('.renderHtmlListaJuego').html(renderHtmlListaJuego)
    })
});


const buscarJuego = (tipo,codigo) => {
    if(tipo == 2){  
        $(location).attr('href',`jugarAhorcado?id=${btoa(codigo)}`);  
      }  else if (tipo == 3) {
        $(location).attr('href',`jugarSopaLetras?id=${btoa(codigo)}`);  
    } 
}

const buildEstrella = (estrella) => {
    let render = ''
    for (let index = 0; index < 5; index++) {
        render += (index) < Number(estrella).toFixed(0) 
                                    ? `<span class="ion-ios-star text-warning"></span>` 
                                    : `<span class="ion-ios-star text-secondary"></span>`
    }
    return render
}

const renderValoracion = (response) => {
    let estadistica = response.data.estadistica
    let renderEstrella = ''
    let renderMiEstrella = ''
    let renderComentario = ''
    $('.titleJuego').text(response.data.comentarios[0].TitJuego)
    $('.sendComentario').data('key',response.data.comentarios[0].CodigoJuego)
    $('.puntacionRender').text(estadistica.Valoracion == '--'?'--':Number(estadistica.Valoracion).toFixed(1) )

    if (response.data.miValoracion != null) {
        valoracionGlobal = response.data.miValoracion.Valoracion
        $('#itemComentario').val(response.data.miValoracion.Comentario)
    }else{
        valoracionGlobal = 0
        $('#itemComentario').val('')
    }

    for (let index = 0; index   < 5; index++) {
        let elementE = `${index+1}Estrella`
        if (estadistica.Valoracion != '--') {
            $('#'+elementE).val(estadistica.Estrellas[index] * 100 / estadistica.Total)
        }else{
            $('#'+elementE).val(0)
        }
        renderMiEstrella += ` <span class="ion-ios-star ${index < Number(valoracionGlobal).toFixed(0) ? 'text-warning' : 'text-secondary'} selectEstrella" data-index="${index+1}"></span>`
    }
    renderEstrella = buildEstrella( estadistica.Valoracion != '--' ?estadistica.Valoracion:0  )
    response.data.comentarios.forEach(element => {
        if(element.Comentario != null){
            renderComentario += `<div class="item-comentario pb-4">
                                <div class="header-comentario d-flex">
                                    <div class="avatar-comentario">
                                        <img style="width: 30px;" src="${element.Avatar}" alt="">
                                    </div>
                                    <div class="user-comentario">
                                        <span>${element.Usuario}</span>
                                    </div>
                                </div>
                                <div class="body-comentario">
                                    <div class="susEstrellas">
                                        ${buildEstrella(element.Valoracion)}
                                        <span style="    font-size: 0.8rem;">${element.Fecha}</span>
                                    </div>
                                    <div class="susComentario py-1">
                                        ${element.Comentario}
                                    </div>
                                </div>
                            </div>`
        }
        
    });
    $('.renderPuntuacion').html(renderEstrella)
    $('.content-comentario').html(renderComentario)
    $('.misEstrellas').html(renderMiEstrella)
    $('.totalUser').text(estadistica.Total)
}
$(document).on('click','.viewComentario',function () { 
    // alert('sasas');
    var key = $(this).data('key')
    codigoJuegoGlobal = key
    listaValoracion(key,renderValoracion)
});


$('.sendComentario').click(function () {  
    let auth = localStorage.getItem('accessToken')
    var keyJuego = $(this).data('key');
    if (auth == null) {
        Swal.fire({
            icon: 'info',
            title: 'Debe iniciar sesion'
          })
    }else{
        insertValoracion({
            itmCodigoJuego:keyJuego,
            itmValoracion:valoracionGlobal,
            itmComentario:$('#itemComentario').val()
        },function (response) {
            listaValoracion(keyJuego,renderValoracion)  
            Swal.fire({
                icon: 'success',
                title: 'Valoración guardada'
              })
        })
    }
})

$(document).on('click','.selectEstrella',function () {  
    let auth = localStorage.getItem('accessToken')
    console.log($(this).data('index'));
    valoracionGlobal = $(this).data('index')
    if (auth == null) {
        Swal.fire({
            icon: 'info',
            title: 'Debe iniciar sesion'
          })
    }else{
        insertValoracion({
            itmCodigoJuego:codigoJuegoGlobal,
            itmValoracion:valoracionGlobal,
            itmComentario:$('#itemComentario').val()
        },function (response) {
            listaValoracion(codigoJuegoGlobal,renderValoracion)  
            Swal.fire({
                icon: 'success',
                title: 'Valoración guardada'
              })
        })
    }
})

$(document).on('click','.jugar',function () { 
    // alert('sasas');
    var key = $(this).data('key')
    var codigo = $(this).data('id')
    buscarJuego(key, codigo)
});