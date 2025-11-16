<?php

use App\Jobs\RecordClickJob;
use App\Jobs\RecordVisitJob;
use App\Models\Business;
use App\Models\BusinessLink;
use App\Models\User;
use Illuminate\Support\Facades\Bus;
use Inertia\Testing\AssertableInertia as Assert;

it('shows the public business page and dispatches a visit job', function () {
    Bus::fake();

    $business = Business::factory()->for(User::factory())->create([
        'is_active' => true,
    ]);

    $business->forceFill([
        'public_payload' => [
            'name' => 'متجر رابطي',
            'slug' => 'rabti-store',
            'links' => [],
            'products' => [],
        ],
    ])->saveQuietly();

    $this->get(route('public.businesses.show', $business->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/business_page')
            ->where('businessId', $business->id)
            ->where('payload.name', 'متجر رابطي')
        );

    Bus::assertDispatched(RecordVisitJob::class, fn (RecordVisitJob $job) => $job->businessId === $business->id);
});

it('validates click tracking and dispatches the click job', function () {
    Bus::fake();

    $business = Business::factory()->for(User::factory())->create();
    $link = BusinessLink::factory()->for($business)->create();

    $response = $this->post(route('public.businesses.click', $business), [
        'type' => 'whatsapp',
        'business_link_id' => $link->id,
    ]);

    $response->assertOk()->assertJson([
        'status' => 'success',
    ]);

    Bus::assertDispatched(RecordClickJob::class, fn (RecordClickJob $job) =>
        $job->businessId === $business->id &&
        $job->businessLinkId === $link->id &&
        $job->type === 'whatsapp'
    );
});
