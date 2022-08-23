<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Memorama extends Model
{
    use HasFactory;
    protected $table = 'carta';

    protected $primaryKey = 'Codigo';

    public $timestamps = false;
}
