<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuario';

    protected $primaryKey = 'Codigo';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'Nombre',
        'Apellido',
        'Email',
        'IdGoogle',
        'Avatar'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public $timestamps = false;

    public static function ApiCheck(string $token)
    {
        $explodeToken = explode(' ',$token);
        $token = DB::table('credencial')
                        ->where('AccessToken','=',$explodeToken[1])
                        ->first();
        return $token != null ? true : false;
    }

    public static function ApiAuth(string $token)
    {
        $user = null;
        if (!empty($token)) {
            $explodeToken = explode(' ',$token);
            $user = self::select([
                            'usuario.Codigo'
                        ])
                        ->join('credencial','credencial.CodigoUsuario','=','usuario.Codigo')
                        ->where('AccessToken','=',$explodeToken[1])
                        ->first();
        }
        return $user;
    }
}
