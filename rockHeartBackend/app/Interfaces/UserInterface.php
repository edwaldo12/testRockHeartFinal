<?php

namespace App\Interfaces;

use App\DTO\UserDTO;
use Illuminate\Http\Request;

interface UserInterface
{
  public function register(UserDTO $userDto);
  public function login(UserDTO $userDto);
  public function getUsers(int $excludeId);
}
