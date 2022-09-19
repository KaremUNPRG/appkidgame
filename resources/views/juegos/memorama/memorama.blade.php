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
        .item-memorama{
            background: #fff;
            border-left: 4px solid #1eaaf1;
            margin: 15px 0px;
            padding-top: 20px;
            padding-bottom: 20px;
        }
        .title-memorama{
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
        .item-borrador{
            border-left: 4px solid red;
        }

        .header-carta{
            border-bottom: 10px solid #1eaaf1;
            cursor: pointer;
        }
        .header-carta > div{
            background: #1eaaf1;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            padding: 0px 25px;
            color: #fff;
            display: inline-block;
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

    <div style="min-height: 900px;background: #f0f2f5;padding: 40px 0px">
        <div class="container">
            <div class="d-flex">
                <div class="col-xl-3">
                    <p style="font-size: 1.2rem;font-weight: 900;text-transform: uppercase;color: #263e50;">Juego de Memoria</p>
                    <div class="list-option">
                        <div class="item-option d-flex" id="listarMemorama">
                            <div><img src="{{asset('assets/web/img/list.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option"> Lista</div>
                        </div>
                        <div class="item-option d-flex" id="nuevoMemorama">
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
    <div id="modal1" class="modal">
        <div class="modal-content">
            <h5>Agregar Carta</h5>
            <div>
                <div class="d-flex flex-wrap">
                    <div class="col-md-8 col-12">
                        <div class="col-12">
                            <div class="input-field">
                                <input id="icon_prefix" type="text" class="itmDescripcionCarta">
                                <label for="icon_prefix">Descripción</label>
                            </div>
                            
                        </div>
                        <div class="col-12">
                            <div class="input-field">
                                <select class="itmTipoRecurso">
                                    <option value="02" selected>Archivo</option>
                                    <option value="01" >URL</option>
                                </select>
                                <label>Tipo Recurso</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-field">
                                <input type="file" placeholder="Url..." class="itmRecurso" accept="image/*">
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="imagen-previa">
                            <img src="" style="width: 100%;" class="content-imagen" alt="">
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect bg-danger text-white waves-green btn-flat">Cancelar</a>
            <a href="#!" class="modal-close waves-effect bg-info text-white waves-green btn-flat btnAgregarCarta">Agregar</a>
        </div>
    </div>
@endsection

@section('script')
    <script src="{{asset('assets/web/main/memorama.js')}}" type="module"></script>
    <script>
        $('.modal').modal();
        $('select').formSelect();
    </script>
@endsection