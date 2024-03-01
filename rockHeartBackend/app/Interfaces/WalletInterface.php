<?php

namespace App\Interfaces;

interface WalletInterface
{
  public function updateBalance(int $user_fk, float $amount): bool;
  public function recordTransaction(int $user_fk, float $amount, string $description): bool;
  public function getBalance(int $user_fk): float;
  public function listTransactions(int $user_fk): \Illuminate\Database\Eloquent\Collection;
}
