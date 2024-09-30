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
        Schema::create('ship', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('model');
            $table->string('manufacturer');
            $table->integer('cost');
            $table->integer('length');
            $table->integer('max_atmo_speed');
            $table->integer('crew');
            $table->integer('passengers');
            $table->integer('cargo_capacity');
            $table->string('consumables');
            $table->float('hyperdrive_rating');
            $table->integer('mglt');
            $table->string('starship_class');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ship');
    }
};
