<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Product;
use App\Services\BusinessPublicPayloadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(private readonly BusinessPublicPayloadService $payloadService)
    {
    }

    public function index(Business $business, Request $request): Response
    {
        $this->ensureOwner($business, $request);

        return Inertia::render('business/dashboard/products/index', [
            'business' => $business,
            'products' => $business->products()->orderBy('sort_order')->get(),
        ]);
    }

    public function create(Business $business, Request $request): Response
    {
        $this->ensureOwner($business, $request);

        return Inertia::render('business/dashboard/products/form', [
            'business' => $business,
        ]);
    }

    public function store(Business $business, Request $request): RedirectResponse
    {
        $this->ensureOwner($business, $request);

        $product = $business->products()->create($this->validatedData($request));
        $this->payloadService->refresh($business);

        return to_route('products.edit', ['product' => $product])->with('status', 'product-created');
    }

    public function edit(Product $product, Request $request): Response
    {
        $business = $this->businessFromProduct($product, $request);

        return Inertia::render('business/dashboard/products/form', [
            'business' => $business,
            'product' => $product,
        ]);
    }

    public function update(Product $product, Request $request): RedirectResponse
    {
        $business = $this->businessFromProduct($product, $request);

        $product->update($this->validatedData($request));
        $this->payloadService->refresh($business);

        return back()->with('status', 'product-updated');
    }

    public function destroy(Product $product, Request $request): RedirectResponse
    {
        $business = $this->businessFromProduct($product, $request);
        $product->delete();
        $this->payloadService->refresh($business);

        return to_route('businesses.products.index', ['business' => $business])->with('status', 'product-deleted');
    }

    protected function validatedData(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['nullable', 'integer'],
            'currency' => ['required', 'string', 'max:3'],
            'is_active' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'between:-128,127'],
        ]);
    }

    protected function ensureOwner(Business $business, Request $request): void
    {
        abort_unless($business->user_id === $request->user()->id, 403);
    }

    protected function businessFromProduct(Product $product, Request $request): Business
    {
        $business = $product->business()->firstOrFail();
        $this->ensureOwner($business, $request);

        return $business;
    }
}
