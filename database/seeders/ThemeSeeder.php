<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    public function run(): void
    {
        $themes = [
            [
                'key' => 'dark_glass',
                'name' => 'الزجاج الليلي',
                'description' => 'تصميم داكن بزجاج شفاف ولمسات نيون عصرية.',
                'config' => [
                    'colors' => [
                        'primary' => '#38bdf8',
                        'secondary' => '#c084fc',
                        'background' => '#020617',
                        'card' => 'rgba(255,255,255,0.08)',
                        'text' => '#f8fafc',
                        'button_text' => '#020617',
                    ],
                    'styles' => [
                        'rounded' => 'xl',
                        'shadow' => '2xl',
                        'button_variant' => 'glass',
                        'card_style' => 'glass',
                    ],
                    'font' => [
                        'family' => 'Cairo',
                    ],
                ],
                'is_default' => true,
                'is_premium' => false,
            ],
            [
                'key' => 'light_clean',
                'name' => 'الصفاء الفاتح',
                'description' => 'تصميم مشرق وهادئ بألوان محايدة ناعمة.',
                'config' => [
                    'colors' => [
                        'primary' => '#2563eb',
                        'secondary' => '#f97316',
                        'background' => '#f8fafc',
                        'card' => '#ffffff',
                        'text' => '#0f172a',
                        'button_text' => '#ffffff',
                    ],
                    'styles' => [
                        'rounded' => 'lg',
                        'shadow' => 'lg',
                        'button_variant' => 'solid',
                        'card_style' => 'flat',
                    ],
                    'font' => [
                        'family' => 'Cairo',
                    ],
                ],
                'is_default' => false,
                'is_premium' => false,
            ],
            [
                'key' => 'ocean_gradient',
                'name' => 'تدرجات المحيط',
                'description' => 'ألوان متدرجة نابضة مستوحاة من البحر والضوء.',
                'config' => [
                    'colors' => [
                        'primary' => '#0ea5e9',
                        'secondary' => '#22d3ee',
                        'background' => '#020617',
                        'card' => 'linear-gradient(135deg,#0ea5e9,#22d3ee)',
                        'text' => '#e0f2fe',
                        'button_text' => '#041221',
                    ],
                    'styles' => [
                        'rounded' => '2xl',
                        'shadow' => 'xl',
                        'button_variant' => 'gradient',
                        'card_style' => 'gradient',
                    ],
                    'font' => [
                        'family' => 'Cairo',
                    ],
                ],
                'is_default' => false,
                'is_premium' => true,
            ],
        ];

        foreach ($themes as $theme) {
            Theme::updateOrCreate(['key' => $theme['key']], $theme);
        }
    }
}
