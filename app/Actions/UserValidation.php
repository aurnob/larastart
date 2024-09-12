<?php

namespace App\Actions;

use App\Models\User;
use App\Events\NewUserCreated;

class UserValidation
{
    public function validateUserEmail(User $user)
    {
        if (intval($user->isValidEmail) !== User::IS_VALID_EMAIL) {
            NewUserCreated::dispatch($user);
            return [
                'message' => 'We sent you an email verification!',
                'isLoggedIn' => false
            ];
        }

        return null;
    }
}
