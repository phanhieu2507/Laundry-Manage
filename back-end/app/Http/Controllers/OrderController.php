<?php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\PromoCode;
use App\Models\UserPromoCode;
use App\Models\Review;
use App\Models\Notification;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderPlaced;
use App\Models\OrderService;
use App\Models\AuditLog;
use Carbon\Carbon;

class OrderController extends Controller
{   
    public function adminIndex(Request $request)
    {
        $status = $request->query('status', 'all');
        
        if ($status === 'all') {
            // Lấy tất cả các request orders cùng với thông tin user liên quan và sắp xếp từ mới nhất
            $orders = Order::with( 'user','orderServices.service')->orderBy('created_at', 'desc')->get();
        } else {
            // Lọc các request orders theo status cùng với thông tin user liên quan và sắp xếp từ mới nhất
            $orders = Order::with( 'user', 'orderServices.service')->where('status', $status)->orderBy('created_at', 'desc')->get();
        }
        
        return response()->json($orders);
    }

    public function desOrder($id, Request $request){
        $order = Order::find($id);
        if(!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
    
        switch ($request->decision) {
            case "continue_with_changes":
                // Apply changes from audit logs
                $auditLogs = $order->auditLogs()->get();
                foreach ($auditLogs as $log) {
                    if ($log->change_type === "quantity_adjustment") {
                        // Find the corresponding order service and update it
                        $orderService = $order->orderServices()->where('service_id', $log->service_id)->first();
                        if ($orderService) {
                            $orderService->actual_quantity = $log->new_value;
                            $orderService->save();
                        }
                    } elseif ($log->change_type === "additional_service") {
                        // Create a new order service
                        $newOrderService = new OrderService([
                            'order_id' => $id,
                            'service_id' => $log->service_id,
                            'declared_quantity' => 0, // Assuming declared quantity is zero for additional services
                            'actual_quantity' => $log->new_value,
                        ]);
                        $newOrderService->save();
                    }
                }
                $order->status = 'processing';
                $order->save();
                return response()->json(['message' => 'Order updated with changes'], 200);
            case "continue_new_quantity":
                $auditLogs = $order->auditLogs()->get();
                foreach ($auditLogs as $log) {
                    if ($log->change_type === "quantity_adjustment") {
                        // Find the corresponding order service and update it
                        $orderService = $order->orderServices()->where('service_id', $log->service_id)->first();
                        if ($orderService) {
                            $orderService->actual_quantity = $log->new_value;
                            $orderService->save();
                        }
                    }
                }
                $order->status = 'processing';
                $order->save();
                case "cancel_order":
                    // Update order status to 'cancelled'
                    $order->status = 'cancelled';
                    $order->save();
                
                    // Save user response
                    DB::table('user_responses')->insert([
                        'user_decision' => 'cancel_order',
                        'order_id' => $order->order_id,
                        'reason' => $request->reason ?? null,
                        'delivery_method_return' => $request->return_method ?? null,
                        'return_address' => $request->return_method === 'ship' ? $request->return_address : null,
                        'response_date' => now(),
                    ]);
                
                    // Provide feedback to the user
                    return response()->json([
                        'message' => 'Order cancellation has been recorded and processed.',
                        'order' => $order
                    ], 200);
                
            default:
                return response()->json(['error' => 'Invalid decision'], 400);
        }
    }
    

    public function confirmOrder($id, Request $request){
        $order = Order::find($id);
        $order->status = 'awaiting';
        $order->save();

        $quantityChanges = $request->input('quantityChanges', []);
        $additionalServices = $request->input('additional_services', []);
        $reason = $request->input('reason');
    
        // Lưu các thay đổi số lượng vào audit_log
        foreach ($quantityChanges as $change) {
            AuditLog::create([
                'order_id' => $id,
                'service_id' => $change['service_id'],
                'change_reason' => $reason,
                'new_value' => $change['new_quantity'],
                'change_type' => 'quantity_adjustment'
            ]);
        }
    
        // Lưu các dịch vụ tư vấn thêm
        foreach ($additionalServices as $serviceId) {
            AuditLog::create([
                'order_id' => $id,
                'service_id' => $serviceId,
                'change_reason' => $reason,
                'change_type' => 'additional_service'
            ]);
        }
    
        return response()->json(['message' => 'Order confirmed and audit logs updated.']);
    }
    // public function index(Request $request) {
    //     $query = Order::query();
    
    //     // Logging incoming request parameters
      
    
    //     // Filtering by today
    //     if ($request->time_filter === 'today') {
    //         $query->whereDate('created_at', '=', now()->toDateString());
    //     }
    
    //     // Filtering by this week
    //     if ($request->time_filter === 'week') {
    //         $startOfWeek = now()->startOfWeek()->toDateTimeString();
    //         $endOfWeek = now()->endOfWeek()->toDateTimeString();
    //         $query->whereBetween('created_at', [$startOfWeek, $endOfWeek]);
        
    //     }
    
    //     // Filtering by this month
    //     if ($request->time_filter === 'month') {
    //         $startOfMonth = now()->startOfMonth()->toDateTimeString();
    //         $endOfMonth = now()->endOfMonth()->toDateTimeString();
    //         $query->whereBetween('created_at', [$startOfMonth, $endOfMonth]);
          
    //     }
    
    //     // Additional status filter
    //     if ($request->has('status')) {
    //         $query->where('status', $request->status);
    //     }
    
    //     $orders = $query->with('user', 'orderService')->get();
    
    //     return response()->json($orders);
    // }

    public function show($id, $orderId)
    {
        $order = Order::with('user', 'orderServices', 'auditLogs', 'auditLogs.service', 'orderServices.service' )->find($orderId);
        
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'services' => 'required|array',
            'services.*.service_id' => 'required|integer|exists:services,service_id',
            'services.*.quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric',
            'pickup_address' => 'required|string',
            'scheduled_time' => 'nullable|date',
            'delivery_method_pickup' => 'required|string',
            'delivery_fee' => 'required|numeric',
            'discount_amount' => 'required|numeric',
            'note' => 'nullable|string'
        ]);
    
        // Create a new order
        $order = new Order();
        $order->user_id = $request->user_id;
        $order->total_price = $request->total_price;
        $order->delivery_method_pickup = $request->delivery_method_pickup;
        $order->pickup_address = $request->pickup_address;
        $order->scheduled_time = Carbon::parse($request->scheduled_time);
        $order->delivery_fee = $request->delivery_fee;
        $order->discount_amount = $request->discount_amount;
        $order->note = $request->note;
        $order->save();

        $completedDays = 0;
        // Attach services to the order in the order_service table
        foreach ($request->services as $service) {
            $serviceDuration = Service::find($service['service_id']);
            $item = new OrderService();
            $item->order_id = $order->order_id;
            $item->service_id = $service['service_id'];
            $item->declared_quantity = $service['quantity'];
            $completedDays += $serviceDuration->duration;
            $item ->save();
        }

        $order->completed_time = $order->scheduled_time->copy()->addDays($completedDays);
        $order->save();
        return response()->json([
            'message' => 'Order created successfully!',
            'order' => $order
        ]);
    }

    protected function calculateDiscount( $discount_type, $discount, $totalAmount)
    {
        $discountValue = floatval($discount);

    if ($discount_type == 'percentage') {
        // Tính toán giảm giá dựa trên phần trăm
        return ($totalAmount * $discountValue) / 100;
    }

    // Tính toán giảm giá dựa trên giá trị cố định
    return min($discountValue, $totalAmount);
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

    public function updateStatus($id,Request $request)
    {
        $order = Order::find($id);
    
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
    
        $order->status = $request->status;
        $order->save();
        

        // // Tạo và lưu thông báo
        // $notification = new Notification([
        //     'user_id' => $requestOrder->user_id,
        //     'title' => "Request Update",
        //     'message' => "Your request $id has been updated to $status."
        // ]);
        // $notification->save();
    
        // // Gửi email
        // Mail::to($requestOrder->user->email)->send(new StatusUpdated($requestOrder));
    
        return response()->json(['message' => 'Status updated successfully']);
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

