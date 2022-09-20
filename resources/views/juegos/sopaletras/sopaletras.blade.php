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
        .item-sopa-letra{
            background: #fff;
            border-left: 4px solid #1eaaf1;
            margin: 15px 0px;
            padding-top: 20px;
            padding-bottom: 20px;
        }
        .title-sopa-letra{
            font-size: 1.5rem;
            font-weight: bold;
        }
        .tiempo-sopa {
            font-size: 1rem;
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
        .btn-mod {
            background-color:#dc3545 !important;
            border-color:#dc3545 !important;
            padding:0 0.5rem !important;
            border-radius: 100%;
            margin: auto 0 !important;
        }
        .form-mod {
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            font-size:12px !important;
            height: 2rem !important;
            padding: 0 0.75rem !important;
        }
        .btn-mod-e {
            height: 2.1rem !important;
            font-size: 12px !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            padding: 0 10px !important;
            border-radius: 0 3px 3px 0 !important;
        }
        .cl-caja {
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            /* margin: 0 auto; */
        }
        .content-mod {
            overflow: auto;
            height: 10rem;
        }
        /* PARA LA SOPA */
        #juego {
            border: 1px solid #f2f2f2;
            /* padding: 20px; */
            padding: 10px;
            float: left;
            margin: 30px 20px;
        }

        #juego div {
            width: 100%;
            margin: 0 auto;
        }

        /* style for each square in the puzzle */
        #juego .puzzleSquare {
            height: 40px;
            width: 40px;
            text-transform: uppercase;
            background-color: white;
            border: 0;
            font: 1em sans-serif;
        }

        button::-moz-focus-inner {
            border: 0;
        }

            /* indicates when a square has been selected */
        #juego .selected {
            background-color: orange;
        }

            /* indicates that the square is part of a word that has been found */ 
        #juego .found {
            background-color: blue;
            color: white;
        }

        #juego .solved {
            background-color: #E4CFFF;
            color: white;
        }

            /* indicates that all words have been found */
        #juego .complete {
            background-color: #4FCA4F;
        }

            /**
            * Styles for the word list
            */
        #palabras {
            padding-top: 5px;
            -moz-column-count: 3;
            -moz-column-gap: 20px;
            -webkit-column-count: 2;
            -webkit-column-gap: 20px;
            column-count: 3;
            column-gap: 20px;
            width: 300px;
        }

        #palabras ul {
            list-style-type: none;
        }

        #palabras li {
            padding: 3px 0;
            font: 1em sans-serif;
        }

        /* indicates that the word has been found */
        #palabras .wordFound {
            text-decoration: line-through;
            color: gray;
        }

        /**
        * Styles for the button
        */
        #solve {
            margin: 0 30px;
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

@media (max-width: 767.98px) {

.fl {
  display: block !important;
}

.lo {
  display: flex !important;
}


}

    </style>
@endsection
@section('content')

    <div style="min-height: 900px;background: #f0f2f5;padding: 40px 0px">
        <div class="container">
            <div class="d-flex fl">
                <div class="col-3">
                    <p style="font-size: 1.2rem;font-weight: 900;text-transform: uppercase;color: #263e50;">Sopa de Letras</p>
                    <div class="list-option lo">
                        <div class="item-option d-flex" id="listarSopa">
                            <div><img src="{{asset('assets/web/img/list.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option"> Lista</div>
                        </div>
                        <div class="item-option d-flex" id="nuevoSopa">
                            <div ><img src="{{asset('assets/web/img/registro.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option">Nuevo</div>
                        </div>
                        <!-- <div class="item-option d-flex">
                            <div><img src="{{asset('assets/web/img/ranking.png')}}" alt="" style="width: 30px;"></div>
                            <div class="font-weight-bold text-option">Ranking</div>
                        </div> -->
                    </div>
                </div>
                <div class="render-html col-xl-9" id="content-app">
                    
                </div>
            </div>
        </div>
    </div>


<div id="modal1" class="modal">
        <div class="modal-content">
            <h5>Agregar Juego a Competencia</h5>
            <div class="render-juego py-4 col-12">

            </div>
            <hr>
            <div>
                <div class="d-flex">
                  <!--
                    <div class="col-3">
                        <div class="input-field">
                            <select class="itmSelectJuego">
                                <option value="0" selected>Existente</option>
                                <option value="1">Nuevo</option>
                            </select>
                            <label>Competencia: </label>
                        </div>
                    </div>
-->
                    <div class="col-12">
                        <div class="input-field">
                            <i class="material-icons prefix">search</i>
                            <input id="icon_prefix" placeholder="Buscar competencia" type="text" class="validate itmBuscarCompetencia">
                            <label for="icon_prefix">Buscar Competencia</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="render-competencia py-4 col-12">

            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect bg-danger text-white waves-green btn-flat">Cancelar</a>
        </div>
    </div>






@endsection

@section('script')
    <script src="{{asset('assets/web/main/sopaletras.js')}}" type="module"></script>
    <script src="{{asset('lib/sopaLetras/wordfind.js')}}" type="text/javascript"></script>
    <script src="{{asset('lib/sopaLetras/wordfindgame.js')}}" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
      <script>
        $('.modal').modal();
        $('select').formSelect();
    </script>
@endsection