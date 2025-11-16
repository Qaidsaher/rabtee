<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'business_id' => null,
            'name' => fake('ar_SA')->words(2, true),
            'description' => fake('ar_SA')->realText(60),
            'price' => fake()->numberBetween(1000, 60000),
            'currency' => 'YER',
            'is_active' => true,
            'sort_order' => fake()->numberBetween(0, 40),
        ];
    }
}
