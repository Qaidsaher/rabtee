<?php

namespace App\Http\Controllers\Public;

use App\Http\Concerns\InteractsWithApiResponses;
use App\Http\Controllers\Controller;
use App\Jobs\RecordClickJob;
use App\Jobs\RecordVisitJob;
use App\Models\Business;
use App\Services\BusinessPublicPayloadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessPageController extends Controller
{
    use InteractsWithApiResponses;

    public function __construct(private readonly BusinessPublicPayloadService $payloadService)
    {
    }

    public function show(string $slug): Response
    {
        $business = Business::active()
            ->where('slug', $slug)
            ->firstOrFail(['id', 'public_payload']);

        if ($business->public_payload === null) {
            $business = Business::with(['theme', 'links', 'products'])
                ->findOrFail($business->id);
            $this->payloadService->refresh($business);
            $business->refresh(['public_payload']);
        }

        RecordVisitJob::dispatch(
            $business->id,
            request()->ip(),
            request()->userAgent(),
        );

        return Inertia::render('public/business_page', [
            'businessId' => $business->id,
            'payload' => $business->public_payload,
        ]);
    }

    public function trackClick(Business $business, Request $request): JsonResponse
    {
        $data = $request->validate([
            'type' => ['required', 'string', 'max:255'],
            'business_link_id' => ['nullable', 'integer', 'exists:business_links,id'],
        ]);

        if (! empty($data['business_link_id'])) {
            $linkBelongsToBusiness = $business->links()
                ->whereKey($data['business_link_id'])
                ->exists();

            abort_unless($linkBelongsToBusiness, 422, 'الرابط المحدد غير تابع لهذا النشاط');
        }

        RecordClickJob::dispatch(
            $business->id,
            $data['business_link_id'] ?? null,
            $data['type'] ?? null,
            $request->ip(),
            $request->userAgent(),
        );

        return $this->respondSuccess([], 'تم تسجيل النقر بنجاح');
    }
}
