<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SopaLetras extends Model
{
    use HasFactory;
    protected $table = 'sopa';

    protected $primaryKey = 'CodigoJuego';

    public $timestamps = false;
}
