<?php

use App\Models\Business;
use App\Models\BusinessLink;
use App\Models\Theme;
use App\Models\User;

it('refreshes the public payload automatically when links change', function () {
    $user = User::factory()->create();
    $theme = Theme::factory()->create();

    /** @var Business $business */
    $business = Business::factory()->for($user)->for($theme)->create();
    $business->refresh();

    expect($business->public_payload)->not->toBeNull();

    BusinessLink::factory()->for($business)->create([
        'label' => 'اطلب الآن',
        'type' => 'whatsapp',
        'sort_order' => 1,
    ]);

    $business->refresh();

    $linkLabels = collect($business->public_payload['links'] ?? [])->pluck('label');

    expect($linkLabels)->toContain('اطلب الآن');
});
