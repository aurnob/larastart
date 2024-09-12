<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::post('/register', [AuthController::class, 'register']);

Route::middleware('api')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('/logout', 'logout');
    });
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    //
    Route::controller(AuthController::class)->group(function () {
        Route::post('/logout', 'logoutUser');
    });
    //    
});
