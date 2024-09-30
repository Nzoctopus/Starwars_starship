<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ship extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'ship';
    protected $fillable = [
        'name',
        'model',
        'manufacturer',
        'cost',
        'length',
        'max_atmo_speed',
        'crew',
        'passengers',
        'cargo_capacity',
        'consumables',
        'hyperdrive_rating',
        'mglt',
        'starship_class',
    ];
}
