<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Juego;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class InicioController extends Controller
{

    private $auth ;
    public function __construct(Request $request) {
        $this->auth = User::ApiAuth(empty($request->header('authorization'))?'':$request->header('authorization'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $juegos = Juego::select(['juego.Titulo as TitJuego','tema.Titulo as TitTema','juego.Tipo','juego.Tiempo',
                        'juego.Codigo as CodigoJuego',DB::raw('AVG(valoracion.Valoracion) as ValoracionPunto'),
                        DB::raw('COUNT(valoracion.Comentario) as CantidadComentario')])
                        ->join('tema','tema.Codigo','=','juego.CodigoTema')
                        ->leftJoin('valoracion','valoracion.CodigoJuego','juego.Codigo')
                        ->where('juego.Vigente','=','1')
                        ->where('juego.Borrador','=','0')
                        ->groupBy('juego.Codigo')
                        ->orderBy('ValoracionPunto','desc')->get();

        return response()->json([
            'data' => $juegos
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
        //
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
     * Display the specified resource.
     *
     * @param  int  $CodigoJuego
     * @return \Illuminate\Http\Response
     */
    public function showValoracion($CodigoJuego)
    {
        $estadistica = [
            'Valoracion'    => '--',
            'Total'         => 0,
            'Estrellas'     => [0,0,0,0,0]
        ];
        $valoracion = Juego::select(['juego.Titulo as TitJuego','juego.Codigo as CodigoJuego','v.Valoracion',
                                    'v.CodigoJuego as CodigoJV',
                                    'v.Comentario',DB::raw('CONCAT(u.Nombre," ",u.Apellido) as Usuario'),'u.Avatar',
                                    DB::raw('date_format(v.Fecha, "%d/%m/%Y") as Fecha')])
                            ->leftjoin('valoracion as v','juego.Codigo','v.CodigoJuego')
                            ->leftjoin('usuario as u','u.Codigo','v.CodigoUsuario')
                            ->where('juego.Codigo','=',$CodigoJuego)
                            ->orderBy('v.Fecha','desc')
                            ->get();
        $puntuacionTotal = 0;
        foreach ($valoracion as $key => $value) {
            if (!empty($value->CodigoJV)) {
                $estadistica['Total'] += 1;
                $puntuacionTotal += $value->Valoracion;
                $estadistica['Estrellas'][$value->Valoracion - 1] += 1; 
            }
        }
        $estadistica['Valoracion'] = ($estadistica['Total'] != 0 ? ($puntuacionTotal / $estadistica['Total']) : $estadistica['Valoracion']);
        return response()->json([
            'data' => [
                'estadistica' => $estadistica,
                'comentarios' =>  $valoracion
            ]
        ], 200, []);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
