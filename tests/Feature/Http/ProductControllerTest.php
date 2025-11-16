<?php

use App\Models\Business;
use App\Models\Product;
use App\Models\Theme;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

function createBusinessForProductTests(): array
{
    $user = User::factory()->create();
    $theme = Theme::factory()->create();
    $business = Business::factory()->for($user)->create(['theme_id' => $theme->id]);

    return [$user, $business];
}

it('lists products for the owned business', function () {
    [$user, $business] = createBusinessForProductTests();
    Product::factory()->count(2)->for($business)->create();

    $this->actingAs($user);

    $this->get(route('businesses.products.index', $business))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('business/dashboard/products/index')
            ->where('business.id', $business->id)
            ->has('products', 2)
        );
});

it('renders the product creation form', function () {
    [$user, $business] = createBusinessForProductTests();

    $this->actingAs($user);

    $this->get(route('businesses.products.create', $business))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('business/dashboard/products/form')
            ->where('business.id', $business->id)
        );
});

it('stores a new product for the business', function () {
    [$user, $business] = createBusinessForProductTests();

    $this->actingAs($user);

    $response = $this->post(route('businesses.products.store', $business), [
        'name' => 'قهوة المخا',
        'description' => 'تحميص عربي غني',
        'price' => 4500,
        'currency' => 'YER',
        'sort_order' => 3,
    ]);

    $product = Product::where('business_id', $business->id)
        ->where('name', 'قهوة المخا')
        ->first();

    expect($product)->not->toBeNull();

    $response->assertRedirect(route('products.edit', $product));
});

it('renders the edit form for a product', function () {
    [$user, $business] = createBusinessForProductTests();
    $product = Product::factory()->for($business)->create();

    $this->actingAs($user);

    $this->get(route('products.edit', $product))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('business/dashboard/products/form')
            ->where('product.id', $product->id)
        );
});

it('updates a product details', function () {
    [$user, $business] = createBusinessForProductTests();
    $product = Product::factory()->for($business)->create([
        'name' => 'قهوة صباحية',
        'price' => 3000,
    ]);

    $this->actingAs($user);

    $response = $this->put(route('products.update', $product), [
        'name' => 'قهوة صباحية فاخرة',
        'description' => 'مزيج عربي فاخر',
        'price' => 5200,
        'currency' => 'YER',
    ]);

    $response->assertRedirect();

    $product->refresh();

    expect($product->name)->toBe('قهوة صباحية فاخرة');
    expect($product->price)->toBe(5200);
});

it('deletes the selected product', function () {
    [$user, $business] = createBusinessForProductTests();
    $product = Product::factory()->for($business)->create();

    $this->actingAs($user);

    $response = $this->delete(route('products.destroy', $product));

    $response->assertRedirect(route('businesses.products.index', $business));
    $this->assertModelMissing($product);
});
