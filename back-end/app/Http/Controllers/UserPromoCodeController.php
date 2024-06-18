<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\PromoCode;
use App\Models\UserPromoCode;
use App\Models\Notification;


class UserPromoCodeController extends Controller
{
    public function assignToUsers(Request $request, $promoCodeId)
    {
        $promoCode = PromoCode::find($promoCodeId);
        if (!$promoCode) {
            return response()->json(['message' => 'Promo code not found'], 404);
        }
    
        $userIds = $request->input('userIds');
        $limit = $request->input('limit', 1); // Giá trị mặc định là 1 nếu không được cung cấp
    
        if (is_array($userIds) && count($userIds) > 0) {
            foreach ($userIds as $userId) {
                // Thêm hoặc cập nhật giới hạn sử dụng cho người dùng
                DB::table('user_promo_codes')->updateOrInsert(
                    ['promo_code_id' => $promoCodeId, 'user_id' => $userId],
                    ['limit' => $limit, 'created_at' => now(), 'updated_at' => now()]
                );
    
                // Tạo thông báo cho mỗi người dùng được tặng mã
                $notification = new Notification([
                    'user_id' => $userId, // Chỉ định người dùng nhận thông báo
                    'title' => "Promo Code Gift",
                    'message' => "You have been gifted a promo code. Check your promo code section for more details."
                ]);
                $notification->save();
            }
            return response()->json(['message' => 'Promo code assigned successfully to users']);
        }
    
        return response()->json(['message' => 'No users provided'], 400);
    }
    

public function getAssignedUsers($promoCodeId)
{
    $assignedUsers = UserPromoCode::where('promo_code_id', $promoCodeId)
        ->with(['user' => function ($query) {
            $query->select('id', 'name', 'phone');
        }])
        ->get(['user_id', 'times_used', 'limit', 'created_at']);

    return response()->json($assignedUsers);
}


    
}
