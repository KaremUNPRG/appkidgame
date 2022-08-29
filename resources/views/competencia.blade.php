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
        .is-today{
            background: #000;
            color: #fff!important;
            border-radius: 0px;
        }
        datepicker-table td.is-selected {
            background-color: #26a69a!important;
        }
        .header-juego{
            border-bottom: 10px solid #1eaaf1;
            cursor: pointer;
        }
        .header-juego > div{
            background: #1eaaf1;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            padding: 0px 25px;
            color: #fff;
            display: inline-block;
        }
        @media (max-width: 576px) {
            .container{
                width: 100%;
            }
            .list-option{
                display: flex;
                flex-wrap: wrap;
            }
            .container > .d-flex > .col-12{
                padding: 0px;
            }

            .list-option .item-option{
                padding: 10px;
            }
        }
        .content-juego{
            min-height: 100px;
        }
    </style>
@endsection
@section('content')

    <div style="min-height: 900px;background: #f0f2f5;padding: 40px 0px">
        <div class="container">
            <div class="d-flex flex-wrap">
                <div class="col-xl-3 col-12">
                    <p style="font-size: 1.2rem;font-weight: 900;text-transform: uppercase;color: #263e50;">Competencias</p>
                    <div class="list-option">
                        <div class="item-option d-flex" id="listarCompetencia">
                            <div><img src="{{asset('assets/web/img/list.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option"> Lista</div>
                        </div>
                        <div class="item-option d-flex" id="nuevoCompetencia">
                            <div ><img src="{{asset('assets/web/img/registro.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option"> Nuevo</div>
                        </div>
                        <div class="item-option d-flex" id="rankingCompetencia">
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
    <div id="modal1" class="modal">
        <div class="modal-content">
            <h5>Agregar Juego</h5>
            <hr>
            <div>
                <div class="d-flex">
                    <div class="col-3">
                        <div class="input-field">
                            <select class="itmSelectJuego">
                                <option value="0" selected>Todos</option>
                                <option value="1">Memoria</option>
                                <option value="2">Ahorcado</option>
                                <option value="3">Sopa Letra</option>
                            </select>
                            <label>Tipo de Juego</label>
                        </div>
                    </div>
                    <div class="col-9">
                        <div class="input-field">
                            <i class="material-icons prefix">search</i>
                            <input id="icon_prefix" placeholder="Buscar juego" type="text" class="validate itmBuscarJuego">
                            <label for="icon_prefix">Buscar Juego</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="render-juego py-4 col-12">

            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect bg-danger text-white waves-green btn-flat">Cancelar</a>
        </div>
    </div>
@endsection

@section('script')
    <script src="{{asset('assets/web/main/competencia.js')}}" type="module"></script>
    <script>
        $('.modal').modal();
        $('select').formSelect();
    </script>
@endsection