<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAuditLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('audit_logs', function (Blueprint $table) {
            $table->dropForeign(['item_id']);  // Xóa khóa ngoại hiện tại nếu có
            $table->dropColumn('item_id');     // Xóa cột item_id

            $table->unsignedBigInteger('service_id')->after('order_id'); // Thêm cột service_id
            $table->foreign('service_id')->references('service_id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('audit_logs', function (Blueprint $table) {
            $table->dropForeign(['service_id']);
            $table->dropColumn('service_id');

            $table->unsignedBigInteger('item_id')->after('order_id');
            $table->foreign('item_id')->references('item_id')->on('order_services')->onDelete('cascade');
        });
    }
}
