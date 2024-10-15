<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Models\ship;
use App\Http\Controllers\StarshipController;
use App\Models\Satellite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::get("/", function () {
    return redirect('/starships/main_list/1');
});

Route::get("/starships/main_list", function () {
    return redirect('/starships/main_list/1');
});

Route::get('/starships/{any}', function () {
    return view('body');
})->where('any', '.*');

Route::get('/api/custom', function () {
    $customship = ship::with(['satellite', 'user'])->get();
    if (!$customship) {
        return response()->json(['error' => 'Satellite not found'], 404);
    }
    return response()->json($customship);
});

Route::get('/api/custom/{id}', function($id) {
    $customship = ship::find($id);
    if (!$customship) {
        return response()->json(['error' => 'Satellite not found'], 404);
    }
    return response()->json($customship);
});

Route::get('/api/satellites', function () {
    $satellite = Satellite::with('user')->get();
    if (!$satellite) {
        return response()->json(['error' => 'Satellite not found'], 404);
    }
    return response()->json($satellite);
});

Route::get('/api/satellites/{id}', function($id) {
    $satellite = Satellite::find($id);
    if (!$satellite) {
        return response()->json(['error' => 'Satellite not found'], 404);
    }
    return response()->json($satellite);
});

// Route::get('/delete/all/customship', function () {
//     ship::truncate();
// });

// Route::get('/delete/all/satellite', function () {
//     Satellite::truncate();
// });



Route::post('/store/satellite', [StarshipController::class, 'store_satellite']);
Route::post('/modify/satellite', [StarshipController::class, 'modify_satellite']);
Route::post('/delete/satellite', [StarshipController::class, 'delete_satellite']);

Route::post('/store/ship', [StarshipController::class, 'store_ship']);
Route::post('/modify/customship', [StarshipController::class, 'modify_customship']);
Route::post('/delete/customship', [StarshipController::class, 'delete_customship']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user', [AuthController::class, 'user'])->middleware('auth');  // Use 'auth' middleware to protect the route
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

Route::get('/isLoggedIn', function() {
    return response()->json([
        'isLoggedIn' => Auth::check()
    ]);
});

Route::get('/api/users', function () {
    $users = User::all();
    if (!$users) {
        return response()->json(['error' => 'User not found'], 404);
    }
    return response()->json($users);
});
