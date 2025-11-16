<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clicks', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('business_id')->constrained()->cascadeOnDelete();
            $table->foreignId('business_link_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type')->nullable();
            $table->string('device_type')->nullable();
            $table->string('ip_address')->nullable();
            $table->timestamps();

            $table->index('business_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clicks');
    }
};
