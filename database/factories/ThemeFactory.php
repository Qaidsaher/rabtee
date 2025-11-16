<?php

namespace Database\Factories;

use App\Models\Theme;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Theme>
 */
class ThemeFactory extends Factory
{
    protected $model = Theme::class;

    public function definition(): array
    {
        $key = Str::slug(fake('ar_SA')->unique()->words(2, true));

        return [
            'key' => $key === '' ? Str::slug(fake()->unique()->words(2, true)) : $key,
            'name' => fake('ar_SA')->unique()->words(2, true),
            'description' => fake('ar_SA')->realText(80),
            'config' => [
                'colors' => [
                    'primary' => fake()->hexColor(),
                    'secondary' => fake()->hexColor(),
                    'background' => '#020617',
                    'card' => 'rgba(255,255,255,0.08)',
                    'text' => '#f8fafc',
                    'button_text' => '#020617',
                ],
                'styles' => [
                    'rounded' => 'xl',
                    'shadow' => 'xl',
                    'button_variant' => fake()->randomElement(['glass', 'solid', 'gradient']),
                    'card_style' => fake()->randomElement(['glass', 'flat', 'gradient']),
                ],
                'font' => [
                    'family' => fake()->randomElement(['Cairo', 'Tajawal', 'IBM Plex Sans Arabic']),
                ],
            ],
            'is_default' => false,
            'is_premium' => fake()->boolean(20),
        ];
    }
}
