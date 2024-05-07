<?php

namespace App\Http\Controllers;



// app/Http/Controllers/OrderController.php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('user')->get();
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with('user')->find($id);
        
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|exists:users,phone',
            'total_amount' => 'required|numeric',
            'payment_status' => 'required|string',
            'order_date' => 'required|date',
            'service' => 'required|string',
            'detail' => 'nullable|string',
            'promo_code' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Tìm user dựa trên số điện thoại
        $user = User::where('phone', $request->phone)->first();

        // Xử lý mã giảm giá
        $promoCode = PromoCode::where('code', $request->promo_code)
                              ->where('status', 'active')
                              ->whereDate('valid_from', '<=', now())
                              ->whereDate('valid_until', '>=', now())
                              ->first();

        $discountAmount = 0;
        if ($promoCode && $this->validatePromoCodeUsage($promoCode)) {
            $discountAmount = $this->calculateDiscount($promoCode, $request->total_amount);
        }

        $order = Order::create([
            'user_id' => $user->id,
            'total_amount' => $request->total_amount - $discountAmount,
            'payment_status' => $request->payment_status,
            'order_date' => $request->order_date,
            'service' => $request->service,
            'detail' => $request->detail,
            'promo_code' => $request->promo_code,
            'discount_amount' => $discountAmount
        ]);

        return response()->json($order, 201);
    }

    protected function validatePromoCodeUsage(PromoCode $promoCode)
    {
        return !$promoCode->usage_limit || $promoCode->times_used < $promoCode->usage_limit;
    }

    protected function calculateDiscount(PromoCode $promoCode, $totalAmount)
    {
        return $promoCode->discount_type == 'percentage' ?
               ($totalAmount * $promoCode->discount_value / 100) :
               min($promoCode->discount_value, $totalAmount);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $request->validate([
            'user_id' => 'exists:users,id',
            'total_amount' => 'numeric',
            'payment_status' => 'in:paid,unpaid',
            'order_date' => 'date',
            'service' => 'string',
            'detail' => 'nullable|string',
        ]);

        $order->update($request->all());

        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
    public function getUserRequests($id)
    {
        // Lấy danh sách yêu cầu của người dùng đăng nhập hiện tại
        $userRequests = Order::where('user_id', $id)->get();

        return response()->json($userRequests);
    }
}

