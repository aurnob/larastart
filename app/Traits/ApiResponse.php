<?php

namespace App\Traits;

use Illuminate\Support\Facades\Response;

trait ApiResponse
{
    public static function success($data, $message = 'Success', $status = 200)
    {
        return Response::json([
            'message' => $message,
            'data' => $data
        ], $status);
    }

    public static function error($message, $status = 422, $data = null)
    {
        return Response::json([
            'message' => $message,
            'data' => $data
        ], $status);
    }
}
