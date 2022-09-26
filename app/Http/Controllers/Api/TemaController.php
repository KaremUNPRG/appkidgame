<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Tema;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TemaController extends Controller
{
    private $auth ;
    
    public function __construct(Request $request) {
        $this->auth = User::ApiAuth($request->header('Authorization'));
    }

    /**
     * Display a listing of the resource.
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {        $Tema = Tema::where('CodigoUsuario','=',$this->auth->Codigo)
                        ->orderBy('Vigente','desc')->get();
        return response()->json([
            'data' => $Tema,
        ], 200, []);
    }

    public function listarTema()
    {        $Tema = Tema::where('CodigoUsuario','=',$this->auth->Codigo)
                            ->where('Vigente','=',1)->get();
        return response()->json([
            'data' => $Tema,
        ], 200, []);
    }

    public function store(Request $request)
    {

        $newTema = new Tema;
        $newTema->CodigoUsuario = $this->auth->Codigo;
        $newTema->Vigente = 1;
        $newTema->Titulo = $request->itmTitulo;
        $newTema->Descripcion = $request->itmDescripcion;
        $newTema->save();

        return response()->json([
            'mensaje' => 'Tema registrado correctamente'
        ], 200, []);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $newTema = Tema::find($request->Tema);
        $newTema->Titulo = $request->itmTitulo;
        $newTema->Descripcion = $request->itmDescripcion;
        $newTema->save();


        return response()->json([
            'mensaje' => 'Se editó correctamente'
        ], 200, []);
    }

    public function destroy(Request $request)
    {
        $newTema = Tema::find($request->Tema);
        $newTema->Vigente = 0;
        $newTema->save();

        return response()->json([
            'mensaje' => 'Eliminado Correctamente'
        ], 200, []);
    }


    public function restore(Request $request)
    {
        $newTema = Tema::find($request->Tema);
        $newTema->Vigente = 1;
        $newTema->save();

        return response()->json([
            'mensaje' => 'Restaurado Correctamente'
        ], 200, []);
    }


}
