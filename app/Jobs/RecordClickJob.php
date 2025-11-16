<?php

namespace App\Jobs;

use App\Models\Click;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RecordClickJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public int $businessId,
        public ?int $businessLinkId,
        public ?string $type,
        public ?string $ip,
        public ?string $userAgent,
    ) {
    }

    public function handle(): void
    {
        Click::create([
            'business_id' => $this->businessId,
            'business_link_id' => $this->businessLinkId,
            'type' => $this->type,
            'device_type' => $this->detectDeviceType($this->userAgent),
            'ip_address' => $this->ip,
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
