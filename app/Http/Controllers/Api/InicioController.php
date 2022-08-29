<?php

namespace App\Http\Controllers\Api;

use App\Models\Juego;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class InicioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $juegos = Juego::select(['juego.Titulo as TitJuego','tema.Titulo as TitTema','juego.Tipo','juego.Tiempo',
                        'juego.Codigo as CodigoJuego',DB::raw('AVG(valoracion.Valoracion) as ValoracionPunto'),
                        DB::raw('COUNT(valoracion.Comentario) as CantidadComentario')])
                        ->join('tema','tema.Codigo','=','juego.CodigoTema')
                        ->leftJoin('valoracion','valoracion.CodigoJuego','juego.Codigo')
                        ->where('juego.Vigente','=','1')
                        ->where('juego.Borrador','=','0')
                        ->groupBy('juego.Codigo')
                        ->orderBy('juego.Codigo','desc')->get();

        return response()->json([
            'data' => $juegos
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
