<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Theme;
use App\Services\BusinessPublicPayloadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    public function __construct(private readonly BusinessPublicPayloadService $payloadService)
    {
    }

    public function index(Request $request): Response
    {
        $businesses = $request->user()->businesses()
            ->with('theme:id,name')
            ->withCount(['visits', 'clicks'])
            ->latest()
            ->get();

        return Inertia::render('business/dashboard/index', [
            'businesses' => $businesses,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('business/dashboard/business_form', [
            'themes' => Theme::orderByDesc('is_default')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);
        $data['slug'] = $this->generateUniqueSlug($data['name']);
        $data['theme_id'] = $data['theme_id'] ?? $this->defaultThemeId();

        $business = $request->user()->businesses()->create($data);
        $this->payloadService->refresh($business);

        return to_route('businesses.edit', $business)->with('status', 'business-created');
    }

    public function edit(Business $business, Request $request): Response
    {
        $this->ensureOwner($business, $request);

        return Inertia::render('business/dashboard/business_form', [
            'business' => $business->load('theme'),
            'themes' => Theme::orderByDesc('is_default')->orderBy('name')->get(),
        ]);
    }

    public function update(Business $business, Request $request): RedirectResponse
    {
        $this->ensureOwner($business, $request);

        $data = $this->validateData($request, $business);
        $business->update($data);
        $this->payloadService->refresh($business);

        return back()->with('status', 'business-updated');
    }

    public function destroy(Business $business, Request $request): RedirectResponse
    {
        $this->ensureOwner($business, $request);
        $business->delete();

        return to_route('businesses.index')->with('status', 'business-deleted');
    }

    protected function validateData(Request $request, ?Business $business = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slogan' => ['nullable', 'string', 'max:255'],
            'short_description' => ['nullable', 'string', 'max:255'],
            'about' => ['nullable', 'string'],
            'logo_path' => ['nullable', 'string', 'max:255'],
            'cover_image_path' => ['nullable', 'string', 'max:255'],
            'business_type' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'timezone' => ['nullable', 'string', 'max:255'],
            'is_active' => ['sometimes', 'boolean'],
            'theme_id' => ['nullable', 'exists:themes,id'],
            'custom_theme_overrides' => ['nullable', 'array'],
        ]);
    }

    protected function ensureOwner(Business $business, Request $request): void
    {
        abort_unless($business->user_id === $request->user()->id, 403);
    }

    protected function generateUniqueSlug(string $name): string
    {
        $base = Str::slug($name);

        do {
            $slug = $base . '-' . Str::random(4);
        } while (Business::where('slug', $slug)->exists());

        return $slug;
    }

    protected function defaultThemeId(): ?int
    {
        return Theme::where('is_default', true)->value('id')
            ?? Theme::orderBy('id')->value('id');
    }
}
