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

        $newJuegoUsuario = new JuegoUsuario;
        $newJuegoUsuario->CodigoUsuario = $this->auth->Codigo;
        $newJuegoUsuario->CodigoJuego = $request->Juego;
        $newJuegoUsuario->Fecha = $request->itmFecha;
        $newJuegoUsuario->save();

        $newPuntaje = new Puntaje;
        $newPuntaje->CodigoJuegoUsuario =  $newJuegoUsuario->Codigo;
        $newPuntaje->Vidas = $request->itmVidas;
        $newPuntaje->TiempoTotal = $request->itmTiempoTotal;
        $newPuntaje->TiempoDemorado = $request->itmTiempoDemorado;
        $newPuntaje->Descubiertas = $request->itmDescubiertas;
        $newPuntaje->Totales = $request->itmTotales;
        $newPuntaje->save();

        $puntaje = $newPuntaje->Vidas*($newPuntaje->TiempoDemorado/$newPuntaje->TiempoTotal)*($newPuntaje->Descubiertas/$newPuntaje->Totales);
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
