import { listaJuego, listaValoracion } from "../components/api/Inicio.js";

const templateValoracion = (cantidad) => {
    let renderHtml = ''
    for (let index = 0; index < Number(cantidad); index++) {
        renderHtml += '<span class="ion-ios-star text-warning"></span>'
    }
    console.log(renderHtml);
    return renderHtml
}

const templateItemJuego = (element) => {
    return `<div class="col-md-6 col-lg-4">
                <div class="blog-entry" style="box-shadow: 1px 1px 11px 1px rgb(0 0 0 / 10%);">
                    <a href="#" class="block-20 d-flex align-items-end"
                        style="background-image: url('assets/web/img/${element.Tipo == 1 ? 'perspectiva' 
                        : (element.Tipo == 2 ? 'verdugo' : 'letras') }.png');background-size: auto;">
                    </a>
                    <div class="text bg-white p-4">
                        <h3 class="heading"><a href="#">${element.TitTema}</a></h3>
                        <p>${element.TitJuego}</p>
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
    }  
}

$(document).on('click','.viewComentario',function () { 
    // alert('sasas');
    var key = $(this).data('key')
    listaValoracion(key,function (response) {  
        $('.titleJuego').text(response.data[0].TitJuego)
    })
});
$(document).on('click','.jugar',function () { 
    // alert('sasas');
    var key = $(this).data('key')
    var codigo = $(this).data('id')
    buscarJuego(key, codigo)
});