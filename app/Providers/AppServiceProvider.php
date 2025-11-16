<?php

namespace App\Providers;

use App\Models\Business;
use App\Models\BusinessLink;
use App\Models\Product;
use App\Observers\BusinessLinkObserver;
use App\Observers\BusinessObserver;
use App\Observers\ProductObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Business::observe(BusinessObserver::class);
        Product::observe(ProductObserver::class);
        BusinessLink::observe(BusinessLinkObserver::class);
    }
}
