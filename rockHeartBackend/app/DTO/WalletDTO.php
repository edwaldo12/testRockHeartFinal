<?php

namespace App\DTO;

class WalletDTO
{
  public ?int $user_fk;
  public ?float $amount;
  public ?string $transaction_description;

  public function __construct(?int $user_fk, ?string $transaction_description, ?float $amount,)
  {
    $this->user_fk = $user_fk;
    $this->transaction_description = $transaction_description;
    $this->amount = $amount;
  }
}
