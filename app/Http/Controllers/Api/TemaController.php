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
                        ->orderBy('Codigo','desc')->get();
        return response()->json([
            'data' => $Tema,
        ], 200, []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


}
