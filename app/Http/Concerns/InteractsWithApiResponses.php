<?php

namespace App\Http\Concerns;

use Illuminate\Http\JsonResponse;

trait InteractsWithApiResponses
{
    protected function respondSuccess(array $data = [], string $message = 'تمت العملية بنجاح', int $status = 200): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    protected function respondError(string $message = 'حدث خطأ غير متوقع', int $status = 400, array $errors = []): JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }
}
