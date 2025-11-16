<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\BusinessLinkController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Public\BusinessPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/about', fn () => Inertia::render('about'))->name('about');
Route::get('/how-it-works', fn () => Inertia::render('how_it_works'))->name('howItWorks');
Route::get('/privacy', fn () => Inertia::render('privacy'))->name('privacy');

Route::get('b/{slug}', [BusinessPageController::class, 'show'])->name('public.businesses.show');
Route::post('b/{business}/click', [BusinessPageController::class, 'trackClick'])->name('public.businesses.click');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [BusinessController::class, 'index'])->name('dashboard');

    Route::resource('businesses', BusinessController::class);
    Route::resource('businesses.products', ProductController::class)->shallow();
    Route::resource('businesses.links', BusinessLinkController::class)->shallow();

    Route::get('businesses/{business}/analytics', [AnalyticsController::class, 'show'])
        ->name('businesses.analytics.show');
});

require __DIR__.'/settings.php';
