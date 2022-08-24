<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Juego;

use Illuminate\Support\Facades\DB;

class MemoramaController extends Controller
{
    private $auth ;
    public function __construct(Request $request) {
        $this->auth = User::ApiAuth($request->header('authorization'));
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $memorama = DB::select("select *,j.Codigo as codigoJuego,j.Titulo as TituloJuego 
        from juego j inner join tema t on j.CodigoTema = t.Codigo inner join usuario u on u.Codigo = t.CodigoUsuario 
        where u.Codigo = ? and j.Tipo = 1 and j.Vigente = 1 and j.Borrador = 0", [$this->auth->Codigo]);
        return response()->json([
        'data' => $memorama
        ], 200, []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newJuego = new Juego;
        $newJuego->Titulo = $request->itmTitulo;
        $newJuego->Tipo = 1;
        $newJuego->Tiempo = $request->itmTiempo;
        $newJuego->Fecha = date('Y-m-d H:i:s');
        $newJuego->Privado = $request->itmPrivado;
        $newJuego->Fondo = $request->itmFondo;
        $newJuego->Borrador = 1;
        $newJuego->CodigoTema = $request->CodigoTema;
        $newJuego->save();

        return response()->json([
            'mensaje' => 'Juego Generado',
            'codigo'    => $newJuego->Codigo
        ], 200, []);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $newJuego = Juego::find($request->itmCodigoJuego);
        $newJuego->Titulo = $request->itmTitulo;
        $newJuego->Tiempo = $request->itmTiempo;
        $newJuego->Privado = $request->itmPrivado;
        $newJuego->Fondo = $request->itmFondo;
        if($request->itmRegistro == 'SI'){
            $newJuego->Borrador = 0;    
        }
        $newJuego->CodigoTema = $request->CodigoTema;
        $newJuego->save();

        return response()->json([
            'mensaje' => $request->itmRegistro == 'SI' ? 'Juego Registrado' : 'Juego Actualizado'
        ], 200, []);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $newJuego = Juego::find($request->Juego);
        $newJuego->Vigente = 0;
        $newJuego->save();

        return response()->json([
            'mensaje' => 'Se Eliminó Correctamente'
        ], 200, []);
    }
}
