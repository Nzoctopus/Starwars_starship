<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Register function
    public function register(Request $request)
    {
        // Validate incoming data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Create user with hashed password
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        // Automatically log in the user after registration
        Auth::login($user);

        return response()->json(['message' => 'Registration successful', 'user' => $user], 201);
    }

    // Login function
    public function login(Request $request)
    {
        // Validate login credentials
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt to log in the user
        if (Auth::attempt($credentials)) {
            $user = Auth::user(); // Get current authenticated user
            return response()->json(['message' => 'Login successful', 'user' => $user], 200);
        }

        // If credentials are wrong
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Get the current logged-in user
    public function user()
    {
        return response()->json(Auth::user());
    }
    public function logout()
    {
        // Log out the currently authenticated user
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }

}
