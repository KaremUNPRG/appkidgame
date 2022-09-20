import { sopaLetras, puntajeSopaLetras,listaSopaRelacionados,listaSopaRelacionados2 } from "../components/api/Juego.js";
import { listaValoracion, insertValoracion } from "../components/api/Inicio.js";


// ### VARIABLES ###

let params = new URLSearchParams(location.search);
var ID = atob(params.get("id"));
// Palabra a averiguar
var palabras = [];
var totalPalabras = 0;
// Palabras trampas
var trampas = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;

// Botones de letras
var buttons = document.getElementsByClassName("letra");

var filas = "";
var columnas = "";

var segundos = 0;

var minutos = 100;

var minutosG = "";

var tema = "";

var codUsuario = 0;

var  codigoJuegoGlobal = 0

var valoracionGlobal = 0;

// ### FUNCIONES ###
const renderSopaLetras = () => {
    const filasColumnasAgregadas = 3;
    sopaLetras(
        {
            id: ID,
        },
        function (response) {
            response.data.forEach(function (element, index) {
                palabras = element.Palabras.slice(0, -1);
                palabras = palabras.split(",");
                totalPalabras = palabras.length;

                trampas = element.Trampas.slice(0, -1);
                trampas = trampas.split(",");
                minutos = element.Tiempo - 1;
                minutosG = element.Tiempo;
                filas = element.Filas;
                columnas = element.Columnas;

                  tema = element.Tema;
            codUsuario = element.CodigoUsuario;
            codigoJuegoGlobal = element.Codigo;
                // console.log('palabras', palabras)
                // console.log('trampas', trampas)
                var gamePuzzle = wordfindgame.create(
                    palabras,
                    trampas,
                    "#juego",
                    "#palabras",
                    {
                        height: filas + filasColumnasAgregadas,
                        width: columnas + filasColumnasAgregadas,
                        fillBlanks: false,
                    }
                );

                // console.log("gamePuzzle",gamePuzzle)
                // var puzzle = wordfind.newPuzzle(
                //     palabras,
                //     {
                //         height: filas + 2,
                //         width: columnas + 2,
                //         fillBlanks: false,
                //     },
                //     trampas
                // );
                // wordfind.print(puzzle);

                // pistas = element.Pistas;
                // pintarGuiones(palabra);
                $("#main-container").css("background", `${element.Fondo}`);
                // $("#main-container").css("background", `radial-gradient(circle, ${element.Fondo} 6%, #1C1C1C 100%)`);
                $(".titulo").html(element.Titulo);
                $(".tema").html(element.Tema);
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].disabled = false;
                }
                 renderSopaRelacionados();
            });
        }
    );
};
function inicio() {
    // console.log(ID);
    // generaABC("a","z");
    cargarSegundo();
    cont = 6;
    $("#intentos").html(cont);
}

$("#content").on("click", ".reset", function () {
    renderSopaLetras();
    inicio();
    segundos = 0;
});

//PUNTAJE

function mostrarPuntaje(suma, cant) {
    // var vidas = (+$('#intentos').html());
    var Ttotal = minutosG * 60;
    var puntaje = (suma / Ttotal) * (cant / totalPalabras);

    Swal.fire({
        title: "Tu puntaje es:" + puntaje.toFixed(2),
        icon: "success",
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Reiniciar`,
    }).then((result) => {
        console.log("result", result);
        if (result.isConfirmed) {
            //
        } else if (result.isDenied) {
            //
            location.reload();
            // $('.reset').click()
            // renderSopaLetras();
            // inicio();
            // segundos = 0;
        }
    });
}

// Compruba si ha finalizado
function compruebaFin() {
    // console.log('compruebaFin...')
    let palabrasRender = $(".word.wordFound")
        .map(function () {
            return this.innerHTML;
            // console.log(this.innerHtml)
        })
        .get();

    // console.log('totalPalabras', totalPalabras)
    // console.log('palabrasRender', palabrasRender.length)

    if (totalPalabras == palabrasRender.length) {
        clearInterval(time);

        let htmlrender = `<button id="reset" class="reset">Reiniciar</button>`;
        // $('#content').html(htmlrender);
        document.getElementById("msg-final").innerHTML = "GANASTE";
        document.getElementById("msg-final").className += "zoom-in";
        // document.getElementById("palabra").className = " encuadre";
        const fecha = new Date();
        let format =
            fecha.getFullYear() +
            "-" +
            (fecha.getMonth() + 1) +
            "-" +
            fecha.getDate();
        let suma = +$("#minutos").html() * 60 + +$("#segundos").html();

        if (localStorage.getItem("accessToken")) {
            puntajeSopaLetras(
                {
                    Juego: ID,
                    itmFecha: format,
                    itmTiempoTotal: minutosG * 60,
                    itmTiempoDemorado: suma,
                    itmDescubiertas: palabrasRender.length,
                    itmTotales: totalPalabras,
                },
                function (response) {
                    Swal.fire({
                        title: "Tu puntaje es:" + response.puntaje.toFixed(2),
                        icon: "success",
                        showDenyButton: true,
                        showCancelButton: true,
                        denyButtonText: `Reiniciar`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //
                        } else if (result.isDenied) {
                            //
                            location.reload();
                        }
                    });
                }
            );
        } else {
            mostrarPuntaje(suma, palabrasRender.length);
        }
    }

    //   if( oculta.indexOf("_") == -1 ) {
    //     clearInterval(time);
    //     let htmlrender = `<button id="reset" class="reset">Reiniciar</button>`
    //     document.getElementById("msg-final").innerHTML = "GANASTE";
    //     document.getElementById("msg-final").className += "zoom-in";
    //     document.getElementById("palabra").className = " encuadre";
    //     const fecha = new Date();
    //     let format = fecha.getFullYear() +"-"+ (fecha.getMonth() +1) + "-" +fecha.getDate();
    //     let suma = (+$('#minutos').html())*60 + (+$('#segundos').html());

    //     if(localStorage.getItem('accessToken')){
    //         puntajeAhorcado({

    //           Juego: ID,
    //           itmFecha: format,
    //           itmVidas: (+$('#intentos').html()),
    //           itmTiempoTotal: minutosG*60,
    //           itmTiempoDemorado: suma,
    //           itmDescubiertas: palabra.length,
    //           itmTotales: palabra.length
    //         },
    //         function (response) {

    //           Swal.fire({
    //               title: "Tu puntaje es:" + response.puntaje.toFixed(2),
    //               icon:'success',
    //               showDenyButton: true,
    //               showCancelButton: true,
    //               denyButtonText: `Reiniciar`,
    //             }).then((result) => {
    //               if (result.isConfirmed) {
    //                   //
    //               } else if (result.isDenied) {
    //                   //
    //               }
    //             })
    //       })
    //     }else{
    //       mostrarPuntaje(suma,palabra.length);
    //     }

    //     for (var i = 0; i < buttons.length; i++) {
    //       buttons[i].disabled = true;
    //     }
    //     //document.getElementById("reset").innerHTML = "Empezar";
    //     $('#content').html(htmlrender);
    //     $('#content').on('click','.reset',function () {
    //       location.reload();
    //     });

    //   }else if( cont == 0 ) {
    //     clearInterval(time);
    //     let htmlrender = `<button id="reset" class="reset">Reiniciar</button>`
    //     document.getElementById("msg-final").innerHTML = "PERDISTE";
    //     document.getElementById("msg-final").className += "zoom-in";
    //     //document.getElementById("pista").disabled = true;
    //     const fecha = new Date();
    //     const format = fecha.getFullYear() +"-"+ (fecha.getMonth() +1) + "-" +fecha.getDate();
    //     let suma = (+$('#minutos').html())*60 + (+$('#segundos').html());
    //     let cant = 0;
    //     for(var i=0; i<palabra.length; i++) {
    //       if(oculta[i] == palabra[i]) cant++;
    //     }

    //     if(localStorage.getItem('accessToken')){
    //         puntajeAhorcado({

    //           Juego: ID,
    //           itmFecha: format,
    //           itmVidas: (+$('#intentos').html()),
    //           itmTiempoTotal: minutosG*60,
    //           itmTiempoDemorado: suma,
    //           itmDescubiertas: cant,
    //           itmTotales: palabra.length
    //         },
    //         function (response) {

    //           Swal.fire({
    //               title: "Tu puntaje es:" + response.puntaje.toFixed(2),
    //               icon:'success',
    //               showDenyButton: true,
    //               showCancelButton: true,
    //               denyButtonText: `Reiniciar`,
    //             }).then((result) => {
    //               if (result.isConfirmed) {
    //                   //
    //               } else if (result.isDenied) {
    //                   //
    //               }
    //             })
    //       })

    // }else{
    //   mostrarPuntaje(suma,cant);
    // }

    //     for (var i = 0; i < buttons.length; i++) {
    //       buttons[i].disabled = true;
    //     }
    //     //document.getElementById("reset").innerHTML = "Empezar";
    //     $('#content').html(htmlrender);
    //     $('#content').on('click','.reset',function () {
    //       location.reload();
    //     });
    //   }
}

// Iniciar
$(document).ready(function () {
    renderSopaLetras();
    inicio();
});

//Definimos y ejecutamos los segundos
function cargarSegundo() {
    let txtSegundos;

    if (segundos < 0) {
        segundos = 59;
    }

    //Mostrar Segundos en pantalla
    if (segundos < 10) {
        txtSegundos = `0${segundos}`;
    } else {
        txtSegundos = segundos;
    }
    document.getElementById("segundos").innerHTML = txtSegundos;
    segundos--;
    if (minutos != 100) {
        cargarMinutos(segundos);
    }
}

//Definimos y ejecutamos los minutos
function cargarMinutos(segundos) {
    let txtMinutos;

    if (segundos == -1 && minutos !== 0) {
        setTimeout(() => {
            minutos--;
        }, 500);
    } else if (segundos == -1 && minutos == 0) {
        setTimeout(() => {
            minutos = 59;
        }, 500);
    }

    //Mostrar Minutos en pantalla
    if (minutos < 10) {
        txtMinutos = `0${minutos}`;
    } else {
        txtMinutos = minutos;
    }
    document.getElementById("minutos").innerHTML = txtMinutos;

    if (segundos < 0 && minutos == 0) {
        clearInterval(time);
        // document.getElementById("pista").disabled = true;
        document.getElementById("msg-final").innerHTML = "PERDISTE";
        document.getElementById("msg-final").className += "zoom-in";

        const fecha = new Date();
        const format =
            fecha.getFullYear() +
            "-" +
            (fecha.getMonth() + 1) +
            "-" +
            fecha.getDate();
        let cant = 0;
        let suma = +$("#minutos").html() * 60 + +$("#segundos").html();

        if (localStorage.getItem("accessToken")) {
            puntajeSopaLetras(
                {
                    Juego: ID,
                    itmFecha: format,
                    itmVidas: +$("#intentos").html(),
                    itmTiempoTotal: minutosG * 60,
                    itmTiempoDemorado: suma,
                    itmDescubiertas: cant,
                    itmTotales: palabra.length,
                },
                function (response) {
                    Swal.fire({
                        title: "Tu puntaje es:" + response.puntaje.toFixed(2),
                        icon: "success",
                        showDenyButton: true,
                        showCancelButton: true,
                        denyButtonText: `Reiniciar`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //
                        } else if (result.isDenied) {
                            //
                        }
                    });
                }
            );
        } else {
            mostrarPuntaje(suma, cant);
        }

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
        //document.getElementById("reset").innerHTML = "Empezar";
        //btnInicio.onclick = function () { location.reload() };
        let htmlrender = `<button id="reset" class="reset">Reiniciar</button>`;
        $("#content").html(htmlrender);
        $("#content").on("click", ".reset", function () {
            location.reload();
        });
    } else {
        compruebaFin();
    }
}

//Ejecutamos cada segundo
var time = setInterval(cargarSegundo, 1000);




const templateItemSopa = (element) => {
  return `<div class="itemRelacionado">
              <div class="card" style="box-shadow: 1px 1px 11px 1px rgb(0 0 0 / 10%);">
                  <a href="#" data-id="${element.Codigo}" class="jugar block-20 d-flex align-items-end"
                      style="background-image: url('assets/web/img/letras.png');background-size: auto; height: 20vh;">
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


const renderSopaRelacionados = () => {
  
  listaSopaRelacionados({
    tema: tema
  },
  function (response) {  
    let renderHtmlListaSopa = '' 
      response.data.forEach(element => {
          renderHtmlListaSopa += templateItemSopa(element)
      });
      $('.renderHtmlListaJuego').html(renderHtmlListaSopa)
  })
}

const renderSopaRelacionados2 = () => {
  
  listaSopaRelacionados2({
    cod: codUsuario
  },
  function (response) {  
    let renderHtmlListaSopa = '' 
      response.data.forEach(element => {
          renderHtmlListaSopa += templateItemSopa(element)
      });
      $('.renderHtmlListaJuego').html(renderHtmlListaSopa)
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
  renderSopaRelacionados();
});

$(document).on('click','.rel-autor',function () { 
  renderSopaRelacionados2();
});

$(document).on('click','.jugar',function () { 
  // alert('sasas')
  var codigo = $(this).data('id');
  $(location).attr('href',`jugarSopaLetras?id=${btoa(codigo)}`);  
  
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