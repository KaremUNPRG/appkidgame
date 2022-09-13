<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JuegoCompetencia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class VistaController extends Controller
{
    public function competencia()
    {
        return view('competencia');
    }

    public function memorama()
    {
        return view('juegos.memorama.memorama');
    }

    public function salirApp()
    {
        Auth::logout(); 
        return redirect('/');
    }

    public function jugarMemorama()
    {
        return view('juegos.memorama.jugarMemorama');
    }
    
    public function competenciaJugar($codigo)
    {
        $juegos = JuegoCompetencia::select(['juego.Titulo as TitJuego','tema.Titulo as TitTema','juego.Tipo','juego.Tiempo',
                                            'juego.Codigo as CodigoJuego','competencia.Nombre as NomCompetencia',
                                            DB::raw('(select p.Puntaje from puntaje as p Inner join juegousuario as ju on 
                                            p.CodigoJuegoUsuario = ju.Codigo where ju.CodigoUsuario = '.Auth::user()->Codigo.' and 
                                            ju.CodigoJuego = juegocompetencia.CodigoJuego and ju.CodigoCompetencia = juegocompetencia.CodigoCompetencia) as Puntaje')])
                                ->join('juego','juego.Codigo','juegocompetencia.CodigoJuego')
                                ->join('tema','tema.Codigo','=','juego.CodigoTema')
                                ->join('competencia','competencia.Codigo','=','juegocompetencia.CodigoCompetencia')
                                ->where('juegocompetencia.CodigoCompetencia','=',$codigo)
                                ->get();
        $puntuacionTotal = 0;
        foreach ($juegos as $key => $value) {
            $puntuacionTotal += ($value->Puntaje > 0)?$value->Puntaje:0;
        }
                            // dd($juegos);
        return view('competenciaJugar')
                                ->with('juegos',$juegos)
                                ->with('puntajeTotal',$puntuacionTotal);
    }
}
