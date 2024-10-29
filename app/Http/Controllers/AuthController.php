<?php

namespace App\Http\Controllers;

use App\Models\UploadImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
        $id = Auth::id();
        $user = User::with(['pfp_file', 'banner_file'])->find($id);
        return response()->json($user);
    }
    public function logout()
    {
        // Log out the currently authenticated user
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function modify_user(Request $request)
    {
        // Validate request
        $validatedData = $request->validate([
            'banner' => 'nullable|file|mimes:jpg,png,jpeg,pdf|max:4096',
            'pfp' => 'nullable|file|mimes:jpg,png,jpeg,pdf|max:4096',
        ]);
    
        // Fetch user without validation for `id`
        $user = User::find($request->id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        // Handle banner file upload
        if ($request->hasFile('banner')) {
            $file = $request->file('banner');
            $filePath = $file->store('uploads', 'public');
            
            $uploadImage = UploadImage::create([
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getClientMimeType(),
                'path' => $filePath,
                'size' => $file->getSize(),
            ]);
        
            // Remove old banner if exists
            $deletedImage = UploadImage::find($user->linked_banner_image_id);
            if ($deletedImage) {
                if (Storage::exists("public/{$deletedImage->path}")) {
                    Storage::delete("public/{$deletedImage->path}");
                }
                $deletedImage->delete();
            }
            $validatedData['linked_banner_image_id'] = $uploadImage->id;
        }
    
        // Handle profile picture (pfp) file upload
        if ($request->hasFile('pfp')) {
            $file = $request->file('pfp');
            $filePath = $file->store('uploads', 'public');
            
            $uploadImage = UploadImage::create([
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getClientMimeType(),
                'path' => $filePath,
                'size' => $file->getSize(),
            ]);
        
            // Remove old profile picture if exists
            $deletedImage = UploadImage::find($user->linked_pfp_image_id);
            if ($deletedImage) {
                if (Storage::exists("public/{$deletedImage->path}")) {
                    Storage::delete("public/{$deletedImage->path}");
                }
                $deletedImage->delete();
            }
            $validatedData['linked_pfp_image_id'] = $uploadImage->id;
        }
    
        // Update user with new data
        $user->update($validatedData);
    
        return response()->json(['success' => 'User updated successfully']);
    }
}
