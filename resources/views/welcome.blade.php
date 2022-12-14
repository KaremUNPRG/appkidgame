@extends('layout.main')
@section('style')
    <style>
        .selectEstrella{
            cursor: pointer;
        }
        .avatar-comentario{
            padding-right: 20px;
        }
        .avatar-comentario img{
            border-radius: 50%;
        }
        .user-comentario span{
            font-size: 1rem;
            font-weight: 500;
        }
        .mComentario::-webkit-scrollbar {
            width: 8px;    
            height: 8px;
        }
        .mComentario::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
        }

        .mComentario::-webkit-scrollbar-thumb:hover {
            background: #b3b3b3;
            box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
        }

        .mComentario::-webkit-scrollbar-thumb:active {
            background-color: #999999;
        }
        .mComentario::-webkit-scrollbar-track {
            background: #e1e1e1;
            border-radius: 4px;
        }
        .mComentario::-webkit-scrollbar-track:hover,
        .mComentario::-webkit-scrollbar-track:active {
        background: #d4d4d4;
        }
        .item-tab{
            margin: 10px 20px;
            cursor: pointer;
            font-size: 1.3rem;
        }
        .item-tab-select{
            font-weight: bold;
            color: #2859fc;
            position: relative;
        }
        .item-tab-select::after{
            content: '';
            border-left: 50px solid;
            border-top: 3px solid;
            position: absolute;
            left: 0;
            top: 30px;
        }
        .input-buscar{
            position: absolute;
            background: #fff!important;
            font-size: 1.3rem!important;
            padding: 0px 20px!important;
            left: 0px;
            right: 0px;
            height: 100%!important;
            top: 0px;
            bottom: 0px;
            border: 1px solid #a6aaad!important;
            border-radius: 10px!important;
            transform: scale(1);
            transition: .1s!important;
        }
        .view-input-search .icon-close{
            position: absolute;
            z-index: 1;
            right: -10px;
            top: 15%;
            font-size: 2rem;
            color: #f10862;
            cursor: pointer;
        }

        .view-input-search .icon-buscar{
            position: absolute;
            z-index: 1;
            right: 30px;
            top: 15%;
            font-size: 2rem;
            color: #1eaaf1;
            cursor: pointer;
        }

        .hide-efecto .icon-close{
            display: none;
        }
        .hide-efecto .icon-buscar{
            display: none;
        }

        .hide-efecto input{
            transform: scale(0);
            transition: .1s!important;
        }
    </style>
@endsection
@section('content')

<section class="ftco-section bg-light" style="padding-top: 50px;">
    <div class="container">
        <div class="row justify-content-center mb-5 pb-2" style="position: relative">
            <div class="item-tab item-tab-select" data-key="0">Reciente</div>
            <div class="item-tab" data-key="1">Mejores</div>
            <div style=" margin: 10px 20px;">
                <div class="view-input-search hide-efecto">
                    <i class="bi bi-x-lg icon-close"></i>
                    <i class="bi bi-search icon-buscar"></i>
                    <input type="text" class="input-buscar" autocomplete="off">
                </div>
                <button type="button" class="btn btnBuscarJuego"  style="background: transparent;color: #454545;border: 1px solid!important;margin-top: 0px;">
                    <i class="bi bi-search"></i>
                </button>
            </div>
        </div>
        <div class="row renderHtmlListaJuego pt-5" style="min-height: 500px">
            
        </div>
    </div>
</section>
<section class="home-slider owl-carousel">
    <div class="slider-item" style="background-image:url('template/images/bg_2.jpg');">
        <div class="overlay"></div>
        <div class="container">
            <div class="row no-gutters slider-text align-items-center justify-content-center"
                data-scrollax-parent="true">
                <div class="col-md-8 text-center ftco-animate">
                    <h1 class="mb-4">Juega &<span> Aprende</span></h1>
                </div>
            </div>
        </div>
    </div>

</section>
<section class="ftco-services ftco-no-pb">
    <div class="container-wrap">
        <div class="row no-gutters justify-content-center">
            <div class="col-md-4 d-flex services align-self-stretch pb-4 px-4 ftco-animate bg-primary">
                <div class="media block-6 d-block text-center">
                    <div class="icon d-flex justify-content-center align-items-center">
                        <span class="flaticon-teacher"></span>
                    </div>
                    <div class="media-body p-2 mt-3">
                        <h3 class="heading">Ahorcado</h3>
                        <p>El ???Ahorcado??? es un juego de adivinanza, cuya finalidad es que descifren el significado sin
                            ser ???ahorcados??? por los desaciertos. Por cada error, se ir?? dibujando una parte del cuerpo,
                            cuando est?? completa esta figura,
                            el jugador que trata de adivinar ya no tendr?? m??s oportunidades y habr?? perdido.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 d-flex services align-self-stretch pb-4 px-4 ftco-animate bg-tertiary">
                <div class="media block-6 d-block text-center">
                    <div class="icon d-flex justify-content-center align-items-center">
                        <span class="flaticon-reading"></span>
                    </div>
                    <div class="media-body p-2 mt-3">
                        <h3 class="heading">Memoria</h3>
                        <p>Memorama o juego de la memoria es un juego de mesa con una baraja de cartas espec??ficas. El
                            objetivo consiste en encontrar los pares con la misma figura impresa utilizando la memoria.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 d-flex services align-self-stretch pb-4 px-4 ftco-animate bg-fifth">
                <div class="media block-6 d-block text-center">
                    <div class="icon d-flex justify-content-center align-items-center">
                        <span class="flaticon-books"></span>
                    </div>
                    <div class="media-body p-2 mt-3">
                        <h3 class="heading">Sopa Letra</h3>
                        <p>La sopa de letras es un pasatiempo inventado por Pedro Oc??n de Oro, que consiste en una
                            cuadr??cula u otra forma geom??trica rellena con diferentes letras para formar un juego de
                            palabras.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<div id="mComentario" class="mComentario modal" style="width: 40%;">
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
    
    <script src="{{asset('assets/web/main/inicio.js')}}?v1={{time()}}" type="module"></script>
    <script>
        $('.modal').modal();
        $('.btnBuscarJuego').click(function (e) { 
            if($('.view-input-search').hasClass('hide-efecto')){
                $('.view-input-search').removeClass('hide-efecto')
                $('.input-buscar').focus()
            }else{
                $('.view-input-search').addClass('hide-efecto')
            }
        });

        $('.icon-close').click(function () {  
            if($('.view-input-search').hasClass('hide-efecto')){
                $('.view-input-search').removeClass('hide-efecto')
            }else{
                $('.view-input-search').addClass('hide-efecto')
            }
        })
    </script>
@endsection