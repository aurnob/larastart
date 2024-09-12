<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Str;

class CreateNewUser
{
    public function handle(array $userData): User
    {
        return User::create([
            'name' => $userData['name'],
            'email' => $userData['email'],
            'isValidEmail' => User::IS_INVALID_EMAIL,
            'password' => Hash::make($userData['password']),
            'remember_token' => $this->generateRandomCode()
        ]);
    }

    function generateRandomCode()
    {
        $code = Str::random(10) . time();
        return $code;
    }
}
