<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\VisitorType;
use App\Enums\EntryType;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visitors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('registration_code')->unique(); // QR code value
            $table->enum('visitor_type', array_column(VisitorType::cases(), 'value'));
            $table->timestamps();
        });

        Schema::create('entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('visitor_id')->constrained('visitors')->onDelete('cascade');
            $table->enum('entry_type', array_column(EntryType::cases(), 'value'));
            $table->timestamp('entry_time');
            $table->timestamps();

            $table->unique(['visitor_id', 'entry_type']); // Ensure unique entries
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entries');
        Schema::dropIfExists('visitors');
    }
};
