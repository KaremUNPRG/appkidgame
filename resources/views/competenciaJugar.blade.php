@extends('layout.main')
@section('style')

@endsection
@section('content')
<section class="ftco-section bg-light" style="padding: 0px;">
    <div class="container">
        @if (count($juegos) > 0)
            @if ($disponible)
                <div class="row justify-content-center mb-5 pb-2">
                    <div class="col-md-8 text-center heading-section ftco-animate">
                        <h2 class="mb-4"> Competencia: {{$juegos[0]->NomCompetencia}} <br> <span> PG: {{$puntajeTotal}}</span></h2>
                    </div>
                </div>
                <div class="row renderHtmlListaJuego">
                    @foreach ($juegos as $item)
                        <div class="col-md-6 col-lg-4">
                            <div class="blog-entry" style="box-shadow: 1px 1px 11px 1px rgb(0 0 0 / 10%);">
                                <a href="#" class="block-20 d-flex align-items-end"
                                    style="background-image: url('/assets/web/img/{{$item->Tipo == 1 ? 'perspectiva' 
                                    : ($item->Tipo == 2 ? 'verdugo' : 'letras') }}.png');background-size: auto;">
                                </a>
                                <div class="text bg-white p-4">
                                    <h3 class="heading"><a href="#">{{$item->TitJuego}}</a></h3>
                                    <p>{{$item->TitTema}}</p>
                                    <div class="d-flex align-items-center mt-4">
                                        <p class="mb-0">
                                            @if ($item->Puntaje == null)
                                                <a data-key="{{$item->Tipo}}" data-id="{{$item->CodigoJuego}}" 
                                                    data-competencia="{{$item->CodigoCompetencia}}" href="#" class="jugar btn btn-primary">Jugar <span
                                                class="ion-ios-arrow-round-forward"></span></a>
                                            @else
                                                <a href="#" class="jugar btn btn-primary disable" disabled>Jugar <span
                                                class="ion-ios-arrow-round-forward"></span></a>
                                            @endif
                                        </p>
                                        <p class="ml-auto mb-0 viewComentario modal-trigger" href="#mComentario">
                                            Puntaje :
                                            <strong>{{$item->Puntaje == null ? '--' : $item->Puntaje}}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @else
                <div class="d-flex py-5 ">
                    <div class="col-md-10 col-12  py-5 my-5">
                        <h1 style="font-weight: 900;">¡Ay no, mala suerte!</h1>
                        <h5>La competencia no se encuentra disponible para esta fecha.</h5>
                    </div>
                    <div class="col-md-2 col-12  py-5 my-5">
                        <img src="{{asset('assets/web/img/time.svg')}}" style="width:100%" alt="">
                    </div>
                    
                </div>
            @endif
        @else
            <div class="d-flex py-5 ">
                <div class="col-md-5 col-12  py-5 my-5">
                    <img src="{{asset('assets/web/img/nodisponible.svg')}}" alt="">
                </div>
                <div class="col-md-7 col-12  py-5 my-5">
                    <h1 style="font-weight: 900;">¡Ay no, mala suerte!</h1>
                    <h5>La competencia que estás buscando podría haber sido eliminado o no tiene juegos disponibles.</h5>
                </div>
            </div>
        @endif
    </div>
</section>
@endsection
@section('script')
    <script src="{{asset('assets/web/main/competenciaJugar.js')}}" type="module"></script>
@endsection