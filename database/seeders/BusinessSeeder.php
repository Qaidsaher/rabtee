<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\User;
use App\Services\BusinessPublicPayloadService;
use Illuminate\Database\Seeder;

class BusinessSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'ساهر العريقي',
            'email' => 'founder@rabti.test',
            'password' => bcrypt('password'),
        ]);

        $service = app(BusinessPublicPayloadService::class);
        $themeId = app('db')->table('themes')->where('is_default', true)->value('id')
            ?? app('db')->table('themes')->orderBy('id')->value('id');

        Business::factory()
            ->count(3)
            ->for($user)
            ->state(['theme_id' => $themeId])
            ->hasProducts(5)
            ->hasLinks(4)
            ->create()
            ->each(fn (Business $business) => $service->refresh($business));
    }
}
