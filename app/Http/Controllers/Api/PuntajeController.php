<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\JuegoUsuario;
use App\Models\Puntaje;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PuntajeController extends Controller
{
    private $auth ;
    
    public function __construct(Request $request) {
        $this->auth = User::ApiAuth($request->header('Authorization'));
    }

    public function storePuntajeAhorcado(Request $request)
    {
        $sqlJuegoUsuario = JuegoUsuario::where('CodigoJuego','=',$request->Juego)
                                        ->where('CodigoUsuario','=',$this->auth->Codigo)
                                        ->where('CodigoCompetencia','=',$request->Competencia); 
        if($sqlJuegoUsuario->count() > 0){
            $updatePuntaje = Puntaje::find($sqlJuegoUsuario->first()->Codigo);
            $updatePuntaje->Vidas = $request->itmVidas;
            $updatePuntaje->TiempoTotal = $request->itmTiempoTotal;
            $updatePuntaje->TiempoDemorado = $request->itmTiempoDemorado;
            $updatePuntaje->CantidadDescubiertas = $request->itmDescubiertas;
            $updatePuntaje->Totales = $request->itmTotales;
            $puntaje = $updatePuntaje->Vidas*($updatePuntaje->TiempoTotal/$updatePuntaje->TiempoDemorado)*($updatePuntaje->CantidadDescubiertas/$updatePuntaje->Totales);
            $updatePuntaje->Puntaje = $puntaje;
            $updatePuntaje->save();
        }else{
            $newJuegoUsuario = new JuegoUsuario;
            $newJuegoUsuario->CodigoUsuario = $this->auth->Codigo;
            $newJuegoUsuario->CodigoJuego = $request->Juego;
            $newJuegoUsuario->CodigoCompetencia  = $request->Competencia;
            $newJuegoUsuario->Fecha = $request->itmFecha;
            $newJuegoUsuario->save();

            $newPuntaje = new Puntaje;
            $newPuntaje->CodigoJuegoUsuario  =  $newJuegoUsuario->Codigo;
            $newPuntaje->Vidas = $request->itmVidas;
            $newPuntaje->TiempoTotal = $request->itmTiempoTotal;
            $newPuntaje->TiempoDemorado = $request->itmTiempoDemorado;
            $newPuntaje->CantidadDescubiertas = $request->itmDescubiertas;
            $newPuntaje->Totales = $request->itmTotales;
            $puntaje = $newPuntaje->Vidas*($newPuntaje->TiempoTotal/$newPuntaje->TiempoDemorado)*($newPuntaje->CantidadDescubiertas/$newPuntaje->Totales);
            $newPuntaje->Puntaje = $puntaje;
            $newPuntaje->save();

        }
        
       
        return response()->json([
            'puntaje' => $puntaje
        ], 200, []);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ahorcado  $Ahorcado
     * @return \Illuminate\Http\Response
     */

}
