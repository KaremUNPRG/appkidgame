<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credencial extends Model
{
    use HasFactory;

    protected $table = 'credencial';

    protected $primaryKey = 'Codigo';
    
    protected $fillable = [
        'CodigoUsuario',
        'AccessToken',
        'RefreshToken',
        'ExpiresIn'
    ];

    public $timestamps = false;
}
