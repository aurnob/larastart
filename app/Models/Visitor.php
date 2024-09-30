<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\VisitorType;

class visitor extends Model
{
    protected $fillable = ['name', 'registration_code', 'visitor_type'];

    protected $casts = [
        'visitor_type' => VisitorType::class,
    ];

    public function entries()
    {
        return $this->hasMany(Entry::class);
    }
}
