<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Satellite extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'satellites';
    protected $fillable = [
        'name',
        'model',
        'cost',
        'capacity',
        'class',
        'linked_user_id',
        'linked_image_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'linked_user_id');
    }

    public function file()
    {
        return $this->belongsTo(UploadImage::class, 'linked_image_id');
    }
}
