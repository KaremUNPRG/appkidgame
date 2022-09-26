<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\InicioController;
use App\Http\Controllers\Api\MemoramaController;
use App\Http\Controllers\Api\CompetenciaController;


use App\Http\Controllers\Api\AhorcadoController;
use App\Http\Controllers\Api\TemaController;
use App\Http\Controllers\Api\JuegoController;
use App\Http\Controllers\Api\PuntajeController;
use App\Http\Controllers\Api\SopaLetrasController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('inicio/juego',[InicioController::class,'index']);
Route::get('juego/valoracion/{CodigoJuego}',[InicioController::class,'showValoracion']);

Route::post('juegomemorama/',[JuegoController::class,'jugarMemorama']);

Route::middleware(['authapi'])->group(function () {
    Route::post('competencia',[CompetenciaController::class,'store']);
    Route::get('competencia',[CompetenciaController::class,'index']);
    Route::delete('competencia',[CompetenciaController::class,'destroy']);
    Route::get('competencia/get/{codigoCompetencia}',[CompetenciaController::class,'show']);
    Route::put('competencia',[CompetenciaController::class,'update']);
    Route::get('competencia/juegos',[CompetenciaController::class,'listaJuego']);
    Route::post('competencia/listarjuegos',[CompetenciaController::class,'listaJuegoCompetencia']);
    Route::post('competencia/verificarclave',[CompetenciaController::class,'verificarClave']);
    Route::post('competencia/ranking',[CompetenciaController::class,'rankingCompetencia']);
    Route::post('competencia/buscar',[CompetenciaController::class,'buscarCompetencia']);
    // Route::post('competencia/verificarjugado',[CompetenciaController::class,'verificarYaJugado']);
    Route::post('competencia/juegos/agregar',[CompetenciaController::class,'agregarJuegoCompetencia']);

    Route::post('juego/valoracion',[InicioController::class,'store']);
    
    Route::post('memorama',[MemoramaController::class,'store']);
    Route::get('memorama',[MemoramaController::class,'index']);
    Route::delete('memorama',[MemoramaController::class,'destroy']);
    Route::put('memorama',[MemoramaController::class,'update']);
    Route::get('memorama/listar/tema',[MemoramaController::class,'listarTema']);
    Route::get('memorama/get/{codigoMemorama}',[MemoramaController::class,'show']);
    
    Route::post('memorama/buscar',[MemoramaController::class,'buscarMemorama']);
    Route::post('puntaje-memorama',[PuntajeController::class,'storePuntajeMemorama']);   

    Route::get('sopaletras/temas', [SopaLetrasController::class,'getTemas']);
    Route::post('sopaletras', [SopaLetrasController::class,'store']);
    Route::get('sopaletras', [SopaLetrasController::class,'index']);
    Route::delete('sopaletras',[SopaLetrasController::class,'destroy']);
    Route::put('sopaletras/restore',[SopaLetrasController::class,'restore']);
    Route::put('sopaletras',[SopaLetrasController::class,'update']);
      Route::get('sopa-letras-competencias',[SopaLetrasController::class,'listCompetencias']);
     Route::post('agregar-sopa-competencia',[SopaLetrasController::class,'editCompetencias']);  
     Route::post('puntaje-sopa-letras',[PuntajeController::class,'storePuntajeSopaLetras']);  

 
});

Route::get('jugar-ahorcado/{id}',[JuegoController::class,'jugarAhorcado']);
Route::get('jugar-sopa-letras/{id}',[JuegoController::class,'jugarSopaLetras']);
Route::get('ahorcado-tema-relacionado/{tema}',[JuegoController::class,'listaAhorcadosRelacionados']);
Route::get('ahorcado-autor-relacionado/{cod}',[JuegoController::class,'listaAhorcadosRelacionados2']);
Route::get('sopa-letras-tema-relacionado/{tema}',[JuegoController::class,'listaSopasRelacionados']);
Route::get('sopa-letras-autor-relacionado/{cod}',[JuegoController::class,'listaSopasRelacionados2']);

Route::middleware(['authapi'])->group(function () {
    Route::post('ahorcado',[AhorcadoController::class,'store']);
    Route::get('ahorcado',[AhorcadoController::class,'index']);
    Route::delete('ahorcado',[AhorcadoController::class,'destroy']);
    Route::put('ahorcado',[AhorcadoController::class,'update']);
    Route::put('ahorcado/restore',[AhorcadoController::class,'restore']);
    Route::get('ahorcado-competencias',[AhorcadoController::class,'listCompetencias']);
    Route::post('agregar-juego-competencia',[AhorcadoController::class,'editCompetencias']);
    Route::post('puntaje-ahorcado',[PuntajeController::class,'storePuntajeAhorcado']);    
});
    
Route::middleware(['authapi'])->group(function () {
    Route::get('tema',[TemaController::class,'index']);    
});