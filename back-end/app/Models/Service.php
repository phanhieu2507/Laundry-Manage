<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'service_id';

    protected $fillable = [
        'description',
        'duration',
        'is_available',
        'price_per_unit',
        'service_id',
        'service_name',
        'unit_type',

    ];
}
