<?php

namespace App\Http\Controllers\Api;
use App\Models\User;
use App\Models\Ahorcado;
use App\Models\Juego;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AhorcadoController extends Controller
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
    {
        $juego = Juego::select([
                            'juego.Codigo','juego.Vigente', 'juego.Titulo',
                            'juego.Privado','tema.Descripcion','tema.Codigo as CodTema','Fecha', 
                            'Palabra', 'tiempo', 'Pista', 'Fondo'
                            ])
                            ->join('tema','juego.codigoTema','=','tema.Codigo')
                            ->join('ahorcado','juego.Codigo','=','ahorcado.CodigoJuego')
                            ->where('juego.tipo','=',2)
                            ->where('tema.codigoUsuario','=',$this->auth->Codigo)
                            ->orderBy('juego.Vigente','desc')->get();
       
            return response()->json([
                'data' => $juego,
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
        $newJuego->Tipo = 2;
        $newJuego->Fondo = $request->itmFondo;
        $newJuego->Tiempo = $request->itmTiempo;
        $newJuego->Fecha = $request->itmFecha;
        $newJuego->Privado = $request->itmPrivado;
        $newJuego->Vigente = 1;
        $newJuego->Borrador = 1;
        $newJuego->codigoTema = $request->itmTema;
        $newJuego->save();

        $newAhorcado = new Ahorcado;
        $newAhorcado->CodigoJuego =  $newJuego->Codigo;
        $newAhorcado->Palabra = $request->itmPalabra;
        $newAhorcado->Pista = $request->itmPistas;
        $newAhorcado->save();

        return response()->json([
            'mensaje' => 'Ahorcado Registrado Correctamente'
        ], 200, []);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ahorcado  $Ahorcado
     * @return \Illuminate\Http\Response
     */
    public function show(Ahorcado $Ahorcado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $newJuego = Juego::find($request->Ahorcado);
        $newJuego->Titulo = $request->itmTitulo;
        $newJuego->Tiempo = $request->itmTiempo;
        $newJuego->Fondo = $request->itmFondo;
        $newJuego->Fecha = $request->itmFecha;
        $newJuego->Privado = $request->itmPrivado;
        $newJuego->codigoTema = $request->itmTema;
        $newJuego->save();

        $newAhorcado = Ahorcado::find($request->Ahorcado);
        $newAhorcado->Palabra = $request->itmPalabra;
        $newAhorcado->Pista = $request->itmPistas;
        $newAhorcado->save();


        return response()->json([
            'mensaje' => 'Se edito correctamente'
        ], 200, []);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $newJuego = Juego::find($request->Ahorcado);
        $newJuego->Vigente = 0;
        $newJuego->save();

        return response()->json([
            'mensaje' => 'Eliminado Correctamente'
        ], 200, []);
    }

    public function restore(Request $request)
    {
        $newJuego = Juego::find($request->Ahorcado);
        $newJuego->Vigente = 1;
        $newJuego->save();

        return response()->json([
            'mensaje' => 'Restaurado Correctamente'
        ], 200, []);
    }
}
