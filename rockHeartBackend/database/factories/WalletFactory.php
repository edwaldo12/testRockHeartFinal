<?php

namespace Database\Factories;

use App\Models\Wallet;
use Illuminate\Database\Eloquent\Factories\Factory;

class WalletFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Wallet::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_fk' => function () {
                return \App\Models\User::factory()->create()->id;
            },
            'transaction_description' => $this->faker->sentence,
            'amount' => $this->faker->numberBetween(0, 1000), // Example range of amount
            // Add more attributes as needed
        ];
    }
}
