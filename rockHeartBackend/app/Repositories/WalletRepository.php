<?php

namespace App\Repositories;

use App\Interfaces\WalletInterface;
use App\Models\User;
use App\Models\Wallet;

class WalletRepository implements WalletInterface
{

  public function updateBalance(int $user_fk, float $amount): bool
  {
    $user = User::find($user_fk);
    if (!$user) {
      return false;
    }

    $user->wallet += $amount;
    return $user->save();
  }


  public function recordTransaction(int $user_fk, float $amount, string $description): bool
  {
    $transaction = new Wallet([
      'user_fk' => $user_fk,
      'amount' => $amount,
      'transaction_description' => $description,
    ]);

    return $transaction->save();
  }

  public function getBalance(int $userId): float
  {
    $user = User::find($userId);
    return $user ? $user->wallet : 0.0;
  }

  public function listTransactions(int $userId): \Illuminate\Database\Eloquent\Collection
  {
    return Wallet::where('user_id', $userId)->get();
  }
}
