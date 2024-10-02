<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\EntryType;

class entry extends Model
{
    protected $fillable = ['visitor_id', 'entry_type', 'entry_time', 'entry_date'];

    protected $casts = [
        'entry_type' => EntryType::class,
    ];

    public function visitor()
    {
        return $this->belongsTo(Visitor::class);
    }
}
