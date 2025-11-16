<?php

namespace App\Jobs;

use App\Models\Visit;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RecordVisitJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public int $businessId,
        public ?string $ip,
        public ?string $userAgent,
    ) {
    }

    public function handle(): void
    {
        Visit::create([
            'business_id' => $this->businessId,
            'device_type' => $this->detectDeviceType($this->userAgent),
            'ip_address' => $this->ip,
            'user_agent' => $this->userAgent,
        ]);
    }

    protected function detectDeviceType(?string $userAgent): ?string
    {
        if ($userAgent === null) {
            return null;
        }

        if (preg_match('/mobile|android|iphone|ipad|ipod|blackberry|opera mini/i', $userAgent)) {
            return 'mobile';
        }

        return 'desktop';
    }
}
