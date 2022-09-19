import { ahorcado,puntajeAhorcado,listaAhorcadoRelacionados,listaAhorcadoRelacionados2 } from "../components/api/Juego.js";
import { listaValoracion, insertValoracion } from "../components/api/Inicio.js";

// ### VARIABLES ###

let params = new URLSearchParams(location.search);
var ID = atob(params.get('id'));
// Palabra a averiguar
var palabra = "";
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;

// Botones de letras
var buttons = document.getElementsByClassName('letra');

var valoracionGlobal = 0;

var pistas = "";

var segundos = 0;

var minutos = 100;

var minutosG = "";

var tema = "";

var codUsuario = 0;

var  codigoJuegoGlobal = 0

// ### FUNCIONES ###
const renderAhorcado = () => {
          ahorcado({
            id: ID
          },
          function (response) {  
            response.data.forEach(function (element, index) {
            palabra = element.Palabra;
            minutos = element.tiempo -1;
            minutosG = element.tiempo;
            pistas = element.Pista;
            tema = element.TitTema;
            codUsuario = element.CodigoUsuario;
            codigoJuegoGlobal = element.Codigo;
            pintarGuiones(palabra);  
            $("#main-container").css("background", `${element.Fondo}`);
            //$("#main-container").css("background", `radial-gradient(circle, ${element.Fondo} 6%, #1C1C1C 100%)`);
            $('.titulo').html(element.TitJuego);
            $('.tema').html(element.TitTema);
            for (var i = 0; i < buttons.length; i++) {
              buttons[i].disabled = false;
            }
            renderAhorcadoRelacionados();
            });


})

}
function inicio() {
console.log(ID);
generaABC("a","z");
cargarSegundo();
cont = 6;
$('#intentos').html(cont);
}




// Funcion para pintar los guiones de la palabra
function pintarGuiones(_palabra) {
  for (var i = 0; i < _palabra.length; i++) {
    if(_palabra[i] == " "){
      oculta[i] = " ";
    }else{
      oculta[i] = "_";
    }
   
  }
  hueco.innerHTML = oculta.join("");
}

//Generar abecedario
function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' data-key='" + letra + "' class='btn letra' id='"+letra+"' disabled >" + letra + "</button>";
    if(i==110) {
      document.getElementById("abcdario").innerHTML += "<button value='1' data-key='1' class='btn letra' id='"+1+"' disabled>Ñ</button>";
    }
  }
}

$('#abcdario').on('click','.letra',function () { 
  var key = $(this).data('key')
  intento(key)
});


$('#content').on('click','.pista',function () { 
  $('.pista').html(pistas);
});

$('#content').on('click','.reset',function () { 
  renderAhorcado();
  inicio();
  segundos = 0;
});

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(letra == 1){
    letra = "Ñ";
  }
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "Bien!";
    document.getElementById("acierto").className += "acierto verde";
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Fallo!";
    document.getElementById("acierto").className += "acierto rojo";
    document.getElementById("image"+cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").className = ""; 
  }, 800);
}

//PUNTAJE

function mostrarPuntaje(suma, cant){

  var vidas = (+$('#intentos').html());
  var Ttotal = minutosG*60;
  var puntaje = vidas*(suma/Ttotal)*(cant/palabra.length);
  let htmlrender2= `Puntaje total: <span style="font-size: 20px;"> ${puntaje.toFixed(2)} </span>`
  $('#puntajeTotal').html(htmlrender2);
  Swal.fire({
    title: "Tu puntaje es: " + puntaje.toFixed(2),
    icon:'success',
    confirmButtonColor: '#3085d6',
    showCancelButton: true,
    confirmButtonText: `Valorar Juego!`
    }).then((result) => {
      if (result.isConfirmed) {  
        Swal.fire({
          icon: 'info',
          title: 'Debe iniciar sesión'
        })
      } 
    })

}

// Compruba si ha finalizado
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    clearInterval(time);
    let htmlrender = `<button id="reset" class="button-54 reset">Reiniciar</button>`

    document.getElementById("msg-final").innerHTML = "GANASTE";
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className = " encuadre";
    const fecha = new Date();
    let format = fecha.getFullYear() +"-"+ (fecha.getMonth() +1) + "-" +fecha.getDate();
    let suma = (+$('#minutos').html())*60 + (+$('#segundos').html());

    if(localStorage.getItem('accessToken')){
      htmlrender += `<button class="button-54 viewComentario modal-trigger" href="#mComentario" style="margin-top:10px;">Valorar</button>`
        puntajeAhorcado({
          
          Juego: ID,
          itmFecha: format,
          itmVidas: (+$('#intentos').html()),
          itmTiempoTotal: minutosG*60,
          itmTiempoDemorado: suma,
          itmDescubiertas: palabra.length,
          itmTotales: palabra.length
        },
        function (response) { 
          let htmlrender2= `Puntaje total: <span style="font-size: 20px;"> ${response.puntaje.toFixed(2)} </span>`
          $('#puntajeTotal').html(htmlrender2);
          Swal.fire({
              title: "Tu puntaje es: " + response.puntaje.toFixed(2),
              icon:'success',
              confirmButtonColor: '#3085d6',
              showCancelButton: true,
              confirmButtonText: `Valorar Juego!`
            }).then((result) => {
              if (result.isConfirmed) {  
                $('.viewComentario').click();
              } 
            })
      })
    }else{
      mostrarPuntaje(suma,palabra.length);
    }

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    //document.getElementById("reset").innerHTML = "Empezar";
    $('#content').html(htmlrender);
    $('#content').on('click','.reset',function () { 
      location.reload();
    });
    
  }else if( cont == 0 ) {
    clearInterval(time);
    let htmlrender = `<button id="reset" class="button-54 reset">Reiniciar</button>`
    document.getElementById("msg-final").innerHTML = "PERDISTE";
    document.getElementById("msg-final").className += "zoom-in";
    //document.getElementById("pista").disabled = true;
    const fecha = new Date();
    const format = fecha.getFullYear() +"-"+ (fecha.getMonth() +1) + "-" +fecha.getDate();
    let suma = (+$('#minutos').html())*60 + (+$('#segundos').html());
    let cant = 0;
    for(var i=0; i<palabra.length; i++) {
      if(oculta[i] == palabra[i]) cant++;
    }

    if(localStorage.getItem('accessToken')){
      htmlrender += `<button class="button-54 viewComentario modal-trigger" href="#mComentario" style="margin-top:10px;">Valorar</button>`
        puntajeAhorcado({
          
          Juego: ID,
          itmFecha: format,
          itmVidas: (+$('#intentos').html()),
          itmTiempoTotal: minutosG*60,
          itmTiempoDemorado: suma,
          itmDescubiertas: cant,
          itmTotales: palabra.length
        },
        function (response) { 
          let htmlrender2= `Puntaje total: <span style="font-size: 20px;"> ${response.puntaje.toFixed(2)} </span>`
          $('#puntajeTotal').html(htmlrender2);
          Swal.fire({
              title: "Tu puntaje es: " + response.puntaje.toFixed(2),
              icon:'success',
              confirmButtonColor: '#3085d6',
              showCancelButton: true,
              confirmButtonText: `Valorar Juego!`
            }).then((result) => {
              if (result.isConfirmed) {  
                $('.viewComentario').click();
              } 
            })
      })

}else{
  mostrarPuntaje(suma,cant);
}


    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    //document.getElementById("reset").innerHTML = "Empezar";
    $('#content').html(htmlrender);
    $('#content').on('click','.reset',function () { 
      location.reload();
    });
  }
}


// Iniciar
$(document).ready(function () {
  renderAhorcado();
  inicio();
});






//Definimos y ejecutamos los segundos
function cargarSegundo(){
    let txtSegundos;

    if(segundos < 0){
        segundos = 59; 
    }

    //Mostrar Segundos en pantalla
    if(segundos < 10){
        txtSegundos = `0${segundos}`;
    }else{
        txtSegundos = segundos;
    }
    document.getElementById('segundos').innerHTML = txtSegundos;
    segundos--;
    if(minutos != 100){
    cargarMinutos(segundos);
    }
}

//Definimos y ejecutamos los minutos
function cargarMinutos(segundos){
    let txtMinutos;

    if(segundos == -1 && minutos !== 0){
        setTimeout(() =>{
            minutos--;
        },500)
    }else if(segundos == -1 && minutos == 0){
        setTimeout(() =>{
            minutos = 59;
        },500)
    }

    //Mostrar Minutos en pantalla
    if(minutos < 10){
        txtMinutos = `0${minutos}`;
    }else{
        txtMinutos = minutos;
    }
    document.getElementById('minutos').innerHTML = txtMinutos;

    if(segundos < 0 && minutos== 0){
      clearInterval(time);
      let htmlrender = `<button id="reset" class="reset">Reiniciar</button>`
      document.getElementById("pista").disabled = true;
      document.getElementById("msg-final").innerHTML = "PERDISTE";
    document.getElementById("msg-final").className += "zoom-in";

    const fecha = new Date();
    const format = fecha.getFullYear() +"-"+ (fecha.getMonth() +1) + "-" +fecha.getDate();
    let cant = 0;
    let suma = (+$('#minutos').html())*60 + (+$('#segundos').html());
    for(var i=0; i<palabra.length; i++) {
      if(oculta[i] == palabra[i]) cant++;
    }

    if(localStorage.getItem('accessToken')){
      htmlrender += `<button class="button-54 viewComentario modal-trigger" href="#mComentario" style="margin-top:10px;">Valorar</button>`
        puntajeAhorcado({
          
          Juego: ID,
          itmFecha: format,
          itmVidas: (+$('#intentos').html()),
          itmTiempoTotal: minutosG*60,
          itmTiempoDemorado: suma,
          itmDescubiertas: cant,
          itmTotales: palabra.length
        },
        function (response) { 
          let htmlrender2= `Puntaje total: <span style="font-size: 20px;"> ${response.puntaje.toFixed(2)} </span>`
          $('#puntajeTotal').html(htmlrender2);
          Swal.fire({
              title: "Tu puntaje es: " + response.puntaje.toFixed(2),
              icon:'success',
              confirmButtonColor: '#3085d6',
              showCancelButton: true,
              confirmButtonText: `Valorar Juego!`
            }).then((result) => {
              if (result.isConfirmed) {  
                $('.viewComentario').click();
              } 
            })
      })

}else{
  mostrarPuntaje(suma,cant);
}
  


    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }

    $('#content').html(htmlrender);
    $('#content').on('click','.reset',function () { 
      location.reload();
    });
    }

}



//Ejecutamos cada segundo
var time = setInterval(cargarSegundo,1000);



const templateItemAhorcado = (element) => {
  return `<div class="itemRelacionado">
              <div class="card" style="box-shadow: 1px 1px 11px 1px rgb(0 0 0 / 10%);">
                  <a href="#" data-id="${element.Codigo}" class="jugar block-20 d-flex align-items-end"
                      style="background-image: url('assets/web/img/verdugo.png');background-size: auto; height: 20vh;">
                  </a>
                  <div class="text bg-white" style="padding-right: 1.5rem !important; padding-bottom: 1.5rem !important; padding-left: 1.5rem !important;">
                      <h3 class="tit"><a href="#">${element.TitJuego}</a></h3>
                      <p>Tema: ${element.TitTema}</p>
                      <div class="d-flex align-items-center mt-4">
                          <p class="mb-0"><a data-id="${element.Codigo}" href="#" class="jugar btn btn-primary">Jugar <span
                                      class="ion-ios-arrow-round-forward"></span></a></p>
                          <p class="ml-auto mb-0 viewComentario modal-trigger">
                              <p class="mr-2">
                                  ${(element.ValoracionPunto > 0) ? templateValoracion(element.ValoracionPunto) : ''}
                              </p>
                          </p>
                      </div>
                  </div>
              </div>
          </div>`
}

$(document).on('click','.viewComentario',function () { 

  listaValoracion(codigoJuegoGlobal,renderValoracion)
});


const renderAhorcadoRelacionados = () => {
  
  listaAhorcadoRelacionados({
    tema: tema
  },
  function (response) {  
    let renderHtmlListaAhorcado = '' 
      response.data.forEach(element => {
          renderHtmlListaAhorcado += templateItemAhorcado(element)
      });
      $('.renderHtmlListaJuego').html(renderHtmlListaAhorcado)
  })
}

const renderAhorcadoRelacionados2 = () => {
  
  listaAhorcadoRelacionados2({
    cod: codUsuario
  },
  function (response) {  
    let renderHtmlListaAhorcado = '' 
      response.data.forEach(element => {
          renderHtmlListaAhorcado += templateItemAhorcado(element)
      });
      $('.renderHtmlListaJuego').html(renderHtmlListaAhorcado)
  })
}

const templateValoracion = (cantidad) => {
  let renderHtml = ''
  for (let index = 0; index < Number(cantidad); index++) {
      renderHtml += '<span class="ion-ios-star text-warning"></span>'
  }
  //console.log(renderHtml);
  return renderHtml
}


$(document).on('click','.rel-tema',function () { 
  renderAhorcadoRelacionados();
});

$(document).on('click','.rel-autor',function () { 
  renderAhorcadoRelacionados2();
});

$(document).on('click','.jugar',function () { 
  // alert('sasas')
  var codigo = $(this).data('id');
  $(location).attr('href',`jugarAhorcado?id=${btoa(codigo)}`);  
  
});

//VALORACION

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