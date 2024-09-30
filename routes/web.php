<?php

use Illuminate\Support\Facades\Route;
use App\Models\ship;
use App\Http\Controllers\StarshipController;
use App\Models\Satellite;

Route::get("/", function () {
    return redirect('/starships/main_list');
});

Route::get('/api/custom', function () {
    return ship::all();
});
Route::get('/api/satellites', function () {
    return Satellite::all(); 
});
Route::post('/store/ship', [StarshipController::class, 'store_ship']);
Route::post('/store/satellites', [StarshipController::class, 'store_satellite']);

Route::get('/starships/{any}', function () {
    return view('body');
})->where('any', '.*');

Route::post('/delete/satellite', [StarshipController::class, 'delete_satellite']);
Route::post('/modify/satellite', [StarshipController::class, 'modify_satellite']);

Route::post('/delete/customship', [StarshipController::class, 'delete_customship']);
Route::post('/modify/customship', [StarshipController::class, 'modify_customship']);