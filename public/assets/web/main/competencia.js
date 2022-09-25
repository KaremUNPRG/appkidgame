import { store, list,eliminar, editar, listarJuego, juegoCompetencia, ranking, buscarCompetencia } from "../components/api/Competencia.js";
import { listarTema } from "../components/api/Memorama.js";

var CodigoCompetencia = null
var ListaJuegosCompetencia = []

var ListaJuego = []

const htmlRenderPreloader = () => {
    return `<div class="progress">
                <div class="indeterminate"></div>
            </div>`
}

const htmlRenderAddJuego = () => {
    return `<div>
                <div>
                    <div class="header-juego modal-trigger" data-target="modal1">
                        <div><h6>Juegos <i class="bi bi-plus-circle-fill"></i></h6></div>
                    </div>
                    <div class="content-juego">
                        
                    </div>
                </div>
            </div>`
}

$('#nuevoCompetencia').click(function () {  
    CodigoCompetencia = null
    ListaJuegosCompetencia = []
    let htmlRender = `<div class="form-nuevo">
                        <div class="row">
                            <div class="col-xl-10">
                                <div class="input-field">
                                    <input id="itmNombre" type="text" class="validate">
                                    <label for="itmNombre">Nombre * </label>
                                </div>
                            </div>
                            <div class="col-xl-2">
                                <div class="input-field">
                                    <input id="itmClave" type="text" class="validate ">
                                    <label for="itmClave">Clave</label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="input-field">
                                    <input id="itmFechaInicio" type="text" class="datepicker validate">
                                    <label for="itmFechaInicio">Fecha Inicial *</label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="input-field">
                                    <input id="itmHoraInicio" type="text" class="timepicker validate">
                                    <label for="itmHoraInicio">Hora Inicial *</label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="input-field">
                                    <input id="itmFechaTermina" type="text" class="datepicker validate">
                                    <label for="itmFechaTermina">Fecha Final * </label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="input-field">
                                    <input id="itmHoraTermina" type="text" class="timepicker validate">
                                    <label for="itmHoraTermina">Hora Final *</label>
                                </div>
                            </div>
                            <div class="col-12" >
                                ${htmlRenderAddJuego()}
                            </div>
                            <div class="col-xl-12" style="text-align: right">
                                <button id="sendCompetencia" class="btn waves-effect waves-light blue btnSend" type="submit" name="action">Registrar
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                           
                        </div>
                    </div>`;
    
    $('.render-html').html(htmlRender);
    
    $('.tooltipped').tooltip()
    $('.timepicker').timepicker({
        twelveHour:false
    });
    $('.datepicker').datepicker({
        format:'yyyy-mm-dd',
        i18n:{
                months:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Nomviembre','Diciembre'],
                monthsShort:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic'],
                weekdays:['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
                weekdaysShort:['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
                weekdaysAbbrev:['D','L','M','M','J','V','S']
            }
    });
})

$('#content-app').on('click','.btnSend',function () { 
    store({
        itmNombre: $('#itmNombre').val(),
        itmFechaInicio: $('#itmFechaInicio').val(),
        itmHoraInicio: $('#itmHoraInicio').val(),
        itmFechaTermino: $('#itmFechaTermina').val(),
        itmHoraTermino: $('#itmHoraTermina').val(),
        itmClave: $('#itmClave').val(),
        itmListaJuego: ListaJuegosCompetencia
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
                renderCompetencia()
            } else if (result.isDenied) {
                $('#nuevoCompetencia').click()
            }
          })
    })
})

const renderItemCompetencia = (element,index) => {
    let linkFacebook = `http://www.facebook.com/sharer.php?s=100&p[url]=http://127.0.0.1:8000/competencia&p[title]=${element.Nombre}&p[summary]=Jugar Competencia&p[images][0]=http://127.0.0.1:8000/assets/web/img/verdugo.png`;
            
    return `<div class="col-12 item-competencia">
                <div class="row justify-content-between">
                    <div class="col">
                        <p class="title-competencia"><a target="black" href="/competencia/jugar/${element.Codigo}">${element.Nombre}</a></p>
                        <p>${element.FechaInicioAdd} a ${element.FechaTerminoAdd}</p>
                    </div>
                    <div>
                        <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
                            <i class="material-icons" style="font-size: 2rem">more_vert</i>
                        </a>
                        <ul id='dropdown${index}' class='dropdown-content'>
                            <li><a href="#!" class="editarCompetencia" data-info='${JSON.stringify(element)}' data-key="${element.Codigo}"><i class="material-icons">create</i>Editar</a></li>
                            <li><a href="#!" class="deleteCompetencia" data-key="${element.Codigo}"><i class="material-icons">delete</i>Eliminar</a></li>
                            <li><a href="${linkFacebook}" target="black"><i class="bi bi-facebook" style="font-size:22px"></i> Facebook</a></li>
                            <li><a target="black" href="https://api.whatsapp.com/send?text=http://127.0.0.1:8000/competencia/jugar/${element.Codigo}"><i class="bi bi-whatsapp" style="font-size:22px"></i> Whatsapp</a></li>
                            <li><a href="#!" data-target="modalRanking" class="modal-trigger verranking" data-key="${element.Codigo}"><i class="bi bi-trophy" style="font-size:22px"></i> Ranking</a></li>    
                        </ul>                                  
                    </div>
                </div>
            </div>`
}

const renderCompetencia = () => {
    $('.render-html').html(`<div class="content-loader">
                                <div id="preloader_3"></div>
                            </div>`)
    // <li><a href="https://api.whatsapp.com/send?text=http://127.0.0.1:8000/competencia"><i class="bi bi-whatsapp" style="font-size:22px"></i> Whatsapp</a></li>
    // <li><a href="#!"><i class="material-icons">remove_red_eye</i>Ver Clave</a></li>
    list(function (response) {  
        let itemCompetencia = '';
        response.data.forEach(function (element, index) {
            itemCompetencia += renderItemCompetencia(element,index)
        });
        let htmlRender = `<div class="" >
                                <div class="secction-buscar" >
                                    <button type="button" class="btn btnSelectBuscar" data-key="Alfabetico">Orden Alfabetico</button>
                                    <button type="button" class="btn btnSelectBuscar" data-key="Reciente">Reciente</button>
                                    <button type="button" class="btn btnSelectBuscar" data-key="Jugando">Jugando</button>
                                    <div style="position: relative;padding: 0px 20px;">
                                        <input type="text" class="form-control " id="inputBuscar"><i class="bi bi-search buscarJuego"></i>
                                    </div>
                                </div>
                                <div class="list-competencia">
                                    ${itemCompetencia}
                                </div>
                            </div>`;
        $('.render-html').html(htmlRender);
        $('.dropdown-trigger').dropdown();
    })
}

$(document).on('click','.btnSelectBuscar',function () {  
    $('.btnSelectBuscar').removeClass('btn-select')
    
    $(this).addClass('btn-select')
     $('.list-competencia').html(`<div class="content-loader">
                                <div id="preloader_3"></div>
                            </div>`)
    buscarCompetencia({
        Modo: $(this).data('key')
    },function (response) { 
        let itemCompetencia = '';
        response.data.forEach(function (element, index) {
            itemCompetencia += renderItemCompetencia(element,index)
        });
        
        $('.list-competencia').html(itemCompetencia);
        $('.dropdown-trigger').dropdown();
     })
})

$(document).on('click','.buscarJuego',function () {  
    $('.btnSelectBuscar').removeClass('btn-select')
    $('.list-competencia').html(`<div class="content-loader">
                                <div id="preloader_3"></div>
                            </div>`)
    buscarCompetencia({
        Modo: 'Buscar',
        Buscar: $('#inputBuscar').val()
    },function (response) { 
        let itemCompetencia = '';
        response.data.forEach(function (element, index) {
            itemCompetencia += renderItemCompetencia(element,index)
        });
        
        $('.list-competencia').html(itemCompetencia);
        $('.dropdown-trigger').dropdown();
     })
})

const deleteCompetencia = (codigo) => {
    eliminar({
        Competencia:codigo
    },
    function (response) {  
        Swal.fire({
            icon: 'success',
            title: response.mensaje
          })
        renderCompetencia()
    })
}

$('#listarCompetencia').click(function () { 
    renderCompetencia()
})

$('#content-app').on('click','.deleteCompetencia',function () { 
    var key = $(this).data('key')
    deleteCompetencia(key)
});

$('#content-app').on('click','.editarCompetencia',function () { 
    var key = $(this).data('key')
    var data = $(this).data('info')
    $('#nuevoCompetencia').click()
    $('#itmNombre').val(data.Nombre).focus()
    var fecha =data.FechaInicio.split(' ')
    $('#itmFechaInicio').val(fecha[0]).focus()
    $('#itmClave').val(data.Clave).focus()
    $('#itmHoraInicio').val(fecha[1]).focus()
    var fecha =data.FechaTermino.split(' ')
    $('#itmFechaTermina').val(fecha[0]).focus()
    $('#itmHoraTermina').val(fecha[1]).focus()
    $('#sendCompetencia').removeClass('btnSend')
    $('#sendCompetencia').addClass('btnEdit')
    $('#sendCompetencia').html(`Actualizar`)
    CodigoCompetencia = key
    juegoCompetencia(CodigoCompetencia, function (response) {  
        ListaJuegosCompetencia = response.data
        renderAddJuegoCompetencia()
    })
});

$(document).ready(function () {
    renderCompetencia()
});

$('#content-app').on('click','.btnEdit',function () { 
    console.log(CodigoCompetencia);
    editar({
        itmNombre: $('#itmNombre').val(),
        itmFechaInicio: $('#itmFechaInicio').val(),
        itmHoraInicio: $('#itmHoraInicio').val(),
        itmFechaTermino: $('#itmFechaTermina').val(),
        itmHoraTermino: $('#itmHoraTermina').val(),
        itmClave: $('#itmClave').val(),
        Competencia: CodigoCompetencia,
        itmListaJuego: ListaJuegosCompetencia
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
                renderCompetencia()
            } else if (result.isDenied) {
                $('#nuevoCompetencia').click()
            }
          })
    })
})

/**
 * Proceso de agregar juegos a la competencia
 */
const renderItemJuego = (element) => {
    let findIndex = ListaJuegosCompetencia.findIndex(obj => obj.CodigoJuego == element.CodigoJuego);
    return `<div style="width:100%;margin: 10px 0px;box-shadow: 1px 1px 15px 1px rgb(0 0 0 / 10%);border-left: 5px solid rebeccapurple;">
        <div class="d-flex align-items-center">
            <div style="width:100%;padding:0px" class="col-1">
                <div><img style="width: 100%;" src="assets/web/img/${element.Tipo == 1 ? 'perspectiva' 
                        : (element.Tipo == 2 ? 'verdugo' : 'letras') }.png" alt=""></div>                     
            </div>
            <div class="col-9">${element.TitJuego}</div>
            <div class="col-2">
                ${
                    (findIndex != -1) 
                    ? 'Agregado' 
                    : `<a data-key="${element.CodigoJuego}" class="btnAddJuego waves-effect waves-light btn text-white"><i class="bi bi-plus-circle-fill"></i></a>`
                }    
            </div>
        </div>
    </div>`
}

$(document).on('click','.header-juego',function () {
    $('.render-juego').html(htmlRenderPreloader())
    listarJuego(function (response) {  
        if (response.data.length > 0) {
            let htmlRenderJuegos = ''
            ListaJuego = response.data 
            response.data.forEach(element => {
                htmlRenderJuegos += renderItemJuego(element)
            });
            $('.render-juego').html(htmlRenderJuegos)
        }else{
            $('.render-juego').html("No tienes juegos disponible")
        }
    })
});

const renderAddJuegoCompetencia = () => {
    let htmlRenderJuegos = ''
    ListaJuegosCompetencia.forEach(element => {
        htmlRenderJuegos += `<div style="width:100%;margin: 10px 0px;box-shadow: 1px 1px 15px 1px rgb(0 0 0 / 10%);border-left: 5px solid rebeccapurple;">
                                <div class="d-flex align-items-center">
                                    <div style="width:100%;padding:0px" class="col-1">
                                        <div><img style="width: 100%;" src="assets/web/img/${element.Tipo == 1 ? 'perspectiva' 
                                                : (element.Tipo == 2 ? 'verdugo' : 'letras') }.png" alt=""></div>                     
                                    </div>
                                    <div class="col-9">${element.TitJuego}</div>
                                    <div class="col-2">
                                        <a data-key="${element.CodigoJuego}" class="btnRemoveJuego waves-effect waves-light btn bg-danger text-white"><i class="material-icons prefix">delete</i></a>
                                    </div>
                                </div>
                            </div>`
    });
    $('.content-juego').html(htmlRenderJuegos)
}

$(document).on('click','.btnAddJuego',function () {  
    let key = $(this).data('key')
    let find = ListaJuego.find(obj => obj.CodigoJuego == key);
    ListaJuegosCompetencia.push(find)
    $('.modal').modal('close')
    renderAddJuegoCompetencia()
})

$('.itmSelectJuego').change(function () {  
    let filter = ListaJuego.filter(obj => obj.Tipo == $(this).val()); 
    let htmlRenderJuegos = '';
    if ($(this).val() != 0) {
        filter.forEach(element => {
            htmlRenderJuegos += renderItemJuego(element)
        });
    }else{
        ListaJuego.forEach(element => {
            htmlRenderJuegos += renderItemJuego(element)
        });
    }
    $('.render-juego').html(htmlRenderJuegos)
})

$('.itmBuscarJuego').keyup(function () {  
    let filter = ListaJuego.filter(obj => obj.TitJuego.toUpperCase().includes($(this).val().toUpperCase()) == true); 
    let htmlRenderJuegos = '';
    if ($(this).val() != '') {
        filter.forEach(element => {
            htmlRenderJuegos += renderItemJuego(element)
        });
    }else{
        ListaJuego.forEach(element => {
            htmlRenderJuegos += renderItemJuego(element)
        });
    }
    $('.render-juego').html(htmlRenderJuegos)
})

$(document).on('click','.btnRemoveJuego',function () {  
    let codigo = $(this).data('key')
    let index = ListaJuegosCompetencia.findIndex(obj => obj.CodigoJuego == codigo)
    ListaJuegosCompetencia.splice(index,1)
    renderAddJuegoCompetencia()
})

$(document).on('click','.verranking', function () {  
    let codigo = $(this).data('key')
    ranking({Competencia:codigo}, function (response) { 
        let html = '' 
        response.ranking.forEach(element => {
            html += `<div style="width:100%;margin: 10px 0px;box-shadow: 1px 1px 15px 1px rgb(0 0 0 / 10%);border-left: 5px solid rebeccapurple;">
                        <div class="d-flex align-items-center">
                            <div style="width:100%;padding:0px" class="col-1">
                                <div><img style="width: 100%;" src="${element.Avatar}" alt=""></div>                     
                            </div>
                            <div class="col-9">${element.Nombre} ${element.Apellido}</div>
                            <div class="col-2">
                                <span>${Number(element.PuntajeTotal).toFixed(5)}</span>
                            </div>
                        </div>
                    </div>`
        });
        
        $('.renderRanking').html(html)
    })
})

$('#rankingCompetencia').click(function () {  
    let htmlRender = `<div class="form-nuevo">
                        <div class="row">
                            <div class="col-xl-10">
                                <div class="input-field">
                                    <input id="itmNombre" type="text" class="validate">
                                    <label for="itmNombre">Nombre * </label>
                                </div>
                            </div>
                            <div class="col-xl-2">
                                <div class="input-field">
                                    <input id="itmClave" type="text" class="validate ">
                                    <label for="itmClave">Clave</label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="input-field">
                                    <input id="itmFechaInicio" type="text" class="datepicker validate">
                                    <label for="itmFechaInicio">Fecha Inicial *</label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="input-field">
                                    <input id="itmHoraInicio" type="text" class="timepicker validate">
                                    <label for="itmHoraInicio">Hora Inicial *</label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="input-field">
                                    <input id="itmFechaTermina" type="text" class="datepicker validate">
                                    <label for="itmFechaTermina">Fecha Final * </label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="input-field">
                                    <input id="itmHoraTermina" type="text" class="timepicker validate">
                                    <label for="itmHoraTermina">Hora Final *</label>
                                </div>
                            </div>
                            <div class="col-12" >
                                ${htmlRenderAddJuego()}
                            </div>
                            <div class="col-xl-12" style="text-align: right">
                                <button id="sendCompetencia" class="btn waves-effect waves-light blue btnSend" type="submit" name="action">Registrar
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                           
                        </div>
                    </div>`;
    
    $('.render-html').html(htmlRender);
})