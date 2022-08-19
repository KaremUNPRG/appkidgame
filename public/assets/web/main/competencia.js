import { store, list,eliminar, editar } from "../components/api/Competencia.js";

var CodigoCompetencia = null


$('#nuevoCompetencia').click(function () {  
    CodigoCompetencia = null
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
                                    <label for="itmFechaInicio">Fecha Inicia *</label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="input-field">
                                    <input id="itmHoraInicio" type="text" class="timepicker validate">
                                    <label for="itmHoraInicio">Hora Inicia *</label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="input-field">
                                    <input id="itmFechaTermina" type="text" class="datepicker validate">
                                    <label for="itmFechaTermina">Fecha Termina * </label>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="input-field">
                                    <input id="itmHoraTermina" type="text" class="timepicker validate">
                                    <label for="itmHoraTermina">Hora Termina *</label>
                                </div>
                            </div>
                            <div class="col-xl-12" style="text-align: right">
                                <button id="sendCompetencia" class="btn waves-effect waves-light blue btnSend" type="submit" name="action">Registrar
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </div>`;
    $('.render-html').html(htmlRender);
    $('.timepicker').timepicker({
        twelveHour:false
    });
    $('.datepicker').datepicker({
        format:'yyyy-mm-dd',
        i18n:{
                months:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Agosto','Setiembre','Octubre','Nomviembre','Diciembre'],
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
        itmClave: $('#itmClave').val()
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


const renderCompetencia = () => {
    list(function (response) {  
        let itemCompetencia = '';
        response.data.forEach(function (element, index) {
            itemCompetencia += ` <div class="col-12 item-competencia">
                                    <div class="row justify-content-between">
                                        <div class="col">
                                            <p class="title-competencia">${element.Nombre}</p>
                                            <p>${element.FechaInicio} a ${element.FechaTermino}</p>
                                        </div>
                                        <div>
                                            <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
                                                <i class="material-icons" style="font-size: 2rem">more_vert</i>
                                            </a>
                                            <ul id='dropdown${index}' class='dropdown-content'>
                                                <li><a href="#!" class="editarCompetencia" data-info='${JSON.stringify(element)}' data-key="${element.Codigo}"><i class="material-icons">create</i>Editar</a></li>
                                                <li><a href="#!" class="deleteCompetencia" data-key="${element.Codigo}"><i class="material-icons">delete</i>Eliminar</a></li>
                                                <li><a href="#!"><i class="material-icons">insert_link</i>Compartir</a></li>
                                                <li><a href="#!"><i class="material-icons">remove_red_eye</i>Ver Clave</a></li>
                                            </ul>                                  
                                        </div>
                                    </div>
                                </div>`
        });
        let htmlRender = `<div class="list-competencia">
                                ${itemCompetencia}
                            </div>`;
        $('.render-html').html(htmlRender);
        $('.dropdown-trigger').dropdown();
    })
}

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

const editarCompetencia = (codigo) => {
    // editarCompetencia
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

    // console.log($(this).data('info'));
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
    $('#sendCompetencia').html(`Editar <i class="material-icons right">edit</i>`)
    CodigoCompetencia = key
    // editarCompetencia(key)
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
        Competencia: CodigoCompetencia
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