<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'User One',
            'email' => 'user1@mail.com',
            'password' => Hash::make('Congress@1'),
            'isValidEmail' => 1,
        ]);

        User::factory()->create([
            'name' => 'User Two',
            'email' => 'user2@mail.com',
            'password' => Hash::make('Congress@2'),
            'isValidEmail' => 1,
        ]);

        User::factory()->create([
            'name' => 'User Three',
            'email' => 'user3@mail.com',
            'password' => Hash::make('Congress@3'),
            'isValidEmail' => 1,
        ]);

        User::factory()->create([
            'name' => 'User Four',
            'email' => 'user4@mail.com',
            'password' => Hash::make('Congress@4'),
            'isValidEmail' => 1,
        ]);

        User::factory()->create([
            'name' => 'User Five',
            'email' => 'user5@mail.com',
            'password' => Hash::make('Congress@5'),
            'isValidEmail' => 1,
        ]);
    }
}
