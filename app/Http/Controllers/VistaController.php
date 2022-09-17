<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use App\Models\JuegoCompetencia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

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
    
    public function competenciaJugar(Request $request,$codigo)
    {
        $juegos = JuegoCompetencia::select(['juego.Titulo as TitJuego','tema.Titulo as TitTema','juego.Tipo','juego.Tiempo',
                                            'juego.Codigo as CodigoJuego','competencia.Nombre as NomCompetencia',
                                            'competencia.Codigo as CodigoCompetencia','competencia.Clave',
                                            'competencia.FechaInicio as FechaInicio','competencia.FechaTermino as FechaTermino',
                                            DB::raw('(select p.Puntaje from puntaje as p Inner join juegousuario as ju on 
                                            p.CodigoJuegoUsuario = ju.Codigo where ju.CodigoUsuario = '.Auth::user()->Codigo.' and 
                                            ju.CodigoJuego = juegocompetencia.CodigoJuego and ju.CodigoCompetencia = juegocompetencia.CodigoCompetencia) as Puntaje')])
                                ->join('juego','juego.Codigo','juegocompetencia.CodigoJuego')
                                ->join('tema','tema.Codigo','=','juego.CodigoTema')
                                ->join('competencia','competencia.Codigo','=','juegocompetencia.CodigoCompetencia')
                                ->where('juegocompetencia.CodigoCompetencia','=',$codigo)
                                ->where('competencia.Vigente','=',1)
                                ->get();
        // dd($juegos);
        $puntuacionTotal = 0;
        $clave = true;
        foreach ($juegos as $key => $value) {
            $puntuacionTotal += ($value->Puntaje > 0)?$value->Puntaje:0;
        }
        $disponible = null;
        if (count($juegos) > 0) {
            $cryp = $request->input('key') == null ? '' : Crypt::decryptString($request->input('key'));
            $clave = empty($juegos[0]->Clave)?true: ($cryp == $juegos[0]->Clave ? true : false);
            $fechaInicio    = new DateTime($juegos[0]->FechaInicio);
            $fechaTermino   = new DateTime($juegos[0]->FechaTermino);
            $fechaActual    = new DateTime("now");
            $disponible = ($fechaActual >= $fechaInicio) && ($fechaActual <= $fechaTermino);
        }
        return view('competenciaJugar')
                                ->with('disponible',$disponible)
                                ->with('juegos',$juegos)
                                ->with('clave',$clave)
                                ->with('puntajeTotal',$puntuacionTotal);
    }
}
