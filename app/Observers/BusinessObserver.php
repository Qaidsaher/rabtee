<?php

namespace App\Observers;

use App\Models\Business;
use App\Services\BusinessPublicPayloadService;

class BusinessObserver
{
    public function __construct(private readonly BusinessPublicPayloadService $payloadService)
    {
    }

    public function saved(Business $business): void
    {
        $this->payloadService->refresh($business);
    }
}
