<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function show(Business $business, Request $request): Response
    {
        $this->ensureOwner($business, $request);

        $visitsByDay = $business->visits()
            ->selectRaw('DATE(created_at) as day, COUNT(*) as total')
            ->where('created_at', '>=', now()->subDays(14))
            ->groupBy('day')
            ->orderBy('day')
            ->get();

        $clicksByType = $business->clicks()
            ->select('type', DB::raw('COUNT(*) as total'))
            ->groupBy('type')
            ->orderByDesc('total')
            ->get();

        return Inertia::render('business/dashboard/analytics/show', [
            'business' => $business,
            'visitSummary' => [
                'total' => $business->visits()->count(),
                'lastSevenDays' => $business->visits()->where('created_at', '>=', now()->subDays(7))->count(),
                'series' => $visitsByDay,
            ],
            'clickSummary' => [
                'total' => $business->clicks()->count(),
                'byType' => $clicksByType,
            ],
        ]);
    }

    protected function ensureOwner(Business $business, Request $request): void
    {
        abort_unless($business->user_id === $request->user()->id, 403);
    }
}
