import { store, list,eliminar, editar } from "../components/api/Memorama.js";

var CodigoJuegoMemorama = null;

const renderMemorama = () => {
    list(function (response) {  
        let itemMemorama = '';
        response.data.forEach(function (element, index) {
            itemMemorama += ` <div class="col-12 item-memorama">
                                    <div class="row justify-content-between">
                                        <div class="col">
                                            <p class="title-memorama">Titulo: ${element.TituloJuego}</p>
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

$('#nuevoMemorama').click(function(){
    CodigoJuegoMemorama = null;
    let renderHtml = `<div class="form-nuevo">
                        <div class="row">
                            <div class="col-xl-10">
                                <div class="input-field">
                                    <input id="itmTitulo" type="text" class="validate executeBorrador">
                                    <label for="itmTitulo">Titulo * </label>
                                </div>
                            </div>
                            <div class="col-xl-2">
                                <div class="input-field">
                                    <input id="itmTiempo" type="number" class="validate executeBorrador">
                                    <label for="itmTiempo">Tiempo </label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <label class="mt-2">
                                    <input type="checkbox" class="filled-in" id="itmPrivado" />
                                    <span>Privado</span>
                                </label>
                            </div>
                            
                            <div class="col-xl-4">
                                <div class="">
                                    <label for="itmFondo">Fondo * </label>
                                    <input id="itmFondo" type="color" class="validate">
                                </div>
                            </div>
                            <div class="col-xl-4">
                                <div class="input-field">
                                    <select id="itmTema">
                                        <option value="" disabled selected>Elegir Tema</option>
                                        <option value="1">Informatica</option>
                                    </select>
                                    <label>Tema</label>
                                </div>
                            </div>
                            <div class="col-xl-12" style="text-align: right">
                                <button id="sendCompetencia" class="btn waves-effect waves-light blue btnSend" type="submit" name="action">Registrar
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </div>`
    $('.render-html').html(renderHtml);
    
    $('select').formSelect();
})

$(document).on('change','.executeBorrador',function () {
    if(CodigoJuegoMemorama == null){
        store({
            itmTitulo: $('#itmTitulo').val(),
            itmTiempo: $('#itmTiempo').val(),
            itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
            itmFondo: $('#itmFondo').val(),
            CodigoTema: $('#itmTema').val()
          },
          function (response) { 
            console.log(response);
            CodigoJuegoMemorama = response.codigo
            
        })
    }else{
        editar({
            itmTitulo: $('#itmTitulo').val(),
            itmTiempo: $('#itmTiempo').val(),
            itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
            itmFondo: $('#itmFondo').val(),
            CodigoTema: $('#itmTema').val(),
            itmCodigoJuego:CodigoJuegoMemorama,
            itmRegistro:'NO'
          },
          function (response) { 
            console.log(response);
            
        })
    }
})

$('#content-app').on('click','.btnSend',function () { 
    editar({
        itmTitulo: $('#itmTitulo').val(),
        itmTiempo: $('#itmTiempo').val(),
        itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
        itmFondo: $('#itmFondo').val(),
        CodigoTema: $('#itmTema').val(),
        itmCodigoJuego:CodigoJuegoMemorama,
        itmRegistro:'SI'
      },
      function (response) { 
        Swal.fire({
            title: response.mensaje,
            icon:'success',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Listar',
            denyButtonText: `Nuevo`,
          }).then((result) => {
            if (result.isConfirmed) {  
                renderMemorama()
            } else if (result.isDenied) {
                $('#nuevoMemorama').click()
            }
          })
    })
})