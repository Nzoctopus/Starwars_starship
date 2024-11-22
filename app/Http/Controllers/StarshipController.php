<?php

namespace App\Http\Controllers;

use App\Models\Satellite;
use App\Models\ship;
use App\Models\UploadImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'file' => 'nullable|file|mimes:jpg,png,jpeg,pdf|max:4096'
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            
            $filePath = $file->store('uploads', 'public'); // Stores in 'storage/app/public/uploads'
        
            $fileName = $file->getClientOriginalName();
            $mimeType = $file->getClientMimeType(); // or $file->getMimeType();
            $fileSize = $file->getSize();
        
            $uploadImage = UploadImage::create([
                'file_name' => $fileName,
                'mime_type' => $mimeType,
                'path' => $filePath,
                'size' => $fileSize,
            ]);
        
            $validatedData['linked_image_id'] = $uploadImage->id;
        }
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
            'linked_user_id' => 'required',
            'file' => 'nullable|file|mimes:jpg,png,jpeg,pdf|max:4096',
            'posX' => 'nullable|integer',
            'posY' => 'nullable|integer',
            'targetX' => 'nullable|integer',
            'targetY' => 'nullable|integer',
            'size' => 'nullable|integer',
            'speed' => 'nullable|integer',
            'faction' => 'nullable|integer',
        ]);
        
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            
            $filePath = $file->store('uploads', 'public'); // Stores in 'storage/app/public/uploads'
        
            $fileName = $file->getClientOriginalName();
            $mimeType = $file->getClientMimeType(); // or $file->getMimeType();
            $fileSize = $file->getSize();
        
            $uploadImage = UploadImage::create([
                'file_name' => $fileName,
                'mime_type' => $mimeType,
                'path' => $filePath,
                'size' => $fileSize,
            ]);
        
            $validatedData['linked_image_id'] = $uploadImage->id;
        }
        
        Satellite::create($validatedData);
    }

    public function delete_satellite(Request $request)
    {
        $satellite = Satellite::find($request->id);
        $deletedImage = UploadImage::find($satellite->linked_image_id);
        if ($deletedImage) {
            if (Storage::exists("/public/$deletedImage->path")) {
                Storage::delete("/public/$deletedImage->path");
            }
            $deletedImage->delete();
        }
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
            'file' => 'nullable|file|mimes:jpg,png,jpeg,pdf|max:4096',
            'posX' => 'nullable|integer',
            'posY' => 'nullable|integer',
            'targetX' => 'nullable|integer',
            'targetY' => 'nullable|integer',
            'size' => 'nullable|integer',
            'speed' => 'nullable|integer',
            'faction' => 'nullable|integer',
        ]);
        $satellite = Satellite::find($request->id);
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $filePath = $file->store('uploads', 'public'); // Stores in 'storage/app/public/uploads'
            $fileName = $file->getClientOriginalName();
            $mimeType = $file->getClientMimeType(); // or $file->getMimeType();
            $fileSize = $file->getSize();

            $uploadImage = UploadImage::create([
                'file_name' => $fileName,
                'mime_type' => $mimeType,
                'path' => $filePath,
                'size' => $fileSize,
            ]);

            $deletedImage = UploadImage::find($satellite->linked_image_id);
            if (Storage::exists("/public/$deletedImage->path")) {
                Storage::delete("/public/$deletedImage->path");
            }
            $deletedImage->delete();

            $validatedData['linked_image_id'] = $uploadImage->id;
        }
        $satellite->update($validatedData);
    }
    public function delete_customship(Request $request)
    {
        $customship = ship::find($request->id);
        $deletedImage = UploadImage::find($customship->linked_image_id);
        if ($deletedImage) {
            if (Storage::exists("/public/$deletedImage->path")) {
                Storage::delete("/public/$deletedImage->path");
            }
            $deletedImage->delete();
        }
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
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $filePath = $file->store('uploads', 'public'); // Stores in 'storage/app/public/uploads'
            $fileName = $file->getClientOriginalName();
            $mimeType = $file->getClientMimeType(); // or $file->getMimeType();
            $fileSize = $file->getSize();

            $uploadImage = UploadImage::create([
                'file_name' => $fileName,
                'mime_type' => $mimeType,
                'path' => $filePath,
                'size' => $fileSize,
            ]);

            $deletedImage = UploadImage::find($customship->linked_image_id);
            if (Storage::exists("/public/$deletedImage->path")) {
                Storage::delete("/public/$deletedImage->path");
            }
            $deletedImage->delete();

            $validatedData['linked_image_id'] = $uploadImage->id;
        }
        $customship->update($validatedData);
    }
}
