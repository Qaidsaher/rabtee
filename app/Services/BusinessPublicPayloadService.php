<?php

namespace App\Services;

use App\Models\Business;

class BusinessPublicPayloadService
{
    public function refresh(Business $business): void
    {
        $business->load([
            'theme',
            'links' => static fn ($query) => $query
                ->where('is_active', true)
                ->orderBy('sort_order'),
            'products' => static fn ($query) => $query
                ->where('is_active', true)
                ->orderBy('sort_order'),
        ]);

        $payload = [
            'name' => $business->name,
            'slug' => $business->slug,
            'slogan' => $business->slogan,
            'short_description' => $business->short_description,
            'about' => $business->about,
            'logo_path' => $business->logo_path,
            'cover_image_path' => $business->cover_image_path,
            'location' => [
                'country' => $business->country,
                'city' => $business->city,
                'timezone' => $business->timezone,
            ],
            'theme' => $business->resolvedTheme(),
            'links' => $business->links->map(
                static fn ($link) => [
                    'id' => $link->id,
                    'type' => $link->type,
                    'label' => $link->label,
                    'url' => $link->url,
                    'icon' => $link->icon,
                ]
            )->values(),
            'products' => $business->products->map(
                static fn ($product) => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $product->price,
                    'currency' => $product->currency,
                ]
            )->values(),
        ];

        $business->updateQuietly([
            'public_payload' => $payload,
        ]);
    }
}
