<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use App\Models\Service;

class OrderService extends Model
{
    use HasFactory;
    protected $primaryKey = 'item_id';
    
    protected $fillable = [
        'order_id',
        'service_id',
        'declared_quantity',
        'actual_quantity',
    ];

    public function order(){
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function service() {
        return $this->belongsTo(Service::class, 'service_id');
    }


}
