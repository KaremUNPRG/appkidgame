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
}
