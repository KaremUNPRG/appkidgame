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
    font-size: 1rem;
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
  /* width: 30px; */
  /* height: 20px; */
  margin-bottom: 1px;
  border-radius: 5px;
}

.swal2-confirm{
  height: auto;
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

button{
    height: 150px;
    width: 150px;
    font-size: 40px;
    padding:0px;
    color: black;
    font-weight: bold;
}
button:hover{
    cursor: pointer;
}

button img{
    width: 100%;
    height: 100%;
}
#preloader_3{
    margin: 20% 50%!important;
}
.content-loader{
  position: absolute;
    left: 0;
    top: 0;
    right: 0;
    background: #fff;
    min-height: 400px;
    height: 100%;
}

</style>

@endsection
@section('content')
<div class="main-container" id="main-container">
  <div class="cont" style="position: relative;min-height: 400px;">
    <div class="content-loader">
      <div id="preloader_3"></div>
    </div>
    <section class="section1">
            <h1 class="titulo"></h1>
            <h2 class="tema"></h2>
            
            <div class="flex-row no-warp">
              <div class="render-memorama" style="display: grid;
        grid-template-columns: repeat(4, 1fr);">

              </div>
            
            </div>
    </section>
    <section class="section2">
      
        <div class="estadisticas">
          <h3>Tiempo:</h3>
          <div class="cont-temporizador">
              <div class="bloque">
                  <div class="segundos" id="t-restante">--</div>
              </div>
          </div>     
        </div>
        <h2 id="aciertos" class="estadisticas">Aciertos: 0</h2>
        <div class="puntuacionrecord">
        </div>

    </section>
  </div>
</div>
      
@endsection

@section('script')
<script src="{{asset('assets/web/main/jugarMemorama.js')}}" type="module"></script>
@endsection