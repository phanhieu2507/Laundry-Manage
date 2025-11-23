<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use App\Models\Service;

class AuditLog extends Model
{
    use HasFactory;

    protected $primaryKey = 'log_id';

    protected $fillable = [
        'order_id',
            'service_id',
            'change_reason',
            'new_value' ,
            'change_type'
    ];

    public function order (){
        return $this -> belongsTo(Order::class,'order_id');
    }

    public function service (){
        return $this -> belongsTo(Service::class,'service_id');
    }
}
