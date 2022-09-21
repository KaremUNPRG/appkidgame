import { store, list,eliminar, editar,restaurar,listarCompetencias,editarCompetencia} from "../components/api/Ahorcado.js";
import { lista } from "../components/api/Tema.js";
import { listarJuego, juegoCompetencia } from "../components/api/Competencia.js";

var oculta = [];
var CodigoAhorcado = null
var stopTiempo = 0;
var cont = 6;
var palabra = "";
var TiempoG = 0;
var buttons = document.getElementsByClassName('letra');
var ListaCompetencia = [];
var ListaJuegosCompetencia = [];

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
                            <select id="itmTema" class="form-control">
                                <option value="-1">Seleccione tema...</option>
                                ${itemTema}
                            </select> 
                        `;
            $('.render-tema').html(htmlRender);
            $('.dropdown-trigger').dropdown();
        })
}

const formAhorcado = () => {
    CodigoAhorcado = null
    let htmlRender = ` 
          
                
                    <div class="form-nuevo bg-light">
                        
                        <!--
                        <div class="row">
                            <div class="col-xl-12 text-center">
                                <h3 style="font-weight: 900; color: #1eaaf1;">REGISTRAR AHORCADO</h3>
                            </div>
                        </div>
                        -->

                        <div class="row">

                            <button class="cerrar how-pos3 hov3">
                                <img id="cerrar" src="assets/web/img/icon-close.png" alt="CLOSE">
                            </button>
            
                                <div class="col-xl-8">
                                <div class="input-field">
                                    <input type="text" class="validate executeBorrador" id="itmTitulo">
                                    <label for="itmTitulo">Título <span class="text-danger">*</span></label>
                                    </div> 
                                </div>

                                <div class="col-xl-4">  
                                <div class="input-field">     
                                    <input type="number" id="itmTiempo" min="1" max="5" class="validate executeBorrador">
                                    <label for="itmTiempo">Tiempo <small>(1 a 5 min)</small> <span class="text-danger">*</span></label>
                                </div> 
                                </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-8 render-tema">  
                        
                            </div>
                        </div>

                        <hr class="text-primary mb-1">

                        <div class="row">
                            <div class="col-xl-6">  
                                <div class="input-field">       
                                    <input type="text" id="itmPalabra" class="validate executeBorrador">
                                    <label for="itmPalabra">Palabra <span class="text-danger">*</span></label>
                                </div>  
                            </div>
                            <div class="col-xl-6">  
                                <div class="input-field">         
                                <input type="text" id="itmPistas" class="validate executeBorrador" >
                                <label for="itmPistas">Pista <span class="text-danger">*</span></label>
                            </div>        
                            </div>
                   
                            <div class="form-group col-xl-6">
                                <div class="">
                                    <label for="itmFondo">Fondo * </label>
                                    <input id="itmFondo" type="color" value="#7DBF85" class="validate">
                                </div>
                            </div>
                            <div class="form-group col-xl-3">
                            
                                <label class="switchBtn">

                                <input id="itmPrivado" class="inputc form-control" type="checkbox" name="visibilidad">
    
                            
                                <div class="slide round">Privado</div>

                                </label>
                    
                            </div>

                            

                        </div>
                        <div class="row">
                            <div class="col-xl-12" style="text-align: right">
                                <br>
                                <button id="sendAhorcado" class="btn btn-outline-primary btnSend" type="submit" name="action">Registrar 
                                    <i class="material-icons right">send</i>
                                </button>
                                    
                            </div>
                           
                        </div>
                    </div>
                         `;
    $('.render-html').html(htmlRender);
}

$('#nuevoAhorcado').click(function () {  
    limpiar();
    formAhorcado();
    listarTema(0);
})


$('#content-app').on('click','.btnSend',function () { 
    const fecha = new Date();
    const format = fecha.getFullYear() +"-"+ (fecha.getMonth() +1) + "-" +fecha.getDate();

    var titul = document.getElementById('itmTitulo').value;
    var palabr = document.getElementById('itmPalabra').value;
    var tem = document.getElementById('itmTema').value;
    var pist = document.getElementById('itmPistas').value;
    var tiemp = document.getElementById('itmTiempo').value;

    if(titul.trim().length == 0 || palabr.trim().length == 0 || tem == -1 || pist.trim().length == 0 || (tiemp > 5 || tiemp < 1) ){
        Swal.fire({
            title: 'Completa los datos (*)',
            icon:'error',
            showDenyButton: false,
            showConfirmButton: false,
            showCancelButton: false,
        });
    }else{

    store({
        itmTitulo: $('#itmTitulo').val(),
        itmTema: $('#itmTema').val(),
        itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
        itmFecha: format,
        itmFondo: $('#itmFondo').val(),
        itmPalabra: $('#itmPalabra').val(),
        itmPistas: $('#itmPistas').val(),
        itmTiempo: $('#itmTiempo').val()

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
                renderAhorcado()
            } else if (result.isDenied) {
                $('#nuevoAhorcado').click()
            }
          })
    })
}
})





const renderAhorcado = () => {
    list(function (response) {  
        let itemAhorcado = '';
        let aux = '';
        response.data.forEach(function (element, index) {
            if(element.Privado == 1){
                aux = "Privado"    
            }else{
                aux = "Público" 
            }
            if(element.Vigente == 1){
            itemAhorcado += ` <div style="border-left: 4px solid #1eaaf1; " class="col-12 item-ahorcado">
                                <div class="row justify-content-between">
                                     <div class="col">
                                            <p style="color: #1eaaf1;" class="title-ahorcado">Titulo: ${element.TitJuego} <span style="color: #6c757d;">(${element.Palabra})</span></p>
                                            <p>Tiempo: ${element.tiempo} minuto(s)</p>
                                            <p style="color: #28a745;">${aux}</p>
                                    </div>
                                 <div>
                                <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
                                    <i class="material-icons" style="font-size: 2rem">more_vert</i>
                                </a>
                                <ul id='dropdown${index}' class='dropdown-content'>
                                    <li><a href="#!" class="editarAhorcado" data-info='${JSON.stringify(element)}' data-key="${element.Codigo}"><i class="material-icons">create</i>Editar</a></li>
                                    <li><a href="#!" class="deleteAhorcado" data-key="${element.Codigo}"><i class="material-icons">delete</i>Eliminar</a></li>
                                    <li><a href="#!" class="jugar-ahorcado" data-info='${JSON.stringify(element)}' data-key="${element.Codigo}"><i class="material-icons">arrow_right</i>Probar</a></li>
                                    <li><a href="#!" class="modal-trigger agregar-competencia" data-info='${JSON.stringify(element)}' data-key="${element.Codigo}" data-target="modal1"><i class="material-icons">add</i>Agregar a competencia</a></li>
                                </ul>                                  
                </div>
            </div>
        </div>`}else{ 
            
        itemAhorcado += ` <div style="border-left: 4px solid grey;" class="col-12 item-competencia">
        <div class="row justify-content-between">
             <div class="col">
                    <p class="title-ahorcado">${element.TitJuego} <span style="color: #6c757d;">(${element.Palabra})</span></p></p>
                    <p>Tiempo: ${element.tiempo} minuto(s)</p>
                    <p>Eliminado</p>
            </div>
         <div>
        <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
            <i class="material-icons" style="font-size: 2rem">more_vert</i>
        </a>
        <ul id='dropdown${index}' class='dropdown-content'>
            <li><a href="#!" class="restaurarAhorcado" data-key="${element.Codigo}"><i class="material-icons">create</i>Restaurar</a></li>
        </ul>                                  
</div>
</div>
</div>`

        }
        });
        let htmlRender = `<div class="list-ahorcado">
                                ${itemAhorcado}
                            </div>`;
        $('.render-html').html(htmlRender);
        $('.dropdown-trigger').dropdown();
    })
}

const deleteAhorcado = (codigo) => {
    eliminar({
        Ahorcado:codigo
    },
    function (response) {  
        Swal.fire({
            icon: 'success',
            title: response.mensaje
          })
        renderAhorcado()
    })
}

const restaurarAhorcado = (codigo) => {
    restaurar({
        Ahorcado:codigo
    },
    function (response) {  
        Swal.fire({
            icon: 'success',
            title: response.mensaje
          })
        renderAhorcado()
    })
}



$('#listarAhorcado').click(function () { 
    renderAhorcado();
    limpiar();
})

$('#content-app').on('click','.cerrar',function () { 
    renderAhorcado();
    limpiar();
});


$('#content-app').on('click','.deleteAhorcado',function () { 
    var key = $(this).data('key')
    deleteAhorcado(key)
});

$('#content-app').on('click','.restaurarAhorcado',function () { 
    var key = $(this).data('key')
    restaurarAhorcado(key)
});

$('#content-app').on('click','.editarAhorcado',function () { 
    var key = $(this).data('key')
    
    
    // console.log($(this).data('info'));
    var data = $(this).data('info')
    formAhorcado();
    listarTema(data.CodTema);
    $('#itmTitulo').val(data.TitJuego).focus()
    $('#itmPalabra').val(data.Palabra).focus()
    $('#itmFondo').val(data.Fondo).focus()
    $('#itmPistas').val(data.Pista).focus()
    $('#itmTiempo').val(data.tiempo).focus()
    if(data.Privado == 1){
        $('#itmPrivado').prop("checked", true)
    }

    $('#sendAhorcado').removeClass('btnSend')
    $('#sendAhorcado').addClass('btnEdit')
    $('#sendAhorcado').html(`Editar <i class="material-icons right">edit</i>`)
    CodigoAhorcado = key
    // editarCompetencia(key)
});

$(document).ready(function () {
    renderAhorcado();
    limpiar();
});

$('#content-app').on('click','.btnEdit',function () { 
    console.log(CodigoAhorcado);
    const fecha = new Date();
    const format = fecha.getFullYear() +"-"+ (fecha.getMonth() +1) + "-" +fecha.getDate();
    
    var titul = document.getElementById('itmTitulo').value;
    var palabr = document.getElementById('itmPalabra').value;
    var tem = document.getElementById('itmTema').value;
    var pist = document.getElementById('itmPistas').value;
    var tiemp = document.getElementById('itmTiempo').value;

    if(titul.trim().length == 0 || palabr.trim().length == 0 || tem == -1 || pist.trim().length == 0 || (tiemp > 5 || tiemp < 1) ){
        Swal.fire({
            title: 'Completa los datos (*)',
            icon:'error',
            showDenyButton: false,
            showConfirmButton: false,
            showCancelButton: false,
        });
    }else{

    editar({
        itmTitulo: $('#itmTitulo').val(),
        itmPalabra: $('#itmPalabra').val(),
        itmPistas: $('#itmPistas').val(),
        itmFondo: $('#itmFondo').val(),
        itmTiempo: $('#itmTiempo').val(),
        itmFecha: format,
        itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
        itmTema: $('#itmTema').val(),
        Ahorcado: CodigoAhorcado
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
                renderAhorcado()
            } else if (result.isDenied) {
                $('#nuevoAhorcado').click()
            }
          })
    })

}
})


$('#content-app').on('click', '.jugar-ahorcado' , function () {

    var data = $(this).data('info')
    console.log(data)
    let renderHtml = `
                        <div style="border-left: 4px solid ${data.Fondo};" class="form-nuevo bg-light">
                        <button class="cerrar how-pos3 hov3">
					        <img id="cerrar" src="assets/web/img/icon-close.png" alt="CLOSE">
				        </button>
                            <div class="row">
                            
                                <div class="col-xl-12">
                                    <h1 class="title-ahorcado mb-1">Título: ${data.TitJuego}</h1>
                                    <p class="my-0"><strong>Tema:</strong> ${data.Tema}</p>
                                </div>
                                <div class="col-xl-6">
                                    <p class="tiempo">Tiempo: <strong class="text-danger"> <span id="min">-</span>:<span id="seg">-</span> min.</strong>
                                    </p>
                                    <span>Tu puntaje es: <p id="puntaje" class="my-0"></p></span>
                                </div>
                                <div class="col-xl-6">
                                    <p id="mensaje" class="my-0"></p>
                                </div>

                                
                            </div>
                            <div class="row" id="renderResult">
                                <div class="col-4">
            
                                    
                                    <picture>
                                      <img src="assets/web/img/ahorcadogame/ahorcado_6.png" alt="" id="image6">
                                      <img src="assets/web/img/ahorcadogame/ahorcado_5.png" alt="" id="image5">
                                      <img src="assets/web/img/ahorcadogame/ahorcado_4.png" alt="" id="image4">
                                      <img src="assets/web/img/ahorcadogame/ahorcado_3.png" alt="" id="image3">
                                      <img src="assets/web/img/ahorcadogame/ahorcado_2.png" alt="" id="image2">
                                      <img src="assets/web/img/ahorcadogame/ahorcado_1.png" alt="" id="image1">
                                      <img src="assets/web/img/ahorcadogame/ahorcado_0.png" alt="" id="image0">
                                    </picture>
                                    
                                    
                                </div>
                                <div class="col-8">
                                    <h2 class="palabra" id="palabra"></h2> 
                                    </div>
                                    </div>
                                <div class="col-xl-12">
                                    <div class="row">
                                        <div class="col-12" id="abcdario">

                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                    `
    $('.render-html').html(renderHtml);
    if (localStorage.getItem('minutos') == null && 
    localStorage.getItem('segundos') == null) {
    localStorage.setItem('minutos', data.tiempo)
    localStorage.setItem('segundos', 0)     
}
palabra = data.Palabra;
TiempoG= data.tiempo;
cont = 6;
stopTiempo = 0
initTemporizador()
generaABC("a","z");
pintarGuiones(palabra)
  
});


function pintarGuiones(_palabra) {
    for (var i = 0; i < _palabra.length; i++) {
      if(_palabra[i] == " "){
        oculta[i] = " ";
      }else{
        oculta[i] = "_";
      }
     
    }
    $('#palabra').html(oculta.join(""));
  }
  
  //Generar abecedario
  function generaABC (a,z) {
    document.getElementById("abcdario").innerHTML = "";
    var i = a.charCodeAt(0), j = z.charCodeAt(0);
    var letra = "";
    for( ; i<=j; i++) {
      letra = String.fromCharCode(i).toUpperCase();
      document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' data-key='" + letra + "' class='btn letra' id='"+letra+"'>" + letra + "</button>";
      if(i==110) {
        document.getElementById("abcdario").innerHTML += "<button value='1' data-key='1' class='btn letra' id='"+1+"'>Ñ</button>";
      }
    }
  }
  
  $('#content-app').on('click','.letra',function () { 
    var key = $(this).data('key')
    intento(key)
  });

  function intento(letra) {
    document.getElementById(letra).disabled = true;
    if(letra == 1){
      letra = "Ñ";
    }
    if(palabra.indexOf(letra) != -1) {
      for(var i=0; i<palabra.length; i++) {
        if(palabra[i]==letra) oculta[i] = letra;

      }
      $('#palabra').html(oculta.join(""));
    }else{
      cont--;
      $(`#image${cont}`).addClass('fade-in')
    }
    compruebaFin();
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
        let suma = (+$('#min').html())*60 + (+$('#seg').html());
        let cant = 0;
            for(var i=0; i<palabra.length; i++) {
                if(oculta[i] == palabra[i]) cant++;
            }
        terminarTurno(suma,cant);   
        // console.log('duracionF', lapso)
        // console.log('lapsoF', lapsoF)
      

    }
}


// Compruba si ha finalizado
function compruebaFin() {
    if( oculta.indexOf("_") == -1 ) {

      document.getElementById("mensaje").innerHTML = "GANASTE";
      let suma = (+$('#min').html())*60 + (+$('#seg').html());
      terminarTurno(suma,palabra.length);   
 
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
      
    }else if( cont == 0 ) {

      document.getElementById("mensaje").innerHTML = "PERDISTE";
     
      let suma = (+$('#min').html())*60 + (+$('#seg').html());
      
      let cant = 0;
      for(var i=0; i<palabra.length; i++) {
        if(oculta[i] == palabra[i]) cant++;
      }
      terminarTurno(suma,cant);

  
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }

    }
  }
  
  function limpiar(){
    stopTiempo = 1;
    oculta = [];
    localStorage.removeItem('palabras_total')
    localStorage.removeItem('duracion_minutos')
    localStorage.removeItem('inicia_turno')
    localStorage.removeItem('minutos')
    localStorage.removeItem('segundos')
  }

  function terminarTurno(suma, cant){

    var vidas = cont;

    var Ttotal = TiempoG*60;
    console.log(Ttotal);
    var puntaje = vidas*(suma/Ttotal)*(cant/palabra.length);
    limpiar();
    document.getElementById("puntaje").innerHTML = puntaje.toFixed(2);
  
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
            <div id="game" data-key="${element.Codigo}" class="col-11">${element.TitJuego} <span>(${element.Palabra})</span></div>
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
                        renderAhorcado();
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

