<?php

use App\Models\Business;
use App\Models\Theme;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('lists only the authenticated user businesses', function () {
    $user = User::factory()->create();
    $theme = Theme::factory()->create();

    Business::factory()->count(2)->for($user)->create(['theme_id' => $theme->id]);
    Business::factory()->for(User::factory())->create(['theme_id' => $theme->id]);

    $this->actingAs($user);

    $this->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('business/dashboard/index')
            ->has('businesses', 2)
        );
});

it('renders the business creation form with available themes', function () {
    $user = User::factory()->create();
    Theme::factory()->count(3)->create();

    $this->actingAs($user);

    $this->get(route('businesses.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('business/dashboard/business_form')
            ->has('themes', 3)
        );
});

it('stores a new business and redirects to the edit page', function () {
    $user = User::factory()->create();
    $theme = Theme::factory()->create(['is_default' => true]);

    $this->actingAs($user);

    $response = $this->post(route('businesses.store'), [
        'name' => 'شركة رابطي المتقدمة',
        'slogan' => 'هوية ذكية لكل نشاط',
        'short_description' => 'منصة عربية تربط جمهورك بخدماتك',
        'country' => 'اليمن',
        'city' => 'عدن',
    ]);

    $business = Business::where('name', 'شركة رابطي المتقدمة')->first();

    expect($business)->not->toBeNull();
    expect($business->theme_id)->toBe($theme->id);
    expect($business->slug)->not->toBe('');

    $response->assertRedirect(route('businesses.edit', $business));
});

it('renders the edit form for the owned business', function () {
    $user = User::factory()->create();
    $theme = Theme::factory()->create();
    $business = Business::factory()->for($user)->create(['theme_id' => $theme->id]);

    $this->actingAs($user);

    $this->get(route('businesses.edit', $business))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('business/dashboard/business_form')
            ->where('business.id', $business->id)
        );
});

it('updates an owned business successfully', function () {
    $user = User::factory()->create();
    $theme = Theme::factory()->create();
    $business = Business::factory()->for($user)->create([
        'theme_id' => $theme->id,
        'city' => 'تعز',
    ]);

    $this->actingAs($user);

    $response = $this->put(route('businesses.update', $business), [
        'name' => 'علامة رابطي',
        'short_description' => 'بوابة تفاعلية للهوية والرابط الحيوي',
        'city' => 'صنعاء',
        'custom_theme_overrides' => [
            'colors' => ['primary' => '#111827'],
        ],
    ]);

    $response->assertRedirect();

    $business->refresh();

    expect($business->name)->toBe('علامة رابطي');
    expect($business->city)->toBe('صنعاء');
    expect($business->custom_theme_overrides['colors']['primary'])->toBe('#111827');
});

it('deletes an owned business', function () {
    $user = User::factory()->create();
    $theme = Theme::factory()->create();
    $business = Business::factory()->for($user)->create(['theme_id' => $theme->id]);

    $this->actingAs($user);

    $response = $this->delete(route('businesses.destroy', $business));

    $response->assertRedirect(route('businesses.index'));
    $this->assertModelMissing($business);
});
