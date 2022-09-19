@extends('layout.main')
@section('style')
<style>
* {
  box-sizing: border-box;
}
.main-container {
  padding: 10px;
  width: 100%;
    display: flex;
    align-items: center;
}

.cont{
 margin: 40px auto 40px;
  max-width: 900px;
  display: flex;
    align-items: center;
}

body{
  
    font-family: sans-serif;
    color: black;
}



.section1{
    padding: 0 20px 10px 10px;
    border-radius: 8px;
    background-color: rgba(255,255,255,0.2);
}


button{
    font-size: 14px;
    color: black;
    font-weight: bold;
}

button:hover{
    cursor: pointer;
}

.section2{
  background-color: rgba(255,255,255,0.2);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 350px;
   
}

.estadisticas{
    border: 1px solid black;
    height: 105px;
    border-radius: 8px;
    padding: 8px 20px;
    box-sizing: border-box;
    margin: 20px;
}

.estadisticas #intentos{

    font-size: 20px;
    
}

.estadisticas h3{

font-size: 17px;
margin: 0rem;
font-weight: 900;

}

.titulo {
  font-weight: 900;
  color: var(--blue);
  font-size: 50px;
  text-align: center;
  text-shadow: 2px 0 0 #000;
}

.tema{
  font-weight: 900;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

h1#msg-final {
  font-weight: 700;
  font-size: 40px;
  text-shadow: 2px 0 0 #000;
  text-align: center;
  color: crimson;
  position: absolute;
  transition: all .5s ease;
  transform: scale(0);
  min-height: 50px;
  bottom: 160px;
  left: -10px;
}
.zoom-in {
  transform: scale(1) !important;
}
#acierto {
  text-align: center;
  min-height: 24px;
  transform: scale(0);
}
.acierto {
  animation: zoomInOut 1s ease;
}
.rojo {
  color: red;
}
.verde {
  color: green;
}
@keyframes zoomInOut {
  0% { transform: scale(0); }
  50% { transform: scale(1); }
  70% { transform: scale(1); }
  100% { transform: scale(0); }
}
h2.palabra {
  margin: 0 auto 25px -70px;
  text-align: center;
  right: 10px;
  color: blue;

  text-transform: uppercase;
  letter-spacing: 6px;

}
.flex-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px auto; 
}


.no-wrap {
  flex-wrap: nowrap !important;
}
.col {
  width: 50%;
  height: 250px;
}
.col span {
  
}
#turnos h3 {
  margin: auto;
}
h3 span {
   color: orangered;
}
.letra:disabled {
  color:rgba(255, 0, 0, 0.5);
}
picture {
  position: relative;
}
picture img {
  position: absolute;
  top: 10px;
  height: 225px;
}
#image5, #image4, #image3,
#image2, #image1, #image0 {
  opacity: 0;
  transition: opacity .3s ease;
}
.fade-in {
  opacity: 1 !important;
}

.encuadre {
  border: 2px dashed crimson;
  margin: 0 auto 25px -70px;
  text-align: center;
  right: 10px;
  color: green;
  text-transform: uppercase;

}


.cont-temporizador{
  display: flex;
  justify-content: center;   
  margin-top: 15px; 
}

.cont-temporizador .bloque{
  margin: 0px 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cont-temporizador .bloque div{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(136, 115, 227, 0.695);
  box-shadow: 0px 0px 6px 2px #9058d9 inset;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  width: 30px;
  height: 20px;
  margin-bottom: 1px;
  border-radius: 5px;
}

.cont-temporizador .bloque p{
  font-size: 11px;
  font-weight: bold;
  color: #d6d6d6;
}

@media (max-width: 767.98px) {

  .titulo{
    padding-top:20px;
    font-size: 32px;
  }

  .tema{
    font-size: 17px;
  }

  .cont{
    margin: 40px auto 40px;
    max-width: 900px;
    display: inline-block;
    align-items: center;
} 

.section1{
  border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}

.section1{
  border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}


.section2 {
    border-top-right-radius: 0px;
    border-bottom-left-radius: 8px;
    width: 100%;
    display: inline-block;
    text-align: center;
}

h2.palabra {
  font-size: 30px;

}

.encuadre {
  font-size: 30px;

}

h1#msg-final{
  font-size: 30px;
  bottom: 60px;
}

.col{
  height: 160px;
}

picture img{
   height: 140px;
}

}

 /* PARA LA SOPA */
 #juego {
    border: 1px solid #f2f2f2;
    /* padding: 20px; */
    padding: 10px;
    float: left;
    margin: 30px 20px;
}

#juego div {
    width: 100%;
    margin: 0 auto;
}

/* style for each square in the puzzle */
#juego .puzzleSquare {
    height: 40px;
    width: 40px;
    text-transform: uppercase;
    background-color: white;
    border: 0;
    font: 1em sans-serif;
}

button::-moz-focus-inner {
    border: 0;
}

    /* indicates when a square has been selected */
#juego .selected {
    background-color: orange;
}

    /* indicates that the square is part of a word that has been found */ 
#juego .found {
    background-color: blue;
    color: white;
}

#juego .solved {
    background-color: #E4CFFF;
    color: white;
}

    /* indicates that all words have been found */
#juego .complete {
    background-color: #4FCA4F;
}

    /**
    * Styles for the word list
    */
#palabras {
    padding-top: 5px;
    -moz-column-count: 3;
    -moz-column-gap: 20px;
    -webkit-column-count: 2;
    -webkit-column-gap: 20px;
    column-count: 3;
    column-gap: 20px;
    width: 300px;
}

#palabras ul {
    list-style-type: none;
}

#palabras li {
    padding: 3px 0;
    font: 1em sans-serif;
}

/* indicates that the word has been found */
#palabras .wordFound {
    text-decoration: line-through;
    color: gray;
}

/**
* Styles for the button
*/
#solve {
    margin: 0 30px;
}
.how-pos3 {
  position: absolute;
  top: 0px;
    right: 14px;
    background: red;
    line-height: 1;
    cursor: pointer;
    
    
    
}

.hov3 {
  opacity: 0.6;
}

.hov3:hover {
  opacity: 1;
}


</style>

@endsection
@section('content')

<div class="main-container" id="main-container">
  <div class="cont">
    <section class="section1">
        <h1 class="titulo" id="titulo"></h1>
        <h2 class="tema" id="tema"></h2>
        
        <div class="row">
          <div class="col-xl-12">
              <div class="main-container p-0">
                  <div id="juego"></div>
              </div>
          </div>

          <div class="col-xl-12">
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

        <!-- <div class="flex-row no-warp"> -->
          <!-- <div class="col"> -->
            <!-- <div id="juego"></div>
            <div id="palabras"></div> -->
            <!-- <picture>
              <img src="{{asset('assets/web/img/ahorcadogame/ahorcado_6.png')}}" alt="" id="image6">
              <img src="{{asset('assets/web/img/ahorcadogame/ahorcado_5.png')}}" alt="" id="image5">
              <img src="{{asset('assets/web/img/ahorcadogame/ahorcado_4.png')}}" alt="" id="image4">
              <img src="{{asset('assets/web/img/ahorcadogame/ahorcado_3.png')}}" alt="" id="image3">
              <img src="{{asset('assets/web/img/ahorcadogame/ahorcado_2.png')}}" alt="" id="image2">
              <img src="{{asset('assets/web/img/ahorcadogame/ahorcado_1.png')}}" alt="" id="image1">
              <img src="{{asset('assets/web/img/ahorcadogame/ahorcado_0.png')}}" alt="" id="image0">
            </picture> -->
          <!-- </div> -->
          <div class="col">
            <h1 id="msg-final"></h1>
            <!-- <h3 id="acierto"></h3> -->
            <!-- <h2 class="palabra" id="palabra"></h2>  -->
          </div>
        <!-- </div> -->
        
        <!-- <div class="flex-row" id="abcdario">
            </div> -->
</section>
<section class="section2">
                  <!-- <div class="estadisticas">
                  <h3>Vidas: <span id="intentos">6</span></h3>
                  </div> -->
                  <div class="estadisticas">
                  <h3>Tiempo:</h3>
                      <div class="cont-temporizador">
                          <div class="bloque">
                              <div class="minutos" id="minutos">--</div>
                              <p>M</p>
                          </div>
                          <div class="bloque">
                              <div class="segundos" id="segundos">--</div>
                              <p>S</p>
                          </div>
                      </div>     
                  </div>

      <!-- <div id="content" class="estadisticas">
          <button id="pista" class="pista">Quiero una pista</button>

<br>
          <span class="hueco-pista"></span>


      </div> -->
</section>
</div>
</div>


<section class="ftco-section bg-light">
    
        <div class="row justify-content-center mb-5 pb-2">
            <div class="col-md-8 text-center heading-section ftco-animate">
                <h2 class="j-r"><span>Juegos Relacionados</h2>
        <ul class="nav nav-rel" role="tablist">
					<li class="nav-item p-b-10">
						<a class="rel-tema nav-link active" data-toggle="tab" href="#" role="tab">Mismo Tema</a>
					</li>

					<li class="nav-item p-b-10">
						<a class="rel-autor nav-link" data-toggle="tab" href="#" role="tab">Mismo autor</a>
					</li>
				</ul>
            </div>
        </div>
        <div class="row renderHtmlListaJuego" style="justify-content: center;">

        </div>
 
</section>


<div id="mComentario" class="mComentario modal">
    <div class="modal-content">
        <h4 class="titleJuego"></h4>
        <div class="content-valoracion">
            <div class="estrella-val d-flex justify-content-between">
                <div class="puntuacion">
                    <h1 class="m-0 puntacionRender"></h1>
                    <div class="renderPuntuacion">
                    </div>
                    <div class="totalUser"></div>
                </div>
                <div class="grafica col pl-5">
                    <div class="d-flex     align-items-center">
                        <div class="px-2">5</div>
                        <progress id="5Estrella" max="100" value="0" class="col"> </progress>
                    </div>
                    <div class="d-flex     align-items-center">
                        <div class="px-2">4</div>
                        <progress id="4Estrella" max="100" value="0" class="col"></progress>
                    </div>
                    <div class="d-flex     align-items-center">
                        <div class="px-2">3</div>
                        <progress id="3Estrella" max="100" value="0" class="col"></progress>
                    </div>
                    <div class="d-flex     align-items-center">
                        <div class="px-2">2</div>
                        <progress id="2Estrella" max="100" value="0" class="col"></progress>
                    </div>
                    <div class="d-flex     align-items-center">
                        <div class="px-2">1</div>
                        <progress id="1Estrella" max="100" value="0" class="col"></progress>
                    </div>
                </div>
            </div>
        </div>

         <div class="content-accion py-3">
            <div class="miComentario">
                <div class="input-field d-flex align-items-center">
                    <input placeholder="Escribir...." id="itemComentario" autocomplete="off" type="text" class="">
                    <i class="material-icons sendComentario" data-key="" style="font-size: 2rem;cursor: pointer;">send</i>
                    <label for="itemComentario" style="font-size: 2rem;transform: translateY(-34px) scale(0.8);">
                        <div class="misEstrellas">
                            {{-- <span class="ion-ios-star text-secondary selectEstrella" data-index="1"></span>
                            <span class="ion-ios-star text-secondary selectEstrella" data-index="2"></span>
                            <span class="ion-ios-star text-secondary selectEstrella" data-index="3"></span>
                            <span class="ion-ios-star text-secondary selectEstrella" data-index="4"></span>
                            <span class="ion-ios-star text-secondary selectEstrella" data-index="5"></span> --}}
                        </div>
                    </label>
                </div>
            </div>
        </div>
        <div class="content-comentario">
            
        </div>
    </div>
    <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
    </div>
</div>




      
@endsection

@section('script')
  <script src="{{asset('assets/web/main/jugarSopaLetras.js')}}" type="module"></script>
  <script src="{{asset('lib/sopaLetras/wordfind.js')}}" type="text/javascript"></script>
  <script src="{{asset('lib/sopaLetras/wordfindgame.js')}}" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
  @if (session('accessToken'))
        @php
            $accessToken =session('accessToken');
        @endphp
        <script>
            localStorage.setItem('accessToken',@json($accessToken));
        </script>
    @endif

   <script>
        $('.modal').modal();
    </script>
@endsection