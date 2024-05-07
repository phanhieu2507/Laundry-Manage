<?php

namespace App\Http\Controllers;

use App\Models\RequestOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class RequestOrderController extends Controller
{
    public function index()
    {
        // Lấy tất cả request orders
        $requestOrders = RequestOrder::all();
        return response()->json($requestOrders);
    }

    public function show($id)
    {
        // Lấy thông tin của một request order cụ thể
        $requestOrder = RequestOrder::findOrFail($id);
        return response()->json($requestOrder);
    }

    public function store(Request $request)
    {
        // Lưu một request order mới
        $requestOrder = RequestOrder::create($request->all());
        return response()->json($requestOrder, 201);
    }

    public function update(Request $request, $id)
    {
        // Cập nhật thông tin của một request order
        $requestOrder = RequestOrder::findOrFail($id);
        $requestOrder->update($request->all());
        return response()->json($requestOrder, 200);
    }

    public function destroy($id)
    {
        // Xóa một request order
        $requestOrder = RequestOrder::findOrFail($id);
        $requestOrder->delete();
        return response()->json(null, 204);
    }

    public function adminIndex(Request $request)
    {
        $status = $request->query('status', 'all');

        if ($status === 'all') {
            $requests = RequestOrder::all();
        } else {
            $requests = RequestOrder::where('status', $status)->get();
        }

        return response()->json($requests);
    }

    public function updateStatus($id, $status)
    {
        $request = RequestOrder::find($id);
        
        if (!$request) {
            return response()->json(['error' => 'Request not found'], 404);
        }

        $request->status = $status;
        $request->save();

        return response()->json(['message' => 'Status updated successfully']);
    }

    public function getUserRequests($id)
    {
        // Lấy danh sách yêu cầu của người dùng đăng nhập hiện tại
        $userRequests = RequestOrder::where('user_id', $id)->get();

        return response()->json($userRequests);
    }
}
