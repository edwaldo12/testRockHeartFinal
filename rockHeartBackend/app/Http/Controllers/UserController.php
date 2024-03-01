<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(Request $request)
    {
        $validatedData = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ];

        $validator = Validator::make($request->all(), $validatedData);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $validatedData = $validator->validated();

        $userDto = new \App\DTO\UserDTO(
            $validatedData['name'],
            $validatedData['email'],
            $validatedData['password']
        );

        $user = $this->userService->register($userDto);
        if (!$user) {
            return response()->json(['error' => 'The email has already been taken.'], 401);
        }

        return response()->json($user, 201);
    }

    public function login(Request $request)
    {
        $validatedData = [
            'email' => 'required|email',
            'password' => 'required|string',
        ];

        $validator = Validator::make($request->all(), $validatedData);
        if ($validator->fails()) {
            return $validator->errors();
        }

        $validatedData = $validator->validated();

        $userDto = new \App\DTO\UserDTO(
            null,
            $validatedData['email'],
            $validatedData['password']
        );

        $user = $this->userService->login($userDto);
        if (!$user) {
            return response()->json(['error' => 'Authentication failed'], 401);
        }
        return response()->json(['message' => 'Login successful', 'data' => $user], 200);
    }

    public function getUsers($excludeId)
    {
        $users = $this->userService->getUsers($excludeId);
        return response()->json($users, 200);
    }
}
