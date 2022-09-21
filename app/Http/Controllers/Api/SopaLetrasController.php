<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Tema;
use App\Models\Competencia;
use App\Models\JuegoCompetencia;
use App\Models\Juego;
use App\Models\SopaLetras;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;

class SopaLetrasController extends Controller
{
    private $auth ;
    public function __construct(Request $request) {
        $this->auth = User::ApiAuth($request->header('Authorization'));
    }

    public function getTemas (Request $request) {
        $temas = Tema::where('CodigoUsuario', $this->auth->Codigo)
                ->where('Vigente','=',1)
                ->select(['Codigo', 'Titulo'])
                ->orderBy('Titulo')
                ->get();

        return response()->json([
            'data' => $temas
        ], 200, []);
    }
 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sopaLetras = SopaLetras::join('juego as j','j.Codigo','=','sopa.CodigoJuego')
                    ->join('tema as t','t.Codigo','=','j.CodigoTema')
                        ->select(['*','j.Titulo as TitJuego',DB::raw('date_format(j.fecha, "%d/%m/%Y %h:%i %p") as FechaReg'),
                        DB::Raw('t.Titulo as Tema'), DB::Raw('j.Codigo as CodigoJuego'), DB::Raw('j.Vigente as VigJuego')])
                        ->where('t.CodigoUsuario','=',$this->auth->Codigo)
                        ->orderBy('j.Vigente','desc')
                        ->orderBy('j.Codigo','desc')->get();
        return response()->json([
            'data' => $sopaLetras
        ], 200, []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newJuego = new Juego;
        $newJuego->Titulo = $request->itmTitulo;
        $newJuego->Tiempo = $request->itmTiempo;
        
        $newJuego->CodigoTema = $request->CodigoTema;
        $newJuego->Fecha = date('Y-m-d H:i:s');
        $newJuego->Privado = $request->itmPrivado;
        $newJuego->Fondo = $request->itmFondo;
        $newJuego->Vigente = 1;
        $newJuego->Tipo = 3;
        $newJuego->Borrador = 0;
        
        $newJuego->save();
        $idJuego = $newJuego->Codigo;
        $newSopa = new SopaLetras;
        $newSopa->CodigoJuego = $idJuego;
        $newSopa->Filas  = $request->itmFilas;
        $newSopa->Columnas  = $request->itmColumnas;
        $newSopa->Palabras  = $request->listPalabras;
        $newSopa->Trampas  = $request->listTrampas;
        //$newSopa->CodigoUsuario = $this->auth->Codigo;
   
        $newSopa->save();

        return response()->json([
            'mensaje' => 'Sopa de letras registrada correctamente'
        ], 200, []);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Competencia  $competencia
     * @return \Illuminate\Http\Response
     */
    public function show(Competencia $competencia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $newJuego = Juego::find($request->itmCodigoJuego);    
        $newJuego->Titulo = $request->itmTitulo;
        $newJuego->Tiempo = $request->itmTiempo;
        $newJuego->CodigoTema = $request->CodigoTema;
        $newJuego->Fecha = date('Y-m-d H:i:s');
        $newJuego->Privado = $request->itmPrivado;
        $newJuego->Fondo = $request->itmFondo;
        //$newJuego->Vigente = 1;
        //$newJuego->Tipo = 3;
        $newJuego->update();

        $idJuego = $newJuego->Codigo;
        $newSopa = SopaLetras::find($idJuego);
        //$newSopa->CodigoJuego = $idJuego;
        $newSopa->Filas  = $request->itmFilas;
        $newSopa->Columnas  = $request->itmColumnas;
        $newSopa->Palabras  = $request->listPalabras;
        $newSopa->Trampas  = $request->listTrampas;
        //$newSopa->CodigoUsuario = $this->auth->Codigo; 
        $newSopa->update();

        return response()->json([
            'mensaje' => 'Se editó la sopa de letras correctamente'
        ], 200, []);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $newJuego = Juego::find($request->itmCodigoJuego);
        $newJuego->Vigente = 0;
        $newJuego->save();

        return response()->json([
            'mensaje' => 'Se eliminó correctamente'
        ], 200, []);
    }

    public function restore(Request $request)
    {
        $newJuego = Juego::find($request->itmCodigoJuego);
        $newJuego->Vigente = 1;
        $newJuego->save();

        return response()->json([
            'mensaje' => 'Restaurado correctamente'
        ], 200, []);
    }


      public function listCompetencias()
    {
        $competencia = Competencia::select(['*',DB::raw('date_format(FechaInicio, "%d/%m/%Y %h:%i %p") as FechaInicioAdd'),
                                                DB::raw('date_format(FechaTermino, "%d/%m/%Y %h:%i %p") as FechaTerminoAdd')])
                                ->where('Vigente','=',1)
                                ->where('CodigoUsuario','=',$this->auth->Codigo)
                                ->orderBy('Codigo','desc')->get();
        return response()->json([
            'data' => $competencia
        ], 200, []);
    }

       public function editCompetencias(Request $request)
    {
        $newJuegoComp = new JuegoCompetencia();
        $newJuegoComp->CodigoJuego = $request->itmCodigoJuego;
        $newJuegoComp->CodigoCompetencia = $request->itmCodigoCompetencia;
        $newJuegoComp->save();


        return response()->json([
            'mensaje' => 'Se editó correctamente'
        ], 200, []);
    }
}
