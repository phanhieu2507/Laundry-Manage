<?php

use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\RequestOrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PromoCodeController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('services', ServiceController::class);
Route::apiResource('request-orders', RequestOrderController::class);
Route::apiResource('users', UserController::class);
Route::resource('orders', OrderController::class);
Route::get('/admin/request-orders', [RequestOrderController::class, 'adminIndex']);
Route::put('/admin/request-orders/{id}/status/{status}', [RequestOrderController::class, 'updateStatus']);
Route::post('login',[UserController::class,'login']);
Route::post('register',[UserController::class,'register']);
Route::get('/user/{id}/request-orders', [RequestOrderController::class, 'getUserRequests']);
Route::get('/user/{id}/orders', [OrderController::class, 'getUserRequests']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('promo-codes', PromoCodeController::class);
Route::post('apply-promo-code', [PromoCodeController::class, 'apply']);

