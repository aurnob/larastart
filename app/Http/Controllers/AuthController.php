<?php

namespace App\Http\Controllers;

use App\Actions\CreateNewUser;
use App\Events\NewUserCreated;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Actions\UserValidation;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiResponse;

    private $secretKey = "qQKPjndxljuYQi/POiXJa8O19nVO/vTf/DpXO541g=qQKPjndxljuYQi/POiXJa8O19nVO/vTf/DpXO541g=";

    public function register(CreateUserRequest $request, CreateNewUser $createNewUser)
    {
        $user = $createNewUser->handle($request->validated());

        NewUserCreated::dispatch($user);

        return response(['user' => $user, 'message' => 'user created'], 200);
    }

    public function validateEmail($token)
    {
        User::where('remember_token', $token)
            ->update(['isValidEmail' => User::IS_VALID_EMAIL]);

        return redirect('/app/login');
    }

    public function login(LoginRequest $request, UserValidation $userValidation)
    {
        $fields = $request->validated();

        $user = User::where('email', $fields['email'])->first();

        if (is_null($user) || !Hash::check($fields['password'], $user->password)) {
            return ApiResponse::error('Invalid email or password', 422, [
                'isLoggedIn' => false
            ]);
        }

        $emailValidationResult = $userValidation->validateUserEmail($user);

        if ($emailValidationResult) {
            return ApiResponse::error($emailValidationResult['message'], 422, [
                'isLoggedIn' => false
            ]);
        }

        $token = $user->createToken($this->secretKey)->plainTextToken;

        return ApiResponse::success([
            'user' => $user,
            'token' => $token,
            'isLoggedIn' => true
        ], 'Logged in successfully');
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response(['message' => 'logout user'], 200);
    }
}
