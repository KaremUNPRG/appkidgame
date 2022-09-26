import { juegoMemorama, puntajeMemorama } from "../components/api/JugarMemorama.js";

let params = new URLSearchParams(location.search);
var ID = (params.get('id'));
var IDCOMPETENCIA = params.get('id2') != null ? atob(params.get('id2')) : null;
var KEYPARAMS = params.get('key') != null ? params.get('key') : null;

let tarjetasDestapadas =0;
let tarjeta1=null;
let tarjeta2=null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

// let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

var ListaCarta = []

const agregarPuntaje = () => {
    if(localStorage.getItem('accessToken')){
        puntajeMemorama({
            Juego : ID,
            Competencia: IDCOMPETENCIA,
            itmTiempoTotal:timerInicial,
            itmTiempoDemorado : timerInicial - timer,
            itmDescubiertas: aciertos,
            itmTotales: ListaCarta.length/2
        },function (response) {
            $('.puntuacionrecord').html(`<h2 id="mipuntuacion" class="estadisticas">
                                        <span style="font-size: 17px;
                                        margin: 0rem;
                                        font-weight: 900;" >Mi Puntuación: </span>
        <span style="display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(136, 115, 227, 0.695);
            box-shadow: 0px 0px 6px 2px #9058d9 inset;
            color: #ffffff;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 1px;
            border-radius: 5px;">${response.puntaje.toFixed(2)}</span> </h2> `);
            Swal.fire({
                title: "Tu puntaje es:" + response.puntaje.toFixed(2),
                icon:'success',
                showCancelButton: false,
            }).then((result) => {
                if (IDCOMPETENCIA != null) {                
                    $(location).attr('href',`/competencia/jugar/${IDCOMPETENCIA}?key=${KEYPARAMS}`);  
                }
            })
        })
    }
} 

function bloquearTarjetas(){
    ListaCarta.forEach(element => {
        let tarjetaBloqueada = document.getElementById(element.Key);
        
    
        tarjetaBloqueada.innerHTML = (element.Tipo == 'Imagen') ?`<img src="${element.Imagen}" alt="">`: `<span>${element.DescCarta}<span>`;
        tarjetaBloqueada.disabled = true;
    });
}

function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `${timer} s`;
        if(timer ==0){
            agregarPuntaje()
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }

    },1000);
}

function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

  if(tarjetasDestapadas == 1){
    // Mostrar primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = ListaCarta.find(obj => obj.Key == id);
    //tarjeta1.innerHTML = primerResultado.DescCarta;
    tarjeta1.innerHTML = (primerResultado.Tipo == 'Imagen') ? `<img src="${primerResultado.Imagen}" alt="">` : `<span>${primerResultado.DescCarta}<span>`
    
    //Deshabilitando primera tarjeta
    tarjeta1.disabled = true;
   }else if(tarjetasDestapadas == 2){ 
        tarjeta2 = document.getElementById(id);
        segundoResultado = ListaCarta.find(obj => obj.Key == id);
        //tarjeta2.innerHTML = segundoResultado.DescCarta;
        tarjeta2.innerHTML = (segundoResultado.Tipo == 'Imagen') ? `<img src="${segundoResultado.Imagen}" alt="">` : `<span>${segundoResultado.DescCarta}<span>`
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        // mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado.DescCarta == segundoResultado.DescCarta)
        {
            //Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;
            //Aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            if(aciertos == (ListaCarta.length / 2)){
                agregarPuntaje()
                clearInterval(tiempoRegresivoId); 
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} `;
                mostrarTiempo.innerHTML = `Demoraste: ${timerInicial - timer} s `;
                // mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} `;
            }
        }else{
            //Mostrar momentaneamente y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML= ' ';
                tarjeta2.innerHTML= ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }

}

juegoMemorama({id:ID,id2:IDCOMPETENCIA},function (response) {
    let htmlRender = ``
    response.data.sort(function() { return Math.random() - 0.5 });
    timer = response.juego.Tiempo
    timerInicial = response.juego.Tiempo
    mostrarTiempo.innerHTML = `${timerInicial} s`
    ListaCarta = response.data
    response.data.forEach(element => {
        htmlRender += `<button id="${element.Key}" data-type="${element.Tipo}"  class="itemCarta"></button>`
    });
    $('#main-container').css({'background':response.juego.Fondo})
    if(localStorage.getItem('accessToken')){
        $('.puntuacionrecord').html(`<h2 id="mipuntuacion" class="estadisticas">
        <span style="font-size: 17px;margin: 0rem;font-weight: 900;" >Mi Puntuación:</span> <span style="display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(136, 115, 227, 0.695);
        box-shadow: 0px 0px 6px 2px #9058d9 inset;
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 1px;
        border-radius: 5px;">${response.juego.MiPuntaje == null ? '--' : response.juego.MiPuntaje}</span> </h2> `);

    }
    $('.render-memorama').html(htmlRender)
    $('.content-loader').addClass('hide')
})

$(document).on('click','.itemCarta',function () {
    destapar($(this).attr('id'))
})