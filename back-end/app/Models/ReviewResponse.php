<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReviewResponse extends Model
{
    protected $primaryKey = 'response_id';

    protected $fillable = ['review_id', 'response', 'response_date'];

    public function review()
    {
        return $this->belongsTo(Review::class, 'review_id');
    }
}
