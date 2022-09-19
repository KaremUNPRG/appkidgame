<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VistaController extends Controller
{
    public function competencia()
    {
        return view('competencia');
    }

    public function ahorcado()
    {
        return view('juegos.ahorcado.ahorcado');
    }

    public function memorama()
    {
        return view('juegos.memorama.memorama');
    }

    public function sopaletras()
    {
        return view('juegos.sopaletras.sopaletras');
    }

    public function salirApp()
    {
        Auth::logout(); 
        return redirect('/');
    }
}
