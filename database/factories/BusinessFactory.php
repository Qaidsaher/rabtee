<?php

namespace Database\Factories;

use App\Models\Business;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Business>
 */
class BusinessFactory extends Factory
{
    protected $model = Business::class;

    public function definition(): array
    {
        $company = fake('ar_SA')->company();
        $slugBase = Str::slug($company);

        if ($slugBase === '') {
            $slugBase = Str::slug(fake()->unique()->words(2, true));
        }

        return [
            'user_id' => null,
            'name' => $company,
            'slug' => $slugBase . '-' . Str::random(4),
            'slogan' => fake('ar_SA')->realText(25),
            'short_description' => fake('ar_SA')->realText(50),
            'about' => fake('ar_SA')->realText(180),
            'logo_path' => 'https://placehold.co/200x200?text=' . urlencode('رابطي'),
            'cover_image_path' => 'https://placehold.co/1200x600?text=' . urlencode('لوحة رابطي'),
            'business_type' => fake('ar_SA')->randomElement(['مطعم', 'مقهى', 'استوديو إبداعي']),
            'category' => fake('ar_SA')->randomElement(['قهوة مختصة', 'مطابخ محلية', 'خدمات أعمال']),
            'country' => 'اليمن',
            'city' => fake('ar_SA')->city(),
            'timezone' => 'Asia/Aden',
            'is_active' => true,
            'theme_id' => null,
            'custom_theme_overrides' => null,
            'public_payload' => null,
        ];
    }
}
