@extends('layout.main')
@section('content')

<section class="ftco-section bg-light">
    <div class="container">
        <div class="row justify-content-center mb-5 pb-2">
            <div class="col-md-8 text-center heading-section ftco-animate">
                <h2 class="mb-4"><span>Juegos</span> Recientes</h2>
            </div>
        </div>
        <div class="row">
            @for ($i = 0; $i < 7; $i++)
                <div class="col-md-6 col-lg-4 ftco-animate">
                    <div class="blog-entry">
                        <a href="blog-single.html" class="block-20 d-flex align-items-end"
                            style="background-image: url('https://blog.ida.cl/wp-content/uploads/sites/5/2020/04/tamano-redes-blog-655x470.png');">
                            <!-- <div class="meta-date text-center p-2">
                                        <span class="day">27</span>
                                        <span class="mos">Junio</span>
                                        <span class="yr">2022</span>
                                    </div> -->
                        </a>
                        <div class="text bg-white p-4">
                            <h3 class="heading"><a href="#">Memoria</a></h3>
                            <p>Inperio Inca.</p>
                            <div class="d-flex align-items-center mt-4">
                                <p class="mb-0"><a href="#" class="btn btn-primary">Jugar <span
                                            class="ion-ios-arrow-round-forward"></span></a></p>
                                <p class="ml-auto mb-0">
                                    <a href="#" class="mr-2">
                                        @for ($j=0; $j < 6-$i; $j++)
                                            <span class="ion-ios-star text-warning"></span>
                                        @endfor
                                    </a>
                                    <a href="#" class="meta-chat"><span class="icon-chat"></span> {{6-$i}}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            @endfor
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
    <script>
        $('.modal').modal();
    </script>
@endsection