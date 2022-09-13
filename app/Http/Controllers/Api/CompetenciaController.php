<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Juego;
use App\Models\Competencia;
use Illuminate\Http\Request;

use App\Models\JuegoCompetencia;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class CompetenciaController extends Controller
{
    private $auth ;
    public function __construct(Request $request) {
        $this->auth = User::ApiAuth($request->header('authorization'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request);
        $newCompetencia = new Competencia;
        $newCompetencia->Nombre = $request->itmNombre;
        $newCompetencia->CodigoUsuario = $this->auth->Codigo;
        $newCompetencia->FechaInicio = $request->itmFechaInicio.' '.$request->itmHoraInicio;
        $newCompetencia->FechaTermino = $request->itmFechaTermino.' '.$request->itmHoraTermino;
        $newCompetencia->Clave = empty($request->itmClave)?null:$request->itmClave;
        $newCompetencia->save();

        foreach ($request->itmListaJuego as $key => $value) {
            
            $newJuegoComp = new JuegoCompetencia();
            $newJuegoComp->CodigoJuego = $value['CodigoJuego'];
            $newJuegoComp->CodigoCompetencia = $newCompetencia->Codigo;
            $newJuegoComp->save();
        }

        return response()->json([
            'mensaje' => 'Competencia Registrada Correctamente'
        ], 200, []);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($codigoCompetencia)
    {
        $juegos = JuegoCompetencia::select(['juego.Titulo as TitJuego','tema.Titulo as TitTema','juego.Tipo','juego.Tiempo',
                                            'juego.Codigo as CodigoJuego'])
                                ->join('juego','juego.Codigo','juegocompetencia.CodigoJuego')
                                ->join('tema','tema.Codigo','=','juego.CodigoTema')
                                ->where('juegocompetencia.CodigoCompetencia','=',$codigoCompetencia)
                                ->get();
        return response()->json([
            'data' => $juegos
        ], 200, []);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $newCompetencia = Competencia::find($request->Competencia);
        $newCompetencia->Nombre = $request->itmNombre;
        $newCompetencia->FechaInicio = $request->itmFechaInicio.' '.$request->itmHoraInicio;
        $newCompetencia->FechaTermino = $request->itmFechaTermino.' '.$request->itmHoraTermino;
        $newCompetencia->Clave = empty($request->itmClave)?null:$request->itmClave;
        $newCompetencia->save();
        JuegoCompetencia::where('CodigoCompetencia','=',$request->Competencia)->delete();
        foreach ($request->itmListaJuego as $key => $value) {
            $newJuegoComp = new JuegoCompetencia();
            $newJuegoComp->CodigoJuego = $value['CodigoJuego'];
            $newJuegoComp->CodigoCompetencia = $newCompetencia->Codigo;
            $newJuegoComp->save();
        }

        return response()->json([
            'mensaje' => 'Se Editó Correctamente'
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
        $newCompetencia = Competencia::find($request->Competencia);
        $newCompetencia->Vigente = 0;
        $newCompetencia->save();

        return response()->json([
            'mensaje' => 'Se Eliminó Correctamente'
        ], 200, []);
    }

    /**
     * Listar todos los tipos de juego para competencia
     * @return \Illuminate\Http\Response
     */
    public function listaJuego()
    {
        $juegos = Juego::select(['juego.Titulo as TitJuego','tema.Titulo as TitTema','juego.Tipo','juego.Tiempo','juego.Codigo as CodigoJuego'])
                        ->join('tema','tema.Codigo','=','juego.CodigoTema')
                        ->where('juego.Vigente','=',1)
                        ->where('tema.CodigoUsuario','=',$this->auth->Codigo)
                        ->get();
        return response()->json([
            'data' => $juegos
        ], 200, []);
    }

    /**
     * Listar todos los tipos de juego para competencia
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function listaJuegoCompetencia(Request $request)
    {
        $juegos = JuegoCompetencia::select(['juego.Titulo as TitJuego','tema.Titulo as TitTema','juego.Tipo','juego.Tiempo',
                                            'juego.Codigo as CodigoJuego',DB::raw('select p.Puntaje from puntaje as p Inner join juegousuario as ju on 
                                            p.CodigoJuegoUsuario = ju.Codigo where ju.CodigoUsuario = '.Auth::user()->Codigo.' and 
                                            ju.CodigoJuego = juegocompetencia.CodigoJuego and ju.CodigoCompetencia = juegocompetencia.CodigoCompetencia')])
                                ->join('juego','juego.Codigo','juegocompetencia.CodigoJuego')
                                ->join('tema','tema.Codigo','=','juego.CodigoTema')
                                ->leftjoin('puntaje.')
                                ->where('juegocompetencia.CodigoCompetencia','=',$request->Competencia)
                                ->get();
                            
        return response()->json([
            'data' => $juegos
        ], 200, []);
    }
}
