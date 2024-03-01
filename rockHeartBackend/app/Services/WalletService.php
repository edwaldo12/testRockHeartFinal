<?php

namespace App\Services;

use App\DTO\WalletDTO;
use App\Models\User;
use App\Repositories\WalletRepository;
use Illuminate\Support\Facades\DB;

class WalletService
{
  protected $walletRepository;

  public function __construct(WalletRepository $walletRepository)
  {
    $this->walletRepository = $walletRepository;
  }

  public function getBalance($userId): float
  {
    return $this->walletRepository->getBalance($userId);
  }

  public function topUpWallet(WalletDTO $walletDto): array
  {
    $user = User::find($walletDto->user_fk);
    if (!$user) {
      return ['success' => false, 'message' => 'User not found'];
    }

    if ($walletDto->amount <= 0) {
      return ['success' => false, 'message' => 'Amount should be greater than 0'];
    }

    DB::beginTransaction();
    try {
      $this->walletRepository->updateBalance($walletDto->user_fk, $walletDto->amount);
      $this->walletRepository->recordTransaction($walletDto->user_fk, $walletDto->amount, 'TOP-UP');

      DB::commit();

      return [
        'success' => true,
        'balance' => $this->walletRepository->getBalance($walletDto->user_fk)
      ];
    } catch (\Exception $e) {
      DB::rollBack();
      return ['success' => false, 'message' => 'Failed to top up wallet due to an error.'];
    }
  }

  public function sendToOtherWallet($validatedData): array
  {
    $sender = User::find($validatedData['fromUserId']);
    $receiver = User::find($validatedData['toUserId']);

    if (!$sender || !$receiver) {
      return ['success' => false, 'message' => 'Sender or receiver not found'];
    }

    if ($sender->wallet < $validatedData['amount']) {
      return ['success' => false, 'message' => 'Insufficient funds'];
    }
    DB::beginTransaction();

    try {
      $sender->wallet -= $validatedData['amount'];
      $sender->save();

      $receiver->wallet += $validatedData['amount'];
      $receiver->save();

      $this->walletRepository->recordTransaction($validatedData['fromUserId'], -$validatedData['amount'], 'Sent to user ' . $receiver->name);
      $this->walletRepository->recordTransaction($validatedData['toUserId'], $validatedData['amount'], 'Received from user ' . $sender->name);

      DB::commit();

      return ['success' => true, 'balance' => $this->getBalance($validatedData['fromUserId'])];
    } catch (\Exception $e) {
      DB::rollBack();
      return ['success' => false, 'message' => 'Transaction failed due to an error.'];
    }
  }


  public function listUserTransactions(int $userId): \Illuminate\Database\Eloquent\Collection
  {
    return $this->walletRepository->listTransactions($userId);
  }
}
