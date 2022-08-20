@extends('layout.main')
@section('style')
    <style>
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
        .item-competencia{
            background: #fff;
            border-left: 4px solid #1eaaf1;
            margin: 15px 0px;
            padding-top: 20px;
            padding-bottom: 20px;
        }
        .title-competencia{
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
    </style>
@endsection
@section('content')

    <div style="min-height: 900px;background: #f0f2f5;padding: 40px 0px">
        <div class="container">
            <div class="d-flex">
                <div class="col-xl-3">
                    <p style="font-size: 1.2rem;font-weight: 900;text-transform: uppercase;color: #263e50;">Competencia</p>
                    <div class="list-option">
                        <div class="item-option d-flex" id="listarCompetencia">
                            <div><img src="{{asset('assets/web/img/list.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option"> Lista</div>
                        </div>
                        <div class="item-option d-flex" id="nuevoCompetencia">
                            <div ><img src="{{asset('assets/web/img/registro.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option"> Nuevo</div>
                        </div>
                        <div class="item-option d-flex">
                            <div><img src="{{asset('assets/web/img/ranking.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option"> Ranking</div>
                        </div>
                    </div>
                </div>
                <div class="render-html col-xl-9" id="content-app">
                    
                </div>
            </div>
        </div>
    </div>

@endsection

@section('script')
    <script src="{{asset('assets/web/main/competencia.js')}}" type="module"></script>
@endsection