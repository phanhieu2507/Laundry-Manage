<?php

namespace App\Http\Controllers;

use App\Models\RequestOrder;
use App\Models\Notification;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RequestOrderController extends Controller
{
    public function index(Request $request) {
        $query = RequestOrder::query();
    
        // Logging incoming request parameters
        Log::emergency('Received request with parameters:', $request->all());
    
        // Filtering by today
        if ($request->time_filter === 'today') {
            $query->whereDate('created_at', '=', now()->toDateString());
            Log::emergency('Filtering by today', ['date' => now()->toDateString()]);
        }
    
        // Filtering by this week
        if ($request->time_filter === 'week') {
            $startOfWeek = now()->startOfWeek()->toDateTimeString();
            $endOfWeek = now()->endOfWeek()->toDateTimeString();
            $query->whereBetween('created_at', [$startOfWeek, $endOfWeek]);
            Log::emergency('Filtering by week', ['startOfWeek' => $startOfWeek, 'endOfWeek' => $endOfWeek]);
        }
    
        // Filtering by this month
        if ($request->time_filter === 'month') {
            $startOfMonth = now()->startOfMonth()->toDateTimeString();
            $endOfMonth = now()->endOfMonth()->toDateTimeString();
            $query->whereBetween('created_at', [$startOfMonth, $endOfMonth]);
            Log::emergency('Filtering by month', ['startOfMonth' => $startOfMonth, 'endOfMonth' => $endOfMonth]);
        }
    
        // Additional status filter
        if ($request->has('status')) {
            $query->where('status', $request->status);
            Log::emergency('Filtering by status', ['status' => $request->status]);
        }
    
        $requestOrders = $query->get();
        Log::emergency('Fetched request orders', ['count' => count($requestOrders)]);
    
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
    
        // Tạo thông báo mới
        $notification = new Notification([
            'user_id' => $request->user_id, // Giả sử 'user_id' là khóa ngoại trong bảng 'requests'
            'title' => "Request Update",
            'message' => "Your request $id has been updated to $status."
        ]);
        $notification->save();
    
        return response()->json(['message' => 'Status updated successfully']);
    }
    

    public function getUserRequests($id)
    {
        // Lấy danh sách yêu cầu của người dùng đăng nhập hiện tại
        $userRequests = RequestOrder::where('user_id', $id)->get();

        return response()->json($userRequests);
    }
}
