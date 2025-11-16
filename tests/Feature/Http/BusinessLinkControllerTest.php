<?php

use App\Models\Business;
use App\Models\BusinessLink;
use App\Models\Theme;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

function createBusinessForLinkTests(): array
{
    $user = User::factory()->create();
    $theme = Theme::factory()->create();
    $business = Business::factory()->for($user)->create(['theme_id' => $theme->id]);

    return [$user, $business];
}

it('lists links for the owned business', function () {
    [$user, $business] = createBusinessForLinkTests();
    BusinessLink::factory()->count(2)->for($business)->create();

    $this->actingAs($user);

    $this->get(route('businesses.links.index', $business))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('business/dashboard/links/index')
            ->where('business.id', $business->id)
            ->has('links', 2)
        );
});

it('renders the link creation form', function () {
    [$user, $business] = createBusinessForLinkTests();

    $this->actingAs($user);

    $this->get(route('businesses.links.create', $business))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('business/dashboard/links/form')
            ->where('business.id', $business->id)
        );
});

it('stores a new link for the business', function () {
    [$user, $business] = createBusinessForLinkTests();

    $this->actingAs($user);

    $response = $this->post(route('businesses.links.store', $business), [
        'type' => 'whatsapp',
        'label' => 'تواصل واتساب',
        'url' => 'https://wa.me/967777777777',
        'icon' => 'whatsapp',
        'sort_order' => 1,
    ]);

    $link = BusinessLink::where('business_id', $business->id)
        ->where('label', 'تواصل واتساب')
        ->first();

    expect($link)->not->toBeNull();

    $response->assertRedirect(route('links.edit', $link));
});

it('renders the edit form for a link', function () {
    [$user, $business] = createBusinessForLinkTests();
    $link = BusinessLink::factory()->for($business)->create();

    $this->actingAs($user);

    $this->get(route('links.edit', $link))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('business/dashboard/links/form')
            ->where('link.id', $link->id)
        );
});

it('updates a link details', function () {
    [$user, $business] = createBusinessForLinkTests();
    $link = BusinessLink::factory()->for($business)->create([
        'label' => 'رابط قديم',
        'url' => 'https://example.com/old',
    ]);

    $this->actingAs($user);

    $response = $this->put(route('links.update', $link), [
        'type' => 'instagram',
        'label' => 'معرض إنستغرام',
        'url' => 'https://instagram.com/rabti',
        'icon' => 'instagram',
        'sort_order' => 5,
    ]);

    $response->assertRedirect();

    $link->refresh();

    expect($link->label)->toBe('معرض إنستغرام');
    expect($link->type)->toBe('instagram');
    expect($link->url)->toBe('https://instagram.com/rabti');
});

it('deletes the selected link', function () {
    [$user, $business] = createBusinessForLinkTests();
    $link = BusinessLink::factory()->for($business)->create();

    $this->actingAs($user);

    $response = $this->delete(route('links.destroy', $link));

    $response->assertRedirect(route('businesses.links.index', $business));
    $this->assertModelMissing($link);
});
