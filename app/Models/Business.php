<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
        'custom_theme_overrides' => 'array',
        'public_payload' => 'array',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function theme(): BelongsTo
    {
        return $this->belongsTo(Theme::class);
    }

    public function links(): HasMany
    {
        return $this->hasMany(BusinessLink::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function visits(): HasMany
    {
        return $this->hasMany(Visit::class);
    }

    public function clicks(): HasMany
    {
        return $this->hasMany(Click::class);
    }

    public function resolvedTheme(): array
    {
        $base = $this->theme?->config ?? [
            'colors' => [
                'primary' => '#2A7FFF',
                'secondary' => '#FFC85A',
                'background' => '#020617',
                'card' => '#111827',
                'text' => '#F9FAFB',
                'button_text' => '#FFFFFF',
            ],
            'styles' => [
                'rounded' => 'xl',
                'shadow' => 'lg',
                'button_variant' => 'solid',
                'card_style' => 'flat',
            ],
            'font' => [
                'family' => 'Inter',
            ],
        ];

        $overrides = $this->custom_theme_overrides ?? [];

        return array_replace_recursive($base, $overrides);
    }
}
