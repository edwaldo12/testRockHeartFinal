<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Foundation\Testing\RefreshDatabase;

class WalletControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test retrieving the balance of a user's wallet.
     *
     * @return void
     */
    public function testShowUserBalance()
    {
        $user = User::factory()->create();
        $wallet = Wallet::factory()->create(['user_fk' => $user->id]);

        $response = $this->getJson('/api/wallet/balance/' . $user->id);

        $response->assertStatus(200)
            ->assertJson(['balance' => $wallet->amount]);
    }

    /**
     * Test adding funds to a user's wallet.
     *
     * @return void
     */
    public function testTopUpWallet()
    {
        $user = User::factory()->create();
        $initialBalance = 100;
        $amountToAdd = 50;

        $response = $this->postJson('/api/wallet/top-up', [
            'user_id' => $user->id,
            'amount' => $amountToAdd,
        ]);

        $response->assertStatus(200)
            ->assertJson(['balance' => $initialBalance + $amountToAdd]);
    }

    /**
     * Test sending funds from one user's wallet to another user's wallet.
     *
     * @return void
     */
    public function testSendToOtherWallet()
    {
        $sender = User::factory()->create();
        $receiver = User::factory()->create();
        $senderWallet = Wallet::factory()->create(['user_fk' => $sender->id, 'amount' => 100]);
        $amountToSend = 50;

        $response = $this->postJson('/api/wallet/send', [
            'from_user_id' => $sender->id,
            'to_user_id' => $receiver->id,
            'amount' => $amountToSend,
        ]);

        $response->assertStatus(200)
            ->assertJson(['balance' => $senderWallet->amount - $amountToSend]);
    }

    /**
     * Test listing all transactions associated with a user's wallet.
     *
     * @return void
     */
    public function testListAllTransactions()
    {
        $user = User::factory()->create();
        $transactions = Wallet::factory()->count(3)->create(['user_fk' => $user->id]);

        $response = $this->getJson('/api/wallet/transactions/' . $user->id);

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }
}
