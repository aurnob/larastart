<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/check_email/{token}', [AuthController::class, 'validateEmail']);

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
