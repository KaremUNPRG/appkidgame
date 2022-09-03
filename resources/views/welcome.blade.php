@extends('layout.main')
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
    <script src="{{asset('assets/web/main/inicio.js')}}" type="module"></script>
    <script>
        $('.modal').modal();
    </script>
@endsection