<?php

use App\Models\Business;
use App\Models\Click;
use App\Models\Theme;
use App\Models\User;
use App\Models\Visit;
use Carbon\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

it('shows visit and click analytics for the owned business', function () {
    $user = User::factory()->create();
    $theme = Theme::factory()->create();
    $business = Business::factory()->for($user)->create(['theme_id' => $theme->id]);

    Visit::query()->create([
        'business_id' => $business->id,
        'device_type' => 'mobile',
        'ip_address' => '127.0.0.1',
        'user_agent' => 'Mozilla/5.0',
        'created_at' => Carbon::now()->subDays(2),
        'updated_at' => Carbon::now()->subDays(2),
    ]);

    Visit::query()->create([
        'business_id' => $business->id,
        'device_type' => 'desktop',
        'ip_address' => '127.0.0.2',
        'user_agent' => 'Mozilla/5.0',
        'created_at' => Carbon::now()->subDays(8),
        'updated_at' => Carbon::now()->subDays(8),
    ]);

    Click::query()->create([
        'business_id' => $business->id,
        'type' => 'whatsapp',
        'device_type' => 'mobile',
        'ip_address' => '127.0.0.3',
        'created_at' => Carbon::now()->subDay(),
        'updated_at' => Carbon::now()->subDay(),
    ]);

    Click::query()->create([
        'business_id' => $business->id,
        'type' => 'instagram',
        'device_type' => 'mobile',
        'ip_address' => '127.0.0.4',
        'created_at' => Carbon::now()->subDays(3),
        'updated_at' => Carbon::now()->subDays(3),
    ]);

    $this->actingAs($user);

    $this->get(route('businesses.analytics.show', $business))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('business/dashboard/analytics/show')
            ->where('business.id', $business->id)
            ->where('visitSummary.total', 2)
            ->where('clickSummary.total', 2)
        );
});
