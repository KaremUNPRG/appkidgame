<?php

namespace App\Http\Controllers\Api;

use App\Models\Juego;
use App\Models\JuegoUsuario;
use App\Models\Puntaje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\User;

class JuegoController extends Controller
{
    private $auth ;
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


 public function jugarSopaLetras (Request $request) {
        $juego = Juego::select([
            'juego.Codigo','juego.Titulo', 'Palabras','Trampas',
            'tema.Titulo as Tema', 'Tiempo','Fondo','tema.CodigoUsuario',
            'Filas','Columnas'
            ])
            ->join('tema','juego.CodigoTema','=','tema.Codigo')
            ->join('sopa','juego.Codigo','=','sopa.CodigoJuego')
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


public function listaSopasRelacionados(Request $request)
{
    $juego = Juego::select([
                        'juego.Codigo','juego.Titulo as TitJuego',DB::raw('AVG(valoracion.Valoracion) as ValoracionPunto'),
                        'tema.Titulo as TitTema','tiempo'
                        ])
                        ->join('tema','juego.CodigoTema','=','tema.Codigo')
                        ->leftJoin('valoracion','valoracion.CodigoJuego','juego.Codigo')
                        ->where('juego.Vigente','=','1')
                        ->where('juego.Tipo','=','3')
                        ->where('tema.Titulo','like','%'. $request->tema .'%') 
                        ->groupBy('juego.Codigo')
                        ->orderBy('ValoracionPunto','desc')
                        ->limit(4)->get();
                        

        return response()->json([
            'data' => $juego, 
        ], 200, []); 
   


}

public function listaSopasRelacionados2(Request $request)
{
    $juego = Juego::select([
                        'juego.Codigo','juego.Titulo as TitJuego',DB::raw('AVG(valoracion.Valoracion) as ValoracionPunto'),
                        'tema.Titulo as TitTema','tiempo'
                        ])
                        ->join('tema','juego.CodigoTema','=','tema.Codigo')
                        ->leftJoin('valoracion','valoracion.CodigoJuego','juego.Codigo')
                        ->where('juego.Vigente','=','1')
                        ->where('juego.Tipo','=','3')
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

    public function jugarMemorama(Request $request)
    {
        $this->auth = User::ApiAuth($request->header('Authorization'));
        $juegoArray = [];
        $juego = Juego::select([
                            'juego.Titulo','carta.Descripcion as DescCarta','Imagen',
                            'tema.Descripcion', 'tiempo','Fondo','carta.Codigo as CodigoCarta',
                            'juego.Tiempo as Tiempo','juego.Fondo as Fondo',
                            DB::raw('(select pt.Puntaje from puntaje as pt inner join 
                            juegousuario as ju on pt.CodigoJuegoUsuario = ju.Codigo 
                            where ju.CodigoJuego = juego.Codigo and 
                            ju.CodigoUsuario '.($this->auth == null ? 'is null':(' = '.$this->auth->Codigo)).' and 
                            ju.CodigoCompetencia '.($request->id2 == null ? 'is null':(' = '.$request->id2)).' Limit 1) as MiPuntaje')
                            ])
                            ->join('tema','juego.CodigoTema','=','tema.Codigo')
                            ->join('carta','juego.Codigo','=','carta.CodigoJuego')
                            ->where('juego.Codigo','=',$request->id)->get();
        foreach ($juego as $key => $value) {
            array_push($juegoArray,[
                'Key' => $key."01",
                'Imagen'=> $value->Imagen,
                'DescCarta'=> $value->DescCarta,
                'Tipo'=> 'Imagen'
            ]);
        }
        foreach ($juego as $key => $value) {
            array_push($juegoArray,[
                'Key' => $key."02",
                'Imagen'=> $value->Imagen,
                'DescCarta'=> $value->DescCarta,
                'Tipo'=> 'Texto'
            ]);
        }
        return response()->json([
            'data' => $juegoArray, 
            'juego'=> $juego[0]
        ], 200, []); 
    }
}
