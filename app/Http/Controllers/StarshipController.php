<?php

namespace App\Http\Controllers;

use App\Models\Satellite;
use App\Models\ship;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class StarshipController extends Controller
{
    public function store_ship(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'manufacturer' => 'required|string|max:255',
            'cost' => 'required|integer',
            'length' => 'required|integer',
            'max_atmo_speed' => 'required|integer',
            'crew' => 'required|integer',
            'passengers' => 'required|integer',
            'cargo_capacity' => 'required|integer',
            'consumables' => 'required|string|max:255',
            'hyperdrive_rating' => 'required|string|max:255',
            'mglt' => 'required|integer',
            'starship_class' => 'required|string|max:255',
            'linked_satellite_id' => 'required',
            'linked_user_id'=> 'required',
        ]);
        ship::create($validatedData);
    }

    public function store_satellite(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'cost' => 'required|integer',
            'capacity' => 'required|integer',
            'class' => 'required|string|max:255',
            'linked_user_id'=> 'required',
        ]);
        Satellite::create($validatedData);
    }

    public function delete_satellite(Request $request)
    {
        $satellite = Satellite::find($request->id);
        $satellite->delete();
    }

    public function modify_satellite(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'cost' => 'required|integer',
            'capacity' => 'required|integer',
            'class' => 'required|string|max:255',
            'linked_user_id'=> 'required',
        ]);
        $satellite = Satellite::find($request->id);
        $satellite->update($validatedData);
    }
    public function delete_customship(Request $request)
    {
        $customship = ship::find($request->id);
        $customship->delete();
    }

    public function modify_customship(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'manufacturer' => 'required|string|max:255',
            'cost' => 'required|integer',
            'length' => 'required|integer',
            'max_atmo_speed' => 'required|integer',
            'crew' => 'required|integer',
            'passengers' => 'required|integer',
            'cargo_capacity' => 'required|integer',
            'consumables' => 'required|string|max:255',
            'hyperdrive_rating' => 'required',
            'mglt' => 'required|integer',
            'starship_class' => 'required|string|max:255',
            'linked_satellite_id'=> 'required',
            'linked_user_id'=> 'required',
        ]);
        $customship = ship::find($request->id);
        $customship->update($validatedData);
    }
}
