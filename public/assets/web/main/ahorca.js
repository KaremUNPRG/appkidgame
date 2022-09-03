import { ahorcado,puntajeAhorcado } from "../components/api/Juego.js";

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


var pistas = "";

var segundos = 0;

var minutos = 100;

var minutosG = "";



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
            pistas = element.Pistas;
            pintarGuiones(palabra);  
            $("#main-container").css("background", `${element.Fondo}`);
            // $("#main-container").css("background", `radial-gradient(circle, ${element.Fondo} 6%, #1C1C1C 100%)`);
            $('.titulo').html(element.Titulo);
            $('.tema').html(element.Descripcion);
            for (var i = 0; i < buttons.length; i++) {
              buttons[i].disabled = false;
            }
            });


})

}
function inicio() {

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
  $('.hueco-pista').html(pistas);
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

  Swal.fire({
    title: "Tu puntaje es:" + puntaje.toFixed(2),
    icon:'success',
    showDenyButton: true,
    showCancelButton: true,
    denyButtonText: `Reiniciar`,
  }).then((result) => {
    if (result.isConfirmed) {  
        //
    } else if (result.isDenied) {
        //
    }
  })

}

// Compruba si ha finalizado
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    clearInterval(time);
    let htmlrender = `<button id="reset" class="reset">Reiniciar</button>`
    document.getElementById("msg-final").innerHTML = "GANASTE";
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className = " encuadre";
    const fecha = new Date();
    let format = fecha.getFullYear() +"-"+ (fecha.getMonth() +1) + "-" +fecha.getDate();
    let suma = (+$('#minutos').html())*60 + (+$('#segundos').html());

    if(localStorage.getItem('accessToken')){
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
          
          Swal.fire({
              title: "Tu puntaje es:" + response.puntaje.toFixed(2),
              icon:'success',
              showDenyButton: true,
              showCancelButton: true,
              denyButtonText: `Reiniciar`,
            }).then((result) => {
              if (result.isConfirmed) {  
                  //
              } else if (result.isDenied) {
                  //
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
    let htmlrender = `<button id="reset" class="reset">Reiniciar</button>`
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
          
          Swal.fire({
              title: "Tu puntaje es:" + response.puntaje.toFixed(2),
              icon:'success',
              showDenyButton: true,
              showCancelButton: true,
              denyButtonText: `Reiniciar`,
            }).then((result) => {
              if (result.isConfirmed) {  
                  //
              } else if (result.isDenied) {
                  //
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
          
          Swal.fire({
              title: "Tu puntaje es:" + response.puntaje.toFixed(2),
              icon:'success',
              showDenyButton: true,
              showCancelButton: true,
              denyButtonText: `Reiniciar`,
            }).then((result) => {
              if (result.isConfirmed) {  
                  //
              } else if (result.isDenied) {
                  //
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
    //btnInicio.onclick = function () { location.reload() };
    let htmlrender = `<button id="reset" class="reset">Reiniciar</button>`
    $('#content').html(htmlrender);
    $('#content').on('click','.reset',function () { 
      location.reload();
    });
    }

}



//Ejecutamos cada segundo
var time = setInterval(cargarSegundo,1000);
