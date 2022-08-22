<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Competencia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;

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
        $competencia = Competencia::select(['*',DB::raw('date_format(FechaInicio, "%d/%m/%Y %h:%i%p") as FechaInicioAdd'),
                                                DB::raw('date_format(FechaTermino, "%d/%m/%Y %h:%i%p") as FechaTerminoAdd')])
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
        $newCompetencia = new Competencia;
        $newCompetencia->Nombre = $request->itmNombre;
        $newCompetencia->CodigoUsuario = $this->auth->Codigo;
        $newCompetencia->FechaInicio = $request->itmFechaInicio.' '.$request->itmHoraInicio;
        $newCompetencia->FechaTermino = $request->itmFechaTermino.' '.$request->itmHoraTermino;
        $newCompetencia->Clave = empty($request->itmClave)?null:$request->itmClave;
        $newCompetencia->save();

        return response()->json([
            'mensaje' => 'Competencia Registrada Correctamente'
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
        $newCompetencia = Competencia::find($request->Competencia);
        $newCompetencia->Nombre = $request->itmNombre;
        $newCompetencia->FechaInicio = $request->itmFechaInicio.' '.$request->itmHoraInicio;
        $newCompetencia->FechaTermino = $request->itmFechaTermino.' '.$request->itmHoraTermino;
        $newCompetencia->Clave = empty($request->itmClave)?null:$request->itmClave;
        $newCompetencia->save();

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
}
