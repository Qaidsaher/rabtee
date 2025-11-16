<?php

use App\Models\Business;
use App\Models\BusinessLink;
use App\Models\Product;
use App\Models\Theme;
use App\Models\User;
use App\Services\BusinessPublicPayloadService;

it('builds a consistent payload with active sorted data and theme overrides', function () {
    $user = User::factory()->create();
    $theme = Theme::factory()->create([
        'config' => [
            'colors' => [
                'primary' => '#0ea5e9',
                'secondary' => '#22d3ee',
                'background' => '#020617',
                'card' => '#0f172a',
                'text' => '#f8fafc',
                'button_text' => '#041221',
            ],
            'styles' => [
                'rounded' => 'xl',
                'shadow' => 'xl',
                'button_variant' => 'gradient',
                'card_style' => 'glass',
            ],
            'font' => [
                'family' => 'Cairo',
            ],
        ],
    ]);

    $business = Business::factory()
        ->for($user)
        ->for($theme)
        ->create([
            'name' => 'مقهى الموج الأزرق',
            'slug' => 'blue-wave',
            'city' => 'عدن',
            'custom_theme_overrides' => [
                'colors' => ['primary' => '#9333ea'],
            ],
        ]);

    $firstLink = BusinessLink::factory()->for($business)->create([
        'label' => 'زوروا الموقع',
        'sort_order' => 1,
    ]);
    BusinessLink::factory()->for($business)->create([
        'label' => 'تعطيل مؤقت',
        'is_active' => false,
    ]);
    $secondLink = BusinessLink::factory()->for($business)->create([
        'label' => 'انستغرام',
        'sort_order' => 2,
    ]);

    $firstProduct = Product::factory()->for($business)->create([
        'name' => 'قهوتنا المميزة',
        'price' => 3500,
        'sort_order' => 1,
    ]);
    Product::factory()->for($business)->create([
        'name' => 'متوقف',
        'is_active' => false,
    ]);
    $secondProduct = Product::factory()->for($business)->create([
        'name' => 'بوكس المعجنات',
        'sort_order' => 2,
    ]);

    app(BusinessPublicPayloadService::class)->refresh($business);
    $business->refresh();

    $payload = $business->public_payload;

    expect($payload)
        ->not->toBeNull()
        ->and($payload['name'])->toBe('مقهى الموج الأزرق')
        ->and($payload['location']['city'])->toBe('عدن');

    expect($payload['theme']['colors']['primary'])->toBe('#9333ea')
        ->and($payload['theme']['colors']['secondary'])->toBe('#22d3ee');

    expect($payload['links'])
        ->toHaveCount(2)
        ->sequence(
            fn ($link) => $link
                ->id->toBe($firstLink->id)
                ->label->toBe('زوروا الموقع'),
            fn ($link) => $link
                ->id->toBe($secondLink->id)
                ->label->toBe('انستغرام'),
        );

    expect($payload['products'])
        ->toHaveCount(2)
        ->sequence(
            fn ($product) => $product
                ->id->toBe($firstProduct->id)
                ->price->toBe(3500),
            fn ($product) => $product
                ->id->toBe($secondProduct->id)
                ->name->toBe('بوكس المعجنات'),
        );
});
