import { store, list,eliminar, editar } from "../components/api/Memorama.js";

const renderMemorama = () => {
    list(function (response) {  
        let itemMemorama = '';
        response.data.forEach(function (element, index) {
            itemMemorama += ` <div class="col-12 item-memorama">
                                    <div class="row justify-content-between">
                                        <div class="col">
                                            <p class="title-memorama">Titulo: ${element.Titulo}</p>
                                            <p class="tiempo-memorama">Tiempo: ${element.Tiempo}</p>
                                            <p class="fecha-memorama">Fecha: ${element.Fecha}</p>
                                        </div>
                                        <div>
                                            <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
                                                <i class="material-icons" style="font-size: 2rem">more_vert</i>
                                            </a>
                                            <ul id='dropdown${index}' class='dropdown-content'>
                                                <li><a href="#!" class="editarMemorama" data-info='${JSON.stringify(element)}' data-key="${element.codigoJuego}"><i class="material-icons">create</i>Editar</a></li>
                                                <li><a href="#!" class="deleteMemorama" data-key="${element.codigoJuego}"><i class="material-icons">delete</i>Eliminar</a></li>
                                                <li><a href="#!"><i class="material-icons">insert_link</i>Compartir</a></li>
                                            </ul>                                  
                                        </div>
                                    </div>
                                </div>`
        });
        let htmlRender = `<div class="list-memorama">
                                ${itemMemorama}
                            </div>`;
        $('.render-html').html(htmlRender);
        $('.dropdown-trigger').dropdown();
    })
}

$(document).ready(function () {
    renderMemorama()
});

$('#listarMemorama').click(function () { 
    renderMemorama()
})

const deleteMemorama = (codigo) => {
    eliminar({
        Juego:codigo
    },
    function (response) {  
        Swal.fire({
            icon: 'success',
            title: response.mensaje
          })
        renderMemorama()
    })
}

$('#content-app').on('click','.deleteMemorama',function () { 
    var key = $(this).data('key')
    console.log(key)
    deleteMemorama(key)
});