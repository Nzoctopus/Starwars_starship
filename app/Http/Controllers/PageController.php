<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use PHPUnit\TextUI\XmlConfiguration\Logging\TestDox\Html;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $page_input = $request->input('page', 1);
        $link = "https://swapi.dev/api/starships/?page={$page_input}";
        $headers = @get_headers($link);
        $url_not_valid = str_contains($headers[0], "NOT FOUND");
        if ($url_not_valid) {
            $link = "https://swapi.dev/api/starships/?page=1";
            $page_input = 1;
        }
        $content = Http::get($link);
        $next = $content["next"] ? $page_input + 1 : false;
        $previous = $content["previous"] ? $page_input - 1 : false;
        $result = $content["results"];
        return view('home', compact('content', 'next', 'previous', 'page_input'));
    }
}

