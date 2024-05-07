<?php

namespace App\Http\Controllers;

use App\Models\PromoCode;
use Illuminate\Http\Request;

class PromoCodeController extends Controller
{
     // Lấy danh sách mã giảm giá
     public function index() {
        $promoCodes = PromoCode::all();
        return response()->json($promoCodes);
    }

    // Tạo mã giảm giá mới
    public function store(Request $request) {
        $promoCode = PromoCode::create($request->all());
        return response()->json($promoCode, 201);
    }

    // Cập nhật mã giảm giá
    public function update(Request $request, PromoCode $promoCode) {
        $promoCode->update($request->all());
        return response()->json($promoCode);
    }

    // Xóa mã giảm giá
    public function destroy(PromoCode $promoCode) {
        $promoCode->delete();
        return response()->json(null, 204);
    }

    // Kiểm tra và áp dụng mã giảm giá
    public function apply(Request $request) {
        $promoCode = PromoCode::where('code', $request->code)
                              ->where('status', 'active')
                              ->where('valid_from', '<=', now())
                              ->where('valid_until', '>=', now())
                              ->first();
        
        if (!$promoCode || ($promoCode->usage_limit && $promoCode->times_used >= $promoCode->usage_limit)) {
            return response()->json(['message' => 'This promo code is not valid.'], 400);
        }

        $promoCode->increment('times_used');
        return response()->json(['discount_type' => $promoCode->discount_type, 'discount_value' => $promoCode->discount_value]);
    }
}