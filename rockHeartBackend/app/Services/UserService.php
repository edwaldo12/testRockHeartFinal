<?php

namespace App\Services;

use App\DTO\UserDTO;
use App\Interfaces\UserInterface;
use App\Repositories\UserRepository;

class UserService implements UserInterface
{
  private $userRepository;

  public function __construct(UserRepository $userRepository)
  {
    $this->userRepository = $userRepository;
  }

  public function login(UserDTO $userDto)
  {
    $user = $this->userRepository->login($userDto);
    return $user;
  }

  public function register(UserDTO $userDto)
  {
    return $this->userRepository->register($userDto);
  }

  public function getUsers(int $id)
  {
    return $this->userRepository->getUsers($id);
  }
}
