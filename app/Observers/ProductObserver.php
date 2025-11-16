<?php

namespace App\Observers;

use App\Models\Product;
use App\Services\BusinessPublicPayloadService;

class ProductObserver
{
    public function __construct(private readonly BusinessPublicPayloadService $payloadService)
    {
    }

    public function saved(Product $product): void
    {
        $this->refreshBusiness($product);
    }

    public function deleted(Product $product): void
    {
        $this->refreshBusiness($product);
    }

    protected function refreshBusiness(Product $product): void
    {
        $business = $product->business()->first();

        if ($business !== null) {
            $this->payloadService->refresh($business);
        }
    }
}
