<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JuegoUsuario extends Model
{
    use HasFactory;
    protected $table = 'JuegoUsuario';

    protected $primaryKey = 'Codigo';

    public $timestamps = false;
}
