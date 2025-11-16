<?php

namespace Database\Factories;

use App\Models\BusinessLink;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends Factory<BusinessLink>
 */
class BusinessLinkFactory extends Factory
{
    protected $model = BusinessLink::class;

    public function definition(): array
    {
        $options = [
            ['type' => 'whatsapp', 'label' => 'دردشة واتساب', 'icon' => 'whatsapp'],
            ['type' => 'call', 'label' => 'اتصال مباشر', 'icon' => 'phone'],
            ['type' => 'instagram', 'label' => 'إنستغرام', 'icon' => 'instagram'],
            ['type' => 'website', 'label' => 'الموقع الرسمي', 'icon' => 'globe'],
            ['type' => 'location', 'label' => 'زيارة المتجر', 'icon' => 'map-pin'],
        ];

        $link = Arr::random($options);

        $url = match ($link['type']) {
            'whatsapp' => 'https://wa.me/9677' . fake()->numerify('#######'),
            'call' => 'tel:+967' . fake()->numerify('7#######'),
            'instagram' => 'https://instagram.com/' . fake()->userName(),
            'website' => 'https://rabti.me/' . fake()->slug(),
            'location' => 'https://maps.google.com/?q=' . urlencode(fake('ar_SA')->city()),
            default => fake()->url(),
        };

        return [
            'business_id' => null,
            'type' => $link['type'],
            'label' => $link['label'],
            'url' => $url,
            'icon' => $link['icon'],
            'sort_order' => fake()->numberBetween(0, 50),
            'is_active' => true,
        ];
    }
}
