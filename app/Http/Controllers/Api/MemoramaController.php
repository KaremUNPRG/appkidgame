<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Juego;
use App\Models\Memorama;

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
    public function index(Request $request) //LISTAR BASE DE MEMORAMA
    {
        $page = $request->input('page') == null ? 1 : ($request->input('page') <= 0 ? 1 : (int)$request->input('page'));
        
        $memorama = DB::select("select *,j.Codigo as codigoJuego,j.Titulo as TituloJuego, t.Titulo as TituloTema 
        from juego j inner join tema t on j.CodigoTema = t.Codigo inner join usuario u on u.Codigo = t.CodigoUsuario 
        where u.Codigo = ? and j.Tipo = 1 and j.Vigente = 1 order by Fecha desc limit ? OFFSET ?", [$this->auth->Codigo,
        5,(($page - 1) * 5)]);
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

        $carpeta = 'almacenamiento/memorama/'.$this->auth->Codigo."_".date('Y-m');
        if(!file_exists($carpeta)){
            mkdir($carpeta,'0777');
        }
        foreach ($request->itmListaCarta as $key => $value) {
            $archivo = '';
            if($value['Tipo'] == '02'){
                $extension = explode('/',$value['Imagen']);
                $extension = explode(';',$extension[1]);
                $extension = $extension[0];
                $img = str_replace('data:image/'.$extension.';base64,','',$value['Imagen']);
                $img = base64_decode($img);
                $archivo = $carpeta.'/'.$value['Descripcion'].'_'.time().'.'.$extension;
                file_put_contents($archivo,$img);
            }else{
                $archivo = $carpeta.'/'.$value['Descripcion'].'_'.time().'.jpg';
                file_put_contents($archivo,file_get_contents($value['Imagen']));
            }

            $newMemorama = new Memorama;
            $newMemorama->CodigoJuego = $newJuego->Codigo;
            $newMemorama->Descripcion = $value['Descripcion'];
            $newMemorama->Imagen = '/'.$archivo;
            $newMemorama->save();

        }

        return response()->json([
            'mensaje' => 'Juego Generado',
            'codigo'    => $newJuego->Codigo
        ], 200, []);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $codigoMemorama
     * @return \Illuminate\Http\Response
     */
    public function show($codigoMemorama)
    {
        $cartas = DB::table('carta')->
                                select(['carta.Descripcion','carta.Imagen','carta.Codigo'])
                               
                                ->where('carta.CodigoJuego','=',$codigoMemorama)
                                ->get();
        return response()->json([
            'data' => $cartas
        ], 200, []);
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
        $carpeta = 'almacenamiento/memorama/'.$this->auth->Codigo."_".date('Y_m');
        
        if(!file_exists($carpeta)){
            mkdir($carpeta,'0777');
        }
        // dd($request->itmListaCarta);
        $delete = Memorama::where('CodigoJuego','=',$newJuego->Codigo)->delete();
        foreach ($request->itmListaCarta as $key => $value) {
            // if ( !($value['CodigoCarta'] > 0)) {
                $archivo = '';
                if($value['Tipo'] == '02'){
                    $extension = explode('/',$value['Imagen']);
                    $extension = explode(';',$extension[1]);
                    $extension = $extension[0];
                    $img = str_replace('data:image/'.$extension.';base64,','',$value['Imagen']);
                    $img = base64_decode($img);
                    $archivo = $carpeta.'/'.$value['Descripcion'].'_'.time().'.'.$extension;
                    file_put_contents($archivo,$img);
                }else{
                    $exist = strpos($value['Imagen'], 'http');
                    if ($exist === false) {
                        $archivo = $carpeta.'/'.$value['Descripcion'].'_'.time().'.jpg';
                        file_put_contents($archivo,file_get_contents(public_path($value['Imagen'])));
                    }else{
                        $archivo = $carpeta.'/'.$value['Descripcion'].'_'.time().'.jpg';
                        file_put_contents($archivo,file_get_contents($value['Imagen']));
                    }
                    
                }
    
                $newMemorama = new Memorama;
                $newMemorama->CodigoJuego = $newJuego->Codigo;
                $newMemorama->Descripcion = $value['Descripcion'];
                $newMemorama->Imagen = '/'.$archivo;
                $newMemorama->save();
            // }

        }

        return response()->json([
            'mensaje' => $request->itmRegistro == 'SI' ? 'Juego Actualizado' : 'Juego Actualizado'
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

    public function listarTema()
    {
        $tema = DB::select('select * from tema where Vigente = 1 and CodigoUsuario = ?',[$this->auth->Codigo]);
        return response()->json([
            'data' => $tema
        ], 200, []);
    }

    public function buscarMemorama(Request $request)
    {
        $page = $request->input('page') == null ? 1 : ($request->input('page') <= 0 ? 1 : (int)$request->input('page'));
    
        if ($request->Modo == 'Buscar') {
            $memorama = DB::select("select *,j.Codigo as codigoJuego,j.Titulo as TituloJuego, t.Titulo as TituloTema 
                                    from juego j inner join tema t on j.CodigoTema = t.Codigo inner join usuario u on u.Codigo = t.CodigoUsuario 
                                    where u.Codigo = ? and j.Tipo = 1 and j.Vigente = 1 and
                                    j.Titulo like ? order by Fecha desc limit ? OFFSET ?", [$this->auth->Codigo,
                                    '%'.$request->Buscar.'%',5,(($page - 1) * 5)]);

        }
        
        return response()->json([
            'data' => $memorama
        ], 200, []);
    }
}
