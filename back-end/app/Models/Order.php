<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OrderService;
use App\Models\User;
use App\Models\AuditLog;

class Order extends Model
{
    use HasFactory;

    protected $primaryKey = 'order_id';

    protected $fillable = [
        'user_id',
        'status',
        'total_price',
        'delivery_method_pickup',
        'delivery_method_return',
        'pickup_address',
        'return_address',
        'delivery_fee',
        'scheduled_time',
        'completed_time',
        'payment_status',
        'note',
        'discount_amount',
        'promo_code_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function orderServices(){
        return $this->hasMany(OrderService::class, 'order_id');
    }

    public function auditLogs(){
        return $this->hasMany(AuditLog::class, 'order_id');
    }

}
