<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\RequestOrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PromoCodeController;
use App\Http\Controllers\NotificationController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::post('/promo-codes/apply', [PromoCodeController::class, 'apply']);
Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);

