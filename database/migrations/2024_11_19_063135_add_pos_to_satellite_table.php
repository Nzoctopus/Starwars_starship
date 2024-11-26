<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('satellites', function (Blueprint $table) {
            $table->integer('posX')->nullable();
            $table->integer('posY')->nullable();
            $table->integer('targetX')->nullable();
            $table->integer('targetY')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('satellites', function (Blueprint $table) {
            $table->dropColumn('posX');
            $table->dropColumn('posY');
            $table->dropColumn('targetX');
            $table->dropColumn('targetY');
        });
    }
};
