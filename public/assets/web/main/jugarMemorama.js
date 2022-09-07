import { juegoMemorama } from "../components/api/JugarMemorama.js";

let params = new URLSearchParams(location.search);
var ID = (params.get('id'));

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

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

var ListaCarta = []



function bloquearTarjetas(){
    ListaCarta.forEach(element => {
        let tarjetaBloqueada = document.getElementById(element.Key);
        tarjetaBloqueada.innerHTML = `<img src="${element.Imagen}" alt="">`;
        tarjetaBloqueada.disabled = true;
    });
}

function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer ==0){
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
    tarjeta1.innerHTML = `<img src="${primerResultado.Imagen}" alt="">`
    
    //Deshabilitando primera tarjeta
    tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){ 
        tarjeta2 = document.getElementById(id);
        segundoResultado = ListaCarta.find(obj => obj.Key == id);
        //tarjeta2.innerHTML = segundoResultado.DescCarta;
        tarjeta2.innerHTML = `<img src="${segundoResultado.Imagen}" alt="">`
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado.DescCarta == segundoResultado.DescCarta)
        {
            //Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;
            //Aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            if(aciertos == 8){
                clearInterval(tiempoRegresivoId); 
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} `;
                mostrarTiempo.innerHTML = `Solo demoraste: ${timerInicial - timer} segundos `;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} `;
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

juegoMemorama({id:ID},function (response) {
    let htmlRender = ``
    response.data.sort(function() { return Math.random() - 0.5 });

    console.log(response.data);
    ListaCarta = response.data
    response.data.forEach(element => {
        htmlRender += `<button id="${element.Key}"  class="itemCarta"></button>`
    });

    console.log(htmlRender);
    $('.render-memorama').html(htmlRender)
})

$(document).on('click','.itemCarta',function () {
    destapar($(this).attr('id'))
})