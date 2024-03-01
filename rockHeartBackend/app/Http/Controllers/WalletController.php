<?php

namespace App\Http\Controllers;

use App\DTO\WalletDTO;
use Illuminate\Http\Request;
use App\Models\Wallet;
use App\Services\WalletService;
use Illuminate\Support\Facades\Validator;

class WalletController extends Controller
{
    protected $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }

    public function showUserBalance($userId)
    {
        $balance = $this->walletService->getBalance($userId);

        if ($balance === null) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json(['balance' => $balance], 200);
    }

    public function topUpWallet(Request $request)
    {
        $validatedData = [
            'user_fk' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:0.01',
        ];

        $validator = Validator::make($request->all(), $validatedData);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $validatedData = $validator->validated();

        $walletDTO = new WalletDTO(
            $validatedData['user_fk'],
            'TOP-UP',
            $validatedData['amount'],
        );

        $result = $this->walletService->topUpWallet($walletDTO);
        if ($result['success']) {
            return response()->json(['message' => 'Wallet topped up successfully.', 'balance' => $result['balance']], 200);
        } else {
            return response()->json(['message' => $result['message']], 400);
        }
    }

    public function sendToOtherWallet(Request $request)
    {
        $validatedData = [
            'fromUserId' => 'required|exists:users,id',
            'toUserId' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:0.01',
        ];

        $validator = Validator::make($request->all(), $validatedData);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $validatedData = $validator->validated();

        $result = $this->walletService->sendToOtherWallet($validatedData);

        return response()->json($result, $result['success'] ? 200 : 400);
    }

    public function listAllTransactions($userId)
    {
        $transactions = Wallet::where('user_fk', $userId)->get();

        return response()->json($transactions, 200);
    }
}
