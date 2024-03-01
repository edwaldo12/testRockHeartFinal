<?php

namespace App\Repositories;

use App\DTO\UserDTO;
use App\Interfaces\UserInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserInterface
{

  public function register(UserDTO $userDto)
  {
    $hashedPassword = Hash::make($userDto->password);
    $user = User::create([
      'name' => $userDto->name,
      'email' => $userDto->email,
      'password' => $hashedPassword,
      'wallet' => $userDto->wallet,
    ]);
    return $user;
  }

  public function login($userDto)
  {
    $user = User::where('email', $userDto->email)->first();

    if (!$user || !Hash::check($userDto->password, $user->password)) {
      return null;
    }

    return $user;
  }

  public function getUsers(int $excludeId)
  {
    return User::where('id', '!=', $excludeId)->get();
  }
}
