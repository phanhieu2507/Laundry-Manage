<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    protected $fillable = [
        'code', 'description', 'discount_type', 'discount_value', 'valid_from', 
        'valid_until', 'status', 'usage_limit', 'times_used'
    ];
}

