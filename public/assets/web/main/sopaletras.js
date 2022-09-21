import { store, list,eliminar, editar, restaurar,listarCompetencias,editarCompetencia } from "../components/api/SopaLetras.js";
import { lista } from "../components/api/Tema.js";
import { listarJuego, juegoCompetencia } from "../components/api/Competencia.js";

var CodigoJuegoSopa = null;
var stopTiempo = 0;
var ListaCompetencia = [];
var ListaJuegosCompetencia = [];
var palabras = [];
var trampas = [];




const listarTema = (cod) => {
    
    lista(function (response) {  
        let itemTema = '';
        response.data.forEach(function (element, index) {
            if(cod == element.Codigo){
            itemTema +=`<option value="${element.Codigo}" selected>${element.Titulo}</option>`
            }else{
                itemTema +=`<option value="${element.Codigo}">${element.Titulo}</option>`
            }
        });
        let htmlRender = `
                            <p>Tema <span class="text-danger">*</span></p>
                            <select id="itmTema" class="form-control" name="itmTema">
                                <option value="-1">Seleccione tema...</option>
                                ${itemTema}
                            </select> 

                        `;
            $('.render-tema').html(htmlRender);
            $('.dropdown-trigger').dropdown();
        })
}

const renderSopa = () => {
    list(function (response) {  
        let itemSopa = '';
         let aux = '';
        response.data.forEach(function (element, index) {
             if(element.Privado == 1){
                aux = "Privado"    
            }else{
                aux = "Público" 
            }
console.log(element.VigJuego)
 if(element.VigJuego == 1){
            itemSopa += ` <div class="col-12 item-sopa-letra">
                                    <div class="row justify-content-between">
                                        <div class="col">
                                            <p style="color: #1eaaf1;" class="title-sopa-letra">Titulo: ${element.TitJuego}</p>
                                            <p class="tema-sopa-letra">Tema del Juego: ${element.Tema}</p>
                                            <p class="tiempo-sopa-letra">Tiempo: ${element.Tiempo} min.</p>
                                            <p style="color: #28a745;">${aux}</p>
                                           
                                            
                                        </div>
                                        <div>
                                            <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
                                                <i class="material-icons" style="font-size: 2rem">more_vert</i>
                                            </a>
                                            <ul id='dropdown${index}' class='dropdown-content'>
                                                
                                                <li><a href="#!" class="editar-sopa" data-info='${JSON.stringify(element)}' data-key="${element.CodigoJuego}"><i class="material-icons">create</i>${element.Borrador==1?"Restaurar":"Editar"}</a></li>
                                                <li><a href="#!" class="delete-sopa" data-key="${element.CodigoJuego}"><i class="material-icons">delete</i>Eliminar</a></li>
                                                <li><a href="#!" class="jugar-sopa" data-info='${JSON.stringify(element)}' data-key="${element.CodigoJuego}"><i class="material-icons">arrow_right</i>Probar</a></li>
                                               <li><a href="#!" class="modal-trigger agregar-competencia" data-info='${JSON.stringify(element)}' data-key="${element.Codigo}" data-target="modal1"><i class="material-icons">add</i>Agregar a competencia</a></li>

                                            </ul>                                  
                                        </div>
                                    </div>
                                </div>`}else{ 
         itemSopa += ` <div style="border-left: 4px solid grey;" class="col-12 item-competencia">
        <div class="row justify-content-between">
             <div class="col">
                     <p class="title-sopa-letra">Titulo: ${element.TitJuego}</p>
                    <p class="tema-sopa-letra">Tema del Juego: ${element.Tema}</p>
                    <p class="tiempo-sopa-letra">Tiempo: ${element.Tiempo} min.</p>

                    <p>Eliminado</p>
            </div>
         <div>
        <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
            <i class="material-icons" style="font-size: 2rem">more_vert</i>
        </a>
        <ul id='dropdown${index}' class='dropdown-content'>
            <li><a href="#!" class="restaurarSopa" data-key="${element.CodigoJuego}"><i class="material-icons">create</i>Restaurar</a></li>
        </ul>                                  
</div>
</div>
</div>`

        }



        });
        let htmlRender = `<div class="list-sopa-letra">
                                ${itemSopa}
                            </div>`;
        $('.render-html').html(htmlRender);
        $('.dropdown-trigger').dropdown();
    })
}

function limpiar(){
    stopTiempo = 1;
    palabras = [];
    trampas = [];
    localStorage.removeItem('palabras_total')
    localStorage.removeItem('duracion_minutos')
    localStorage.removeItem('inicia_turno')
    localStorage.removeItem('minutos')
    localStorage.removeItem('segundos')
  }

$(document).ready(function () {
    renderSopa();
    limpiar();
});

$('#listarSopa').click(function () { 
    renderSopa();
    limpiar();
})

const deleteSopa = (codigo) => {
    eliminar({
        itmCodigoJuego:codigo
    },
    function (response) {  
        Swal.fire({
            icon: 'success',
            title: response.mensaje
          })
        renderSopa()
    })
}

const restaurarSopa = (codigo) => {
    restaurar({
        itmCodigoJuego:codigo
    },
    function (response) {  
        Swal.fire({
            icon: 'success',
            title: response.mensaje
          })
        renderSopa()
    })
}


$('#content-app').on('click','.delete-sopa',function () { 
    var key = $(this).data('key')
    // console.log(key)
    deleteSopa(key)
});


$('#content-app').on('click','.restaurarSopa',function () { 
    var key = $(this).data('key')
    restaurarSopa(key)
});

const formSopa = () => {
    CodigoJuegoSopa = null;
    let renderHtml = `<div class="form-nuevo">
                        <div class="row">
                        <button class="cerrar how-pos3 hov3">
                        <img id="cerrar" src="assets/web/img/icon-close.png" alt="CLOSE">
                    </button>
                            <div class="col-xl-8">
                                <div class="input-field">
                                    <input id="itmTitulo" name="itmTitulo" type="text" class="validate executeBorrador">
                                    <label for="itmTitulo">Título <span class="text-danger">*</span></label>
                                </div>
                            </div>
                            <div class="col-xl-4">
                                <div class="input-field">
                                    <input id="itmTiempo" name="itmTiempo" type="number" min="1" max="10" class="validate executeBorrador">
                                    <label for="itmTiempo">Tiempo <small>(1 a 10 min)</small> <span class="text-danger">*</span></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                           <div class="col-xl-8">
                                <div class="input-field render-tema">

                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-xl-3 my-auto">
                                <label class="mt-2">
                                    <input type="checkbox" class="filled-in" name="itmPrivado" id="itmPrivado" />
                                    <span>Privado</span>
                                </label>
                            </div>
                            
                            <div class="col-xl-5 my-auto">
                                <label for="itmFondo">Fondo <span class="text-danger">*</span> </label>
                                <input id="itmFondo" name="itmFondo" type="color" value="#8F1526" class="input-field validate">
                            </div>
                        </div>
                        <hr class="text-primary mb-1" />
                        <div class="row">
                        <div class="col-xl-6">
                            <div class="input-field">
                                
                                Filas: <input id="itmFilas" name="itmFilas" type="number" min="1" readOnly="true">
                            </div>
                        </div>

                        <div class="col-xl-6">
                            <div class="input-field">
                                Columnas:   <input id="itmColumnas" name="itmColumnas" type="number" min="1" readOnly="true">
                            </div>
                        </div>
                    </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row mx-0">
                                    <div class="col-xl-10 px-0">
                                        <div class="input-field">
                                            <input id="itmPalabras" maxlength="12" name="itmPalabras" type="text" class="validate executeBorrador">
                                            <label for="itmPalabras">Palabras <span class="text-danger">*</span></label>
                                        </div>
                                    </div>
                                    <div class="col-xl-2 my-auto">
                                        <button type="button" id="btnAgregarPalabra" class="btn btn-danger btn-sm btn-mod">
                                            <i class="material-icons">add</i>
                                        </button>
                                        <input type="hidden" name="listKeyPalabras" id="listKeyPalabras" />
                                    </div>
                                </div>
                                
                                <div class="row cl-caja">
                                    <div class="col-12">
                                        <h2 class="h5 mt-3">Palabras Agregadas</h2>
                                    </div>
                                    <div class="col-12 content-mod" id="contentPalabras"></div>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="row mx-0">
                                    <div class="col-xl-10 px-0">
                                        <div class="input-field">
                                            <input id="itmTrampas" maxlength="12" name="itmTrampas" type="text" class="validate executeBorrador">
                                            <label for="itmTrampas">Trampas <span class="text-danger">*</span></label>
                                        </div>
                                    </div>
                                    <div class="col-xl-2 my-auto">
                                        <button type="button" class="btn btn-danger btn-sm btn-mod" id="btnAgregarTrampa">
                                            <i class="material-icons">add</i>
                                        </button>
                                        <input type="hidden" name="listKeyTrampas" id="listKeyTrampas" />
                                    </div>
                                </div>

                                <div class="row cl-caja">
                                    <div class="col-12">
                                        <h2 class="h5 mt-3">Trampas Agregadas</h2>
                                    </div>
                                    <div class="col-12 content-mod" id="contentTrampas"></div>
                                </div>
                      
                            </div>
                        </div>

                        
                        <div class="row mt-3">
                            <div class="col-xl-12" style="text-align: right">
                                <button id="enviarSopaLetras" class="btn btn-outline-primary btnSend" type="submit" name="action">Registrar
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </div>`
    $('.render-html').html(renderHtml);
}

$('#nuevoSopa').click(function () {  
    limpiar();
    formSopa();
    listarTema(0);
})

// $(document).on('change','.executeBorrador',function () {
//     if(CodigoJuegoSopa == null){
//         store({
//             itmTitulo: $('#itmTitulo').val(),
//             itmTiempo: $('#itmTiempo').val(),
//             itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
//             itmFondo: $('#itmFondo').val(),
//             CodigoTema: $('#itmTema').val()
//           },
//           function (response) { 
//             console.log(response);
//             CodigoJuegoSopa = response.codigo        
//         })
//     }else{
//         editar({
//             itmTitulo: $('#itmTitulo').val(),
//             itmTiempo: $('#itmTiempo').val(),
//             itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
//             itmFondo: $('#itmFondo').val(),
//             CodigoTema: $('#itmTema').val(),
//             itmCodigoJuego:CodigoJuegoSopa,
//             itmRegistro:'NO'
//           },
//           function (response) { 
//             console.log(response);
            
//         })
//     }
// })

$('#content-app').on('click','.btnSend',function () {
    let listKeyPalabras = $('#listKeyPalabras').val()
    let lista = listKeyPalabras.split(',');
    let stringPalabrasList = ''
    lista.forEach(elem => {
        let valor = $('#palabra_'+elem).val()
        if (valor != null) {
            stringPalabrasList +=valor+','
        }
    })

    let stringTrampasList = ''
    let listKeyTrampas = $('#listKeyTrampas').val()
    lista = listKeyTrampas.split(',');
    lista.forEach(elem => {
        let valor = $('#trampa_'+elem).val()
        if (valor != null) {
            stringTrampasList +=valor+','
        }
    })

    
    let objeto = {
        itmTitulo: $('#itmTitulo').val(),
        itmTiempo: $('#itmTiempo').val(),
        CodigoTema: $('#itmTema').val(),
        itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
        itmFondo: $('#itmFondo').val(),
        itmFilas: $('#itmFilas').val(),
        itmColumnas: $('#itmColumnas').val(),
        listPalabras: stringPalabrasList,
        listTrampas: stringTrampasList,
        itmCodigoJuego:CodigoJuegoSopa
    }
    // console.log('objeto', objeto);

    
    var titul= document.getElementById('itmTitulo').value;
    var tem = document.getElementById('itmTema').value;
    var tiemp = document.getElementById('itmTiempo').value;

    if(stringPalabrasList == "" || stringTrampasList == "" || titul.trim().length == "" || tem == -1 || (tiemp > 10 || tiemp < 1) ){
        Swal.fire({
            title: 'Completa los datos (*)',
            icon:'error',
            showDenyButton: false,
            showConfirmButton: false,
            showCancelButton: false,
        });
    }else{
        if (CodigoJuegoSopa == null) {
            store(objeto, function (response) {
                Swal.fire({
                    title: response.mensaje,
                    icon:'success',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Listar',
                    denyButtonText: `Nuevo`,
                  }).then((result) => {
                    if (result.isConfirmed) {  
                        renderSopa()
                    } else if (result.isDenied) {
                        $('#nuevoSopa').click()
                    }
                  })                
            })
        } else {
            editar(objeto, function (response) {
                Swal.fire({
                    title: response.mensaje,
                    icon:'success',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Listar',
                    denyButtonText: `Nuevo`,
                  }).then((result) => {
                    if (result.isConfirmed) {  
                        limpiar();
                        renderSopa()
                    } else if (result.isDenied) {
                        $('#nuevoSopa').click()
                    }
                  })                
            })
        }
    }


})

$('#content-app').on('click','.editar-sopa',function () { 
    var key = $(this).data('key')

    // console.log($(this).data('info'));
    var data = $(this).data('info')
    // console.log('data', data)
    // itmTitulo: $('#itmTitulo').val(),
    // itmTiempo: $('#itmTiempo').val(),
    // CodigoTema: $('#itmTema').val(),
    // itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
    // itmFondo: $('#itmFondo').val(),
    // itmFilas: $('#itmFilas').val(),
    // itmColumnas: $('#itmColumnas').val(),
    // listPalabras: stringPalabrasList,
    // listTrampas: stringTrampasList,
    // itmCodigoJuego:CodigoJuegoSopa

    formSopa();
    listarTema(data.CodigoTema);
    $('#itmTitulo').val(data.TitJuego).focus()
    $('#itmTiempo').val(data.Tiempo).focus()
    $('#itmPrivado').val(data.Privado).focus()
    $('#itmPrivado').prop('checked', (data.Privado==1?true:false))
    $('#itmFondo').val(data.Fondo).focus()
    $('#itmFilas').val(data.Filas).focus()
    $('#itmColumnas').val(data.Columnas).focus()
    
    // $('#enviarSopaLetras').removeClass('btnSend')
    // $('#enviarSopaLetras').addClass('btnEdit')
    $('#enviarSopaLetras').html(`Actualizar <i class="material-icons right">send</i>`)
    CodigoJuegoSopa = key
    
    renderList(data.Palabras, 'P');
    renderList(data.Trampas, 'T');
//
 //   window.setTimeout(function(){
 //       $('#itmTema').val(data.CodigoTema);
 //       $('select').formSelect();
 //   }, 500)
    
    // editarsopa-letra(key)
});

$('#content-app').on('click', '.jugar-sopa' , function () {

    // fetchIn
    // var script = document.createElement("script");  // create a script DOM node
    // script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" ;  // set its src to the provided URL
    // document.head.appendChild(script);  
    // import *  from 
    // <script language="javascript" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    
    var key = $(this).data('key')
    var data = $(this).data('info')
    console.log(data)
    let renderHtml = `<div class="list-sopa-letra">
                        <div class="col-12 item-sopa-letra">
                        <button class="cerrar how-pos3 hov3" style="right: 0px;">
                        <img id="cerrar" src="assets/web/img/icon-close.png" alt="CLOSE">
                    </button>
                            <div class="row">
                                <div class="col-xl-12">
                                    <h1 class="title-sopa-letra mb-1">Título: ${data.Titulo}</h1>
                                    <p class="my-0"><strong>Tema:</strong> ${data.Descripcion}</p>
                                </div>
                                <div class="col-xl-6">
                                    <p class="tiempo-sopa">Tiempo: <strong class="text-danger"> <span id="min">-</span>:<span id="seg">-</span> min.</strong>
                                    </p>
                                </div>
                                <div class="col-xl-6" id="seccionTerminar">
                                    <button type="button" class="btn btn-outline-primary" id="btnTerminar">Terminar Turno</button>
                                </div>
                            </div>
                            <div class="row mt-1" id="renderResult">
                                <div class="col-xl-12" style="background: ${data.Fondo}">
                                    <div class="main-container">
                                        <div id="juego"></div>
                                    </div>
                                </div>
                                <div class="col-xl-12" style="background: ${data.Fondo}">
                                    <div class="row">
                                        <div class="col-8">
                                          <h5>Palabras:</h5>
                                        </div>
                                        <div class="col-8">
                                            <div id="palabras"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
    $('.render-html').html(renderHtml);
    
    // console.log(data.Palabras)
    // console.log(data.Trampas)
    let palabras = data.Palabras.slice(0,-1);
    let listPalabras = palabras.split(',');
    
    let trampas = data.Trampas.slice(0,-1);
    let listTrampas = trampas.split(',');
    
    var gamePuzzle = wordfindgame.create(listPalabras, listTrampas, '#juego', '#palabras'); 
  
    // console.log("gamePuzzle",gamePuzzle)
    var puzzle = wordfind.newPuzzle(listPalabras,{height: data.Filas, width:data.Columnas, fillBlanks: false}, listTrampas);
    wordfind.print(puzzle);
          
    if (localStorage.getItem('minutos') == null && 
        localStorage.getItem('segundos') == null) {
        localStorage.setItem('minutos', data.Tiempo)
        localStorage.setItem('segundos', 0)     
    
        localStorage.setItem('duracion_minutos', data.Tiempo+':00')
        localStorage.setItem('palabras_total', listPalabras.length)

        let formato = "yyyy-mm-dd";
        let fecha =  formatoFecha(formato);
        let formatoH = "hh:mm:ss";
        let hora =  formatoHora(formatoH);
            
        localStorage.setItem('inicia_turno', `${fecha} ${hora}.000`)
        localStorage.setItem('key_juego', `${key}`)
    }
    stopTiempo = 0
    initTemporizador()
  
});

// $('#content-app').on('click','.btnEdit',function () { 
//     editar({
//         itmTitulo: $('#itmTitulo').val(),
//         itmTiempo: $('#itmTiempo').val(),
//         itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
//         itmFondo: $('#itmFondo').val(),
//         CodigoTema: $('#itmTema').val(),
//         itmCodigoJuego:CodigoJuegoSopa,
//         itmRegistro:'NO'
//       },
//       function (response) { 
//         Swal.fire({
//             title: response.mensaje,
//             icon:'success',
//             showDenyButton: true,
//             showCancelButton: false,
//             confirmButtonText: 'Listar',
//             denyButtonText: `Nuevo`,
//           }).then((result) => {
//             if (result.isConfirmed) {  
//                 renderSopa()
//             } else if (result.isDenied) {
//                 $('#nuevoSopa').click()
//             }
//           })
//     })
// })

$('#content-app').on('click','#btnAgregarPalabra',function () { 
    let elemPalabra   = $('#itmPalabras');
    let palabra = elemPalabra.val();

    let index = palabras.findIndex(obj => obj == palabra);
    let index2 = trampas.findIndex(obj => obj == palabra);
    if(index != -1 || index2 != -1 ){

        //
        Swal.fire({
            title: 'La palabra ya está en la lista',
            icon:'error',
            showDenyButton: false,
            showConfirmButton: false,
            showCancelButton: false,
        });


    }else{
        if (palabra != '') {
            
            let listKey   = $('#listKeyPalabras').val();
            let lista     = listKey.split(',');
            let key       = generarAleatorio(lista);
            lista.push(key)

            let htmlElement = `<div class="row" id="row_${key}">
                                <div class="col-10 px-0">
                                    <input type="text" class="form-control form-control-sm form-mod f-xs-size"
                                    aria-label="${palabra}"
                                    value="${palabra}" id="palabra_${key}" name="palabra_${key}" readonly=""/>
                                </div>    
                                <div class="col-2 px-0">
                                <button data-key="${key}" data-info="${palabra}" class="btn btn-outline-secondary bg-danger text-white btn-mod-e btn-eliminar-palabra"
                                    type="button">x</button>
                                </div>
                            </div>`;

            $('#contentPalabras').append(htmlElement);
            $('#listKeyPalabras').val(lista.join(',')); 
            palabras.push(palabra);
            elemPalabra.val("");
            elemPalabra.focus();
            
            let max = calcularCantFilasColumnas()
            $('#itmFilas').val(max);
            $('#itmColumnas').val(max);

        } else {
            Swal.fire({
                title: 'Indique Palabra',
                icon:'error',
                showDenyButton: false,
                showConfirmButton: false,
                showCancelButton: false,
            });
        }
    }
});

$('#content-app').on('click', '#btnTerminar', function() {
    terminarTurno();
});

$('#content-app').on('click', '.btn-eliminar-palabra', function () {
    var key = $(this).data('key');
    var palabra = $(this).data('info');
    let listKey   = $('#listKeyPalabras').val();
    let lista     = listKey.split(',');
    let indexI = -1;

    lista.forEach((elem,index) => {
        if (elem == key) {
            indexI = index;        
        }
    })

    let index = palabras.findIndex(obj => obj == palabra);
    
    if(index != -1){
        palabras.splice(index,1);
    }


    // console.log('indexI', indexI);
    if (indexI != -1) {
        lista.splice(indexI,1);
        $('#listKeyPalabras').val(lista.join(','));
        $('#row_'+key).remove();    

        let max = calcularCantFilasColumnas()
        $('#itmFilas').val(max);
        $('#itmColumnas').val(max);

    } else {
        Swal.fire({
            title: 'Key de Referencia no Encontrado',
            icon:'error',
            showDenyButton: false,
            showConfirmButton: false,
            showCancelButton: false,
        });
    }
         
    // alert('key:' + key)
});

$('#content-app').on('click','#btnAgregarTrampa',function () { 
    let elemPalabra   = $('#itmTrampas');
    let palabra = elemPalabra.val();

    let index = palabras.findIndex(obj => obj == palabra);
    let index2 = trampas.findIndex(obj => obj == palabra);
    if(index != -1 || index2 != -1 ){

        //
        Swal.fire({
            title: 'La palabra ya está en la lista',
            icon:'error',
            showDenyButton: false,
            showConfirmButton: false,
            showCancelButton: false,
        });


    }else{

    if (palabra != '') {
        
        let listKey   = $('#listKeyTrampas').val();
        let lista     = listKey.split(',');
        let key       = generarAleatorio(lista);

        lista.push(key)

        let htmlElement = `<div class="row" id="row_trampa_${key}">
                            <div class="col-10 px-0">
                                <input type="text" class="form-control form-control-sm form-mod f-xs-size"
                                aria-label="${palabra}"
                                value="${palabra}" name="trampa_${key}" id="trampa_${key}" readonly=""/>
                            </div>    
                            <div class="col-2 px-0">
                            <button data-key="${key}" data-info="${palabra}" class="btn btn-outline-secondary bg-danger text-white btn-mod-e btn-eliminar-trampa"
                                type="button">x</button>
                            </div>
                        </div>`;

        $('#contentTrampas').append(htmlElement);

        $('#listKeyTrampas').val(lista.join(','));
        elemPalabra.val("");
        elemPalabra.focus();
        trampas.push(palabra);
        let max = calcularCantFilasColumnas()
        $('#itmFilas').val(max);
        $('#itmColumnas').val(max);
        
    } else {
        Swal.fire({
            title: 'Indique Trampa',
            icon:'error',
            showDenyButton: false,
            showConfirmButton: false,
            showCancelButton: false,
        });
    }
}
});

$('#content-app').on('click', '.btn-eliminar-trampa', function () {
    var key = $(this).data('key');
    var palabra = $(this).data('info');
    let listKey   = $('#listKeyTrampas').val();
    let lista     = listKey.split(',');
    let indexI = -1;

    lista.forEach((elem,index) => {
        if (elem == key) {
            indexI = index;        
        }
    })

    let index = trampas.findIndex(obj => obj == palabra);
    
    if(index != -1){
        trampas.splice(index,1);
    }

    // console.log('indexI', indexI);
    if (indexI != -1) {
        lista.splice(indexI,1);
        $('#listKeyTrampas').val(lista.join(','));
        $('#row_trampa_'+key).remove();    

        let max = calcularCantFilasColumnas()
        $('#itmFilas').val(max);
        $('#itmColumnas').val(max);

    } else {
        Swal.fire({
            title: 'Key de Referencia no Encontrado',
            icon:'error',
            showDenyButton: false,
            showConfirmButton: false,
            showCancelButton: false,
        });
    }
         
    // alert('key:' + key)
});


function renderList (stringList, tipo) {
    let lista = stringList.split(',')
    let listaRender = []
    let htmlElement = ``
    if (tipo == 'P') {
        lista.forEach (palabra => {
            if (palabra != '' ) {
                let key       = generarAleatorio(listaRender);
                listaRender.push(key)
                palabras.push(palabra);
                htmlElement += `<div class="row" id="row_${key}">
                                    <div class="col-10 px-0">
                                        <input type="text" class="form-control form-control-sm form-mod f-xs-size"
                                        aria-label="${palabra}"
                                        value="${palabra}" id="palabra_${key}" name="palabra_${key}" readonly=""/>
                                    </div>    
                                    <div class="col-2 px-0">
                                    <button data-key="${key}" data-info="${palabra}" class="btn btn-outline-secondary bg-danger text-white btn-mod-e btn-eliminar-palabra"
                                        type="button">x</button>
                                    </div>
                                </div>`;
            }
        })

        $('#listKeyPalabras').val(listaRender.join(','));
        $('#contentPalabras').append(htmlElement);
    } else {
        lista.forEach (palabra => {
            if (palabra != '') {
                let key       = generarAleatorio(listaRender);
                listaRender.push(key)
                trampas.push(palabra);
                htmlElement += `<div class="row" id="row_trampa_${key}">
                                    <div class="col-10 px-0">
                                        <input type="text" class="form-control form-control-sm form-mod f-xs-size"
                                        aria-label="${palabra}"
                                        value="${palabra}" name="trampa_${key}" id="trampa_${key}" readonly=""/>
                                    </div>    
                                    <div class="col-2 px-0">
                                    <button data-key="${key}" data-info="${palabra}" class="btn btn-outline-secondary bg-danger text-white btn-mod-e btn-eliminar-trampa"
                                        type="button">x</button>
                                    </div>
                                </div>`;
        
            }
        })

        $('#listKeyTrampas').val(listaRender.join(','));
        $('#contentTrampas').append(htmlElement);    
    }
}

function generarAleatorio(arreglo) {
    let band = false;
    let num = 0;
    let max = 99999;
    let min = 1;
    do {
        num = Math.floor(Math.random() * (max + 1) - min) + min;
        band = isEncontrado(arreglo, num);
    } while (band == true);

    return num;
}

function isEncontrado(arreglo, valor) {
    return arreglo.includes(valor);
}

function calcularCantFilasColumnas () {
    let maxLength = 0;
    let listaPalabras = $('#listKeyPalabras').val();
    let listaTrampas = $('#listKeyTrampas').val();

    let listP = listaPalabras.split(',')
    let listT = listaTrampas.split(',')

    listP.forEach(elem => {
        let valor = $('#palabra_'+elem).val()
        if (valor != null) {
            if (valor.length > maxLength) {
                maxLength = valor.length
            }
        }
    })

    listT.forEach(elem => {
        let valor = $('#trampa_'+elem).val()
        if (valor != null) {
            if (valor.length > maxLength) {
                maxLength = valor.length
            }
        }

    })

    return maxLength
}

function initTemporizador () {
    let minutos = localStorage.getItem('minutos');
    let segundos = localStorage.getItem('segundos');
    
    // terminarTurno(minutos, segundos);
    if (minutos >= -1) {
        // if (segundos > 0) {
        var myInterval = setInterval(function () {
                if (segundos == 0) {
                    $('#min').text((minutos<10?'0'+(minutos<0?0:minutos):minutos))
                    $('#seg').text((segundos<10?'0'+segundos:segundos))
                    // console.log('tiempo', minutos+':'+segundos)
                    localStorage.setItem('minutos', minutos)
                    localStorage.setItem('segundos', segundos) 
                    segundos = 60;
                }

                if (segundos == 60) {
                    segundos = 59; 
                    minutos--;
                }
                $('#min').text((minutos<10?'0'+(minutos<0?0:minutos):minutos))
                $('#seg').text((segundos<10?'0'+segundos:segundos))
                
                localStorage.setItem('minutos', minutos)
                localStorage.setItem('segundos', segundos) 
                
                // console.log('segundos', segundos)
                segundos--;

                if (stopTiempo == 1) {
                    clearInterval(myInterval)
                    localStorage.removeItem('minutos')
                    localStorage.removeItem('segundos') 
                }
            }, 1000);
        // }
    } else {
        // JUEGO TERMINADO POR TIEMPO
        terminarTurno();   
        // console.log('duracionF', lapso)
        // console.log('lapsoF', lapsoF)
      

    }
}


$('#content-app').on('click','.cerrar',function () { 
    renderSopa();
    limpiar();
});

function terminarTurno () {
    let total_palabras = localStorage.getItem('palabras_total');
    let duracion = localStorage.getItem('duracion_minutos');
    let formato = "yyyy-mm-dd";
    let fecha =  formatoFecha(formato);
    // let duracionF = '';
    // let transcF = '';
    stopTiempo = 1;
    let formatoH = "hh:mm:ss";
    let hora =  formatoHora(formatoH); 
    let duracionF = moment(`${fecha} ${hora}.000`)
    let transcF = moment(localStorage.getItem('inicia_turno'))
    let turno = duracionF.diff(transcF);
    let duracionTurno = moment(turno).format('mm:ss')

    let palabrasRender = $('.word.wordFound').map(function() {
        return this.innerHTML;
        // console.log(this.innerHtml)
    }).get();

    let arrDuracion = duracion.split(':');
    let duracionSeg = (parseFloat(arrDuracion[0]) * 60) + parseFloat(arrDuracion[1]);

    let arrDuracionTurno = duracionTurno.split(':');
    let duracionTurnoSeg = (parseFloat(arrDuracionTurno[0]) * 60) + parseFloat(arrDuracionTurno[1]);
    
    let puntaje = (duracionSeg/duracionTurnoSeg) * (palabrasRender.length/total_palabras);
   
    // console.log('puntaje', puntaje)
    // console.log('puntajeFix', puntaje.toFixed(2))
    limpiar();


    $('#renderResult').html(`
        <div class="col-10">
            Su puntaje obtenido en el Juego es: <strong class="text-danger"> ${puntaje.toFixed(2)}</strong>
        </div>
    `)

    $('#seccionTerminar').empty();
    
}

function formatoFecha(formato) {
    const fecha = new Date();
    let resp = formato
        .replace(
            "mm",
            fecha.getMonth() + 1 < 10
                ? "0" + (fecha.getMonth() + 1)
                : fecha.getMonth() + 1
        )
        .replace("yyyy", fecha.getFullYear())
        .replace(
            "dd",
            fecha.getDate() < 10
                ? "0" + fecha.getDate()
                : fecha.getDate()
        );
    // console.log(`resp`, resp)
    return resp;
}

function formatoHora(formato) {
    const fecha = new Date();
    let resp = formato
        .replace(
            "hh",
            fecha.getHours() < 10
                ? "0" + (fecha.getHours())
                : fecha.getHours()
        )    
        .replace(
            "mm",
            fecha.getMinutes() < 10
                ? "0" + (fecha.getMinutes())
                : fecha.getMinutes()
        )
        .replace(
            "ss",
            fecha.getSeconds() < 10
                ? "0" + fecha.getSeconds()
                : fecha.getSeconds()
        );
    // console.log(`resp`, resp)
    return resp;
}



/// agregar juego a competencia

const htmlRenderPreloader = () => {
    return `<div class="progress">
                <div class="indeterminate"></div>
            </div>`
}

const renderItemJuego = (element) => {
    return `<div style="width:100%;margin: 10px 0px;box-shadow: 1px 1px 15px 1px rgb(0 0 0 / 10%);border-left: 5px solid rebeccapurple;">
        <div class="d-flex align-items-center">
            <div style="width:100%;padding:0px" class="col-1">
                <div><img style="width: 100%;" src="assets/web/img/verdugo.png" alt=""></div>                     
            </div>
            <div id="game" data-key="${element.CodigoJuego}" class="col-11">${element.TitJuego} </span></div>
        </div>
    </div>`
}

const renderItemCompetencia = (element) => {
    return `<div style="width:100%;margin: 10px 0px;box-shadow: 1px 1px 15px 1px rgb(0 0 0 / 10%);border-left: 5px solid rebeccapurple;">
        <div class="d-flex align-items-center">
            <div style="width:100%;padding:0px" class="col-1">
                <div><img style="width: 100%;" src="assets/web/img/list.png" alt=""></div>                     
            </div>
            <div class="col-9">${element.Nombre}</div>
            <div class="col-2">
                <a data-key="${element.Codigo}" class="btnAddJuego waves-effect waves-light btn text-white"><i class="material-icons prefix">add</i></a>
              
                
            </div>
        </div>
    </div>`
}

$('#content-app').on('click','.agregar-competencia',function () {
    $('.render-juego').html(htmlRenderPreloader())

    var data = $(this).data('info')
    var htmlRender = renderItemJuego(data)
    $('.render-juego').html(htmlRender)
    listarCompetencias(function (response) {  
        if (response.data.length > 0) {
            ListaCompetencia = response.data 
        }
    })
});

const buscarJuegoCompetencia = (cod) => {
    var key2 = $('#game').data('key');
    juegoCompetencia(cod,function (response) {  
        ListaJuegosCompetencia = response.data;
        let findIndex = ListaJuegosCompetencia.findIndex(obj => obj.CodigoJuego == key2);
        if(findIndex != -1){
            Swal.fire({
                icon: 'info',
                title: 'El juego ya está en la competencia'
              })
      
         }else{
            editarCompetencia({
                itmCodigoJuego: key2,
                itmCodigoCompetencia: cod
              },
              function (response) { 
                Swal.fire({
                    title: response.mensaje,
                    icon:'success',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Salir',
                  }).then((result) => {
                    if (result.isConfirmed) {  
                        renderSopa();
                        $('.itmBuscarCompetencia').val("");
                        $('.render-competencia').html('');
                        $('.modal').modal('close');
                    }
                  })
            })
      
        }
    
        })
        
}



$(document).on('click','.btnAddJuego',function () {  
    let key = $(this).data('key');
    buscarJuegoCompetencia(key);
})


$('.itmBuscarCompetencia').keyup(function () {  
    let key2 = $('#game').data('key');
    $('.render-competencia').html(htmlRenderPreloader())
    let filter = ListaCompetencia.filter(obj => obj.Nombre.toUpperCase().includes($(this).val().toUpperCase()) == true); 
    let htmlRenderCompetencias = '';
    if ($(this).val() != '') {
        filter.forEach(element => {
 
            htmlRenderCompetencias += renderItemCompetencia(element)
            

        });
    }
    $('.render-competencia').html(htmlRenderCompetencias)
})

$(document).on('click','.modal-close',function () {  
    $('.itmBuscarCompetencia').val("");
    $('.render-competencia').html('')
    
})

$(document).on('click','.modal-overlay',function () {  
    $('.itmBuscarCompetencia').val("");
    $('.render-competencia').html('')
    
})
