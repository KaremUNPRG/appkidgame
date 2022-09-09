@extends('layout.main')
@section('style')
    <style>
      
.switchBtn {
  position: relative;
  display: inline-block;
  width: 110px;
  height: 34px;

}
.switchBtn input {display:none;}
.slide {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  padding: 8px;
  color: #fff;
}
.slide:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 78px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
.inputc:checked + .slide {
  background-color: #8CE196;
  padding-left: 40px;
}
.inputc:focus + .slide {
  box-shadow: 0 0 1px #01aeed;
}
.inputc:checked + .slide:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
  left: -20px;
}

.slide.round {
  border-radius: 34px;
}
.slide.round:before {
  border-radius: 50%;
}

        .item-option{
            padding: 15px;    
            cursor: pointer;
        }
        .item-option:hover{
            border-radius: 5px;
            background: #e0e4e9;
        }
        .text-option{
            padding-left: 10px;
        }
        .form-nuevo{
            background: #fff;
        }
        .form-nuevo{
            padding: 20px;
        }

        .tiempo{
            font-size: 1rem;
            font-weight: bold;
        }
        .item-ahorcado{
            background: #fff;
            margin: 15px 0px;
            padding-top: 20px;
            padding-bottom: 20px;
        }
        .title-ahorcado{
            font-size: 1.5rem;
            font-weight: bold;
        }
        .dropdown-content{
            width: 200px!important;
            height: auto!important;
        }
        .dropdown-content li>a, .dropdown-content li>span {
            color: #106997;
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
#abcdario{
display: flex !important;
    flex-wrap: wrap;
    justify-content: center;
    padding-right: 3px;
    padding-left: 3px;
    padding-top: 40px;
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
  height: 100px;
}
#image5, #image4, #image3,
#image2, #image1, #image0 {
  opacity: 0;
  transition: opacity .3s ease;
}

.fade-in {
  opacity: 1 !important;
}

@media (max-width: 767.98px) {

  .d-flex {
    display: block !important;
}

.list-option {
    display: flex !important;
}

.palabra{
  font-size: 30px;
}

picture img {

  height: 85px;
}

.render-html{
    padding-right: 1px;
    padding-left: 1px;
}

.how-pos3{
  right: 0px;
}

}

    </style>
@endsection

@section('content')
<!--
<section class="hero-wrap hero-wrap-2" style="background-image: url('{{asset('assets/web/img/ahorcado.jpg')}}');">
     
      <div class="container">
        <div class="row no-gutters slider-text align-items-center justify-content-center">
          <div class="col-md-9 ftco-animate text-center">
            <h1 class="mb-2 bread">JUEGO: AHORCADO</h1>
            <p class="button text-center"><a id="nuevoAhorcado" style="height:50px" class="btn btn-primary px-4 py-2">Crear nuevo ahorcado</a></p>
          </div>
        </div>
      </div>
</section>
      -->

<div style="min-height: 900px;background: #f0f2f5;padding: 40px 0px">
        <div class="container">
            <div class="d-flex">
                <div class="form-group col-3">
                    <p style="font-size: 1.2rem;font-weight: 900;text-transform: uppercase;color: #263e50;">AHORCADO</p>
                    <div class="list-option">
                        <div class="item-option d-flex" id="listarAhorcado">
                            <div><img src="{{asset('assets/web/img/list.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option"> Lista</div>
                        </div>
                        <div class="item-option d-flex" id="nuevoAhorcado">
                            <div ><img src="{{asset('assets/web/img/registro.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option"> Nuevo</div>
                        </div>
                        <!--
                        <div class="item-option d-flex">
                            <div><img src="{{asset('assets/web/img/ranking.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option"> Ranking</div>
                        </div>
      -->
                    </div>
                </div>
                <div class="form-group render-html col-xl-9" id="content-app">
                    
                </div>
            </div>
        </div>
    </div>

@endsection

@section('script')

    <script src="{{asset('assets/web/main/ahorcado.js')}}" type="module"></script>
@endsection