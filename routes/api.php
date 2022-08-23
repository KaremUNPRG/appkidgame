<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CompetenciaController;
use App\Http\Controllers\Api\MemoramaController;

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

Route::middleware(['authapi'])->group(function () {
    Route::post('competencia',[CompetenciaController::class,'store']);
    Route::get('competencia',[CompetenciaController::class,'index']);
    Route::delete('competencia',[CompetenciaController::class,'destroy']);
    Route::put('competencia',[CompetenciaController::class,'update']);

    Route::post('memorama',[MemoramaController::class,'store']);
    Route::get('memorama',[MemoramaController::class,'index']);
    Route::delete('memorama',[MemoramaController::class,'destroy']);
    Route::put('memorama',[MemoramaController::class,'update']);
});