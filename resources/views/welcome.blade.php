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
    </style>
@endsection
@section('content')

<section class="ftco-section bg-light">
    <div class="container">
        <div class="row justify-content-center mb-5 pb-2">
            <div class="col-md-8 text-center heading-section ftco-animate">
                <h2 class="mb-4"><span>Juegos</span> Recientes</h2>
            </div>
        </div>
        <div class="row renderHtmlListaJuego">

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
                        <p>El “Ahorcado” es un juego de adivinanza, cuya finalidad es que descifren el significado sin
                            ser “ahorcados” por los desaciertos. Por cada error, se irá dibujando una parte del cuerpo,
                            cuando esté completa esta figura,
                            el jugador que trata de adivinar ya no tendrá más oportunidades y habrá perdido.</p>
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
                        <p>Memorama o juego de la memoria es un juego de mesa con una baraja de cartas específicas. El
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
                        <p>La sopa de letras es un pasatiempo inventado por Pedro Ocón de Oro, que consiste en una
                            cuadrícula u otra forma geométrica rellena con diferentes letras para formar un juego de
                            palabras.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<div id="mComentario" class="mComentario modal" style="width: 25%;">
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
                    <i class="material-icons sendComentario" style="font-size: 2rem;cursor: pointer;">send</i>
                    <label for="itemComentario" style="font-size: 2rem;transform: translateY(-34px) scale(0.8);">
                        <div class="misEstrellas">
                            <span class="ion-ios-star text-secondary selectEstrella"></span>
                            <span class="ion-ios-star text-secondary selectEstrella"></span>
                            <span class="ion-ios-star text-secondary selectEstrella"></span>
                            <span class="ion-ios-star text-secondary selectEstrella"></span>
                            <span class="ion-ios-star text-secondary selectEstrella"></span>
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
    @if (session('accessToken'))
        @php
            $accessToken =session('accessToken');
        @endphp
        <script>
            localStorage.setItem('accessToken',@json($accessToken));
        </script>
    @endif
    <script src="{{asset('assets/web/main/inicio.js')}}?v1={{time()}}" type="module"></script>
    <script>
        $('.modal').modal();
    </script>
@endsection