<?php

use Illuminate\Support\Facades\Route;
use App\Models\ship;
use App\Http\Controllers\StarshipController;
use App\Models\Satellite;

Route::get("/", function () {
    return redirect('/starships/main_list');
});

Route::get('/starships/{any}', function () {
    return view('body');
})->where('any', '.*');

Route::get('/api/custom', function () {
    $customship = ship::all();
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
    $satellite = Satellite::all();
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


Route::post('/store/satellite', [StarshipController::class, 'store_satellite']);
Route::post('/modify/satellite', [StarshipController::class, 'modify_satellite']);
Route::post('/delete/satellite', [StarshipController::class, 'delete_satellite']);

Route::post('/store/ship', [StarshipController::class, 'store_ship']);
Route::post('/modify/customship', [StarshipController::class, 'modify_customship']);
Route::post('/delete/customship', [StarshipController::class, 'delete_customship']);