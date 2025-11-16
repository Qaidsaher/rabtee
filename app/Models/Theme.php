<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Theme extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'config' => 'array',
        'is_default' => 'boolean',
        'is_premium' => 'boolean',
    ];

    public function businesses(): HasMany
    {
        return $this->hasMany(Business::class);
    }
}
