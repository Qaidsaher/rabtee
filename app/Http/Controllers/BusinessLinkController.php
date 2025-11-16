<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\BusinessLink;
use App\Services\BusinessPublicPayloadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessLinkController extends Controller
{
    public function __construct(private readonly BusinessPublicPayloadService $payloadService)
    {
    }

    public function index(Business $business, Request $request): Response
    {
        $this->ensureOwner($business, $request);

        return Inertia::render('business/dashboard/links/index', [
            'business' => $business,
            'links' => $business->links()->orderBy('sort_order')->get(),
        ]);
    }

    public function create(Business $business, Request $request): Response
    {
        $this->ensureOwner($business, $request);

        return Inertia::render('business/dashboard/links/form', [
            'business' => $business,
        ]);
    }

    public function store(Business $business, Request $request): RedirectResponse
    {
        $this->ensureOwner($business, $request);

        $link = $business->links()->create($this->validatedData($request));
        $this->payloadService->refresh($business);

        return to_route('businesses.links.edit', ['link' => $link])->with('status', 'link-created');
    }

    public function edit(BusinessLink $link, Request $request): Response
    {
        $business = $this->businessFromLink($link, $request);

        return Inertia::render('business/dashboard/links/form', [
            'business' => $business,
            'link' => $link,
        ]);
    }

    public function update(BusinessLink $link, Request $request): RedirectResponse
    {
        $business = $this->businessFromLink($link, $request);

        $link->update($this->validatedData($request));
        $this->payloadService->refresh($business);

        return back()->with('status', 'link-updated');
    }

    public function destroy(BusinessLink $link, Request $request): RedirectResponse
    {
        $business = $this->businessFromLink($link, $request);
        $link->delete();
        $this->payloadService->refresh($business);

        return to_route('businesses.links.index', ['business' => $business])->with('status', 'link-deleted');
    }

    protected function validatedData(Request $request): array
    {
        return $request->validate([
            'type' => ['required', 'string', 'max:255'],
            'label' => ['required', 'string', 'max:255'],
            'url' => ['required', 'string', 'max:2048'],
            'icon' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'between:-128,127'],
            'is_active' => ['sometimes', 'boolean'],
        ]);
    }

    protected function ensureOwner(Business $business, Request $request): void
    {
        abort_unless($business->user_id === $request->user()->id, 403);
    }

    protected function businessFromLink(BusinessLink $link, Request $request): Business
    {
        $business = $link->business()->firstOrFail();
        $this->ensureOwner($business, $request);

        return $business;
    }
}
