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
        return view('ahorcado');
    }

    public function memorama()
    {
        return view('juegos.memorama.memorama');
    }
}
