<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Puntaje extends Model
{
    use HasFactory;
    protected $table = 'puntaje';

    protected $primaryKey = 'CodigoJuegoUsuario';

    public $timestamps = false;
}
