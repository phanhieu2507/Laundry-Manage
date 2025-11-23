<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('order_id');
            $table->unsignedBigInteger('user_id');
            $table->string('status')->default('pending');
            $table->unsignedBigInteger('total_price');  
            $table->string('delivery_method_pickup');
            $table->string('delivery_method_return');
            $table->string('pickup_address');
            $table->string('return_address');
            $table->unsignedInteger('delivery_fee')->nullable();  
            $table->datetime('scheduled_time')->nullable();
            $table->datetime('completed_time')->nullable();

            $table->enum('payment_status', ['paid', 'unpaid'])->default('unpaid');
       
            $table->text('note')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
