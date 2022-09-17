<?php

namespace App\Http\Controllers\Api;

use App\Models\Juego;
use App\Models\JuegoUsuario;
use App\Models\Puntaje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class JuegoController extends Controller
{
    public function index()
    {
        $juego = Juego::select([
                            'juego.Codigo','Titulo',
                            'tema.Descripcion','Fecha', 
                            'tiempo', 'Tipo'
                            ])
                            ->join('tema','juego.codTema','=','tema.Codigo')
                            ->where('juego.Vigente','=',1)
                            ->where('juego.Privado','=',0)
                            ->orderBy('juego.Fecha','desc')->get();
       
            return response()->json([
                'data' => $juego,
            ], 200, []); 
       
    }

       /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function jugarAhorcado(Request $request)
    {
        $juego = Juego::select([
                            'juego.Codigo','juego.Titulo as TitJuego', 'Palabra','Pista',
                            'tema.Titulo as TitTema', 'tiempo','Fondo', 'tema.CodigoUsuario'
                            ])
                            ->join('tema','juego.CodigoTema','=','tema.Codigo')
                            ->join('ahorcado','juego.Codigo','=','ahorcado.CodigoJuego')
                            ->where('juego.Codigo','=',$request->id)->get();
    
            return response()->json([
                'data' => $juego, 
            ], 200, []); 
       


}

public function listaAhorcadosRelacionados(Request $request)
{
    $juego = Juego::select([
                        'juego.Codigo','juego.Titulo as TitJuego',DB::raw('AVG(valoracion.Valoracion) as ValoracionPunto'),
                        'tema.Titulo as TitTema','tiempo'
                        ])
                        ->join('tema','juego.CodigoTema','=','tema.Codigo')
                        ->leftJoin('valoracion','valoracion.CodigoJuego','juego.Codigo')
                        ->where('juego.Vigente','=','1')
                        ->where('juego.Tipo','=','2')
                        ->where('tema.Titulo','like','%'. $request->tema .'%') 
                        ->groupBy('juego.Codigo')
                        ->orderBy('ValoracionPunto','desc')
                        ->limit(4)->get();
                        

        return response()->json([
            'data' => $juego, 
        ], 200, []); 
   


}

public function listaAhorcadosRelacionados2(Request $request)
{
    $juego = Juego::select([
                        'juego.Codigo','juego.Titulo as TitJuego',DB::raw('AVG(valoracion.Valoracion) as ValoracionPunto'),
                        'tema.Titulo as TitTema','tiempo'
                        ])
                        ->join('tema','juego.CodigoTema','=','tema.Codigo')
                        ->leftJoin('valoracion','valoracion.CodigoJuego','juego.Codigo')
                        ->where('juego.Vigente','=','1')
                        ->where('juego.Tipo','=','2')
                        ->where('tema.CodigoUsuario','=',$request->cod) 
                        ->groupBy('juego.Codigo')
                        ->orderBy('ValoracionPunto','desc')
                        ->limit(4)->get();
                        

        return response()->json([
            'data' => $juego, 
        ], 200, []); 
   


}


    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
}
