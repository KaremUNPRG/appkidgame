<?php

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VistaController;
use App\Http\Controllers\GoogleController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // dd(session('ir'));
    return view('welcome');
})->name('welcome');

Route::get('/jugarAhorcado', function () {
    return view('jugarAhorcado');
})->name('jugarAhorcado');

Route::get('/jugarSopaLetras', function () {
    return view('jugarSopaLetras');
})->name('jugarSopaLetras');


Route::get('jugar-memoria/{id}',[VistaController::class,'jugarMemorama']);

Route::get('/salir', [VistaController::class,'salirApp'] );

Route::get('auth/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::middleware(['auth'])->group(function () {
    Route::get('/competencia', [VistaController::class,'competencia'])->name('competencia');

    Route::get('/competencia/jugar/{codigo}', [VistaController::class,'competenciaJugar'])->name('competenciajugar');

    Route::get('/memorama', [VistaController::class,'memorama'])->name('memorama');
    Route::get('/ahorcado', [VistaController::class,'ahorcado'])->name('ahorcado');
    Route::get('/tema', [VistaController::class,'tema'])->name('tema');
    Route::get('/sopaletras', [VistaController::class,'sopaletras'])->name('sopaletras');
});




