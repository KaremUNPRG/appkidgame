import { store, list,eliminar, editar, listarTema,cartaMemorama } from "../components/api/Memorama.js";

var CodigoJuegoMemorama = null;
var ListaCartaJuego = [];
var ListaTema = [];

const htmlRenderCarta = () => {
    return `<div>
                <div>
                    <div class="header-carta modal-trigger" data-target="modal1">
                        <div><h6>Carta</h6></div>
                    </div>
                    <div class="content-carta">
                        
                    </div>
                </div>
            </div>`
}

const renderMemorama = () => {
    list(function (response) {  
        let itemMemorama = '';
        response.data.forEach(function (element, index) {
            itemMemorama += ` <div class="col-12 item-memorama ${element.Borrador==1?"item-borrador":""}">
                                    <div class="row justify-content-between">
                                        <div class="col">
                                            <p class="title-memorama">Titulo: ${element.TituloJuego}</p>
                                            <p class="tema-memorama">Tema del Juego: ${element.TituloTema}</p>
                                            <p class="tiempo-memorama">Tiempo: ${element.Tiempo}</p>
                                            <p class="fecha-memorama">Fecha: ${element.Fecha}</p>
                                        </div>
                                        <div>
                                            <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
                                                <i class="material-icons" style="font-size: 2rem">more_vert</i>
                                            </a>
                                            <ul id='dropdown${index}' class='dropdown-content'>
                                                
                                                <li><a href="#!" class="editarMemorama" data-info='${JSON.stringify(element)}' data-key="${element.codigoJuego}"><i class="material-icons">create</i>${element.Borrador==1?"Restaurar":"Editar"}</a></li>
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
    listarTema(function (response) {
        ListaTema = response.data
    })
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
    ListaCartaJuego = []
    let renderHtmlTema = ''
    ListaTema.forEach(element => {
        renderHtmlTema += `<option value="${element.Codigo}" selected>${element.Titulo}</option>`
    })

    let renderHtml = `<div class="form-nuevo">

                        <div class="row">

                        <button class="cerrar how-pos3 hov3">
					        <img id="cerrar" src="assets/web/img/icon-close.png" alt="CLOSE">
				        </button>

                            <div class="col-xl-5">
                                <div class="input-field">
                                    <select id="itmTema">
                                        ${renderHtmlTema}
                                    </select>
                                    <label>Tema</label>
                                </div>
                            </div>
                            <div class="col-xl-5">
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
                            <div class="col-12" >
                                ${htmlRenderCarta()}
                            </div>
                            <div class="col-xl-12" style="text-align: right">
                                <button id="sendMemorama" class="btn waves-effect waves-light blue btnSend" type="submit" name="action">Registrar
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
            CodigoTema: $('#itmTema').val(),
            itmListaCarta: ListaCartaJuego
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
        itmRegistro:'SI',
        itmListaCarta: ListaCartaJuego
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

$('#content-app').on('click','.editarMemorama',function () { 
    var key = $(this).data('key')
    ListaCartaJuego = []
    // console.log($(this).data('info'));
    var data = $(this).data('info')
    $('#nuevoMemorama').click()
    $('#itmTitulo').val(data.TituloJuego).focus()
    $('#itmTiempo').val(data.Tiempo).focus()
    $('#itmPrivado').val(data.Privado).focus()
    $('#itmFondo').val(data.Fondo).focus()
    $('#itmTema').val(data.CodigoTema).focus()
    $('#itmTema').formSelect();
    $('#sendMemorama').removeClass('btnSend')
    $('#sendMemorama').addClass('btnEdit')
    $('#sendMemorama').html(`Actualizar`)
    CodigoJuegoMemorama = key
    cartaMemorama(CodigoJuegoMemorama, function (response) {  
        // ListaCartaJuego = response.data
        response.data.forEach(element => {
            ListaCartaJuego.push({
                'Codigo' : (ListaCartaJuego.length +1),
                'Descripcion' : element.Descripcion,
                'Tipo'        : '01',
                'Imagen'      : element.Imagen,
                'CodigoCarta' : element.Codigo   
            })
        });
        renderAddCartaJuego(ListaCartaJuego)
    })
    // editarMemorama(key)
});

$('#content-app').on('click','.btnEdit',function () { 
    editar({
        itmTitulo: $('#itmTitulo').val(),
        itmTiempo: $('#itmTiempo').val(),
        itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
        itmFondo: $('#itmFondo').val(),
        CodigoTema: $('#itmTema').val(),
        itmCodigoJuego:CodigoJuegoMemorama,
        itmRegistro:'SI',
        itmListaCarta: ListaCartaJuego
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

$('.itmTipoRecurso').change(function () {
    if($(this).val() == '01'){
        $('.itmRecurso').attr('type','text')
    }else{
        $('.itmRecurso').attr('type','file')
    }
})

var recursoTemporal = null;

$('.itmRecurso').change(function () {
    recursoTemporal = null;
    if ($('.itmTipoRecurso').val() == '01') {
        $('.content-imagen').attr('src',$(this).val())
        recursoTemporal = $(this).val()
    }else{
        const file = this.files[0];
        if (file){
          let reader = new FileReader();
          reader.onload = function(event){
            recursoTemporal = event.target.result
            $('.content-imagen').attr('src', event.target.result);
          }
          reader.readAsDataURL(file);
        }
    }
})

const renderAddCartaJuego = (data) => {
    let html = ''
    data.forEach(element => {
        html += `<div style="width:100%;margin: 10px 0px;box-shadow: 1px 1px 15px 1px rgb(0 0 0 / 10%);border-left: 5px solid rebeccapurple;">
                    <div class="d-flex align-items-center">
                        <div style="width:100%;padding:0px" class="col-1">
                            <div><img style="width: 100%;" src="${element.Imagen}" alt=""></div>                     
                        </div>
                        <div class="col-9">${element.Descripcion}</div>
                        <div class="col-2">
                            <a data-key="${element.Codigo}" class="btnRemoveCarta waves-effect waves-light btn bg-danger text-white"><i class="material-icons prefix">delete</i></a>
                        </div>
                    </div>
                </div>`
    })
    $('.content-carta').html(html)
}

$('.btnAgregarCarta').click(function () {
    ListaCartaJuego.push({
        'Codigo' : (ListaCartaJuego.length +1),
        'Descripcion' : $('.itmDescripcionCarta').val(),
        'Tipo'        : $('.itmTipoRecurso').val(),
        'Imagen'      : recursoTemporal,
        'CodigoCarta' : null   
    })
    renderAddCartaJuego(ListaCartaJuego)
})

$(document).on('change','#itmFondo',function () {
    $('.form-nuevo').css({"background-color":`${$(this).val()}`})
})

$(document).on('click','.header-carta',function () {
    $('.itmDescripcionCarta').val('')
    $('.content-imagen').attr('src', '');
    $('.itmRecurso').val('')
})

$(document).on('click','.btnRemoveCarta',function () {  
    let codigo = $(this).data('key')
    let index = ListaCartaJuego.findIndex(obj => obj.Codigo == codigo)
    ListaCartaJuego.splice(index,1)
    renderAddCartaJuego(ListaCartaJuego)
})

$('#content-app').on('click','.cerrar',function () { 
    renderMemorama()
});