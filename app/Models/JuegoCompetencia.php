<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JuegoCompetencia extends Model
{
    use HasFactory;
    protected $table = 'juegocompetencia';

    protected $primaryKey = 'Codigo';

    public $timestamps = false;
}
