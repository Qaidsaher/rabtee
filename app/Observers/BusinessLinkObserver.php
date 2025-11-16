<?php

namespace App\Observers;

use App\Models\BusinessLink;
use App\Services\BusinessPublicPayloadService;

class BusinessLinkObserver
{
    public function __construct(private readonly BusinessPublicPayloadService $payloadService)
    {
    }

    public function saved(BusinessLink $businessLink): void
    {
        $this->refreshBusiness($businessLink);
    }

    public function deleted(BusinessLink $businessLink): void
    {
        $this->refreshBusiness($businessLink);
    }

    protected function refreshBusiness(BusinessLink $businessLink): void
    {
        $business = $businessLink->business()->first();

        if ($business !== null) {
            $this->payloadService->refresh($business);
        }
    }
}
