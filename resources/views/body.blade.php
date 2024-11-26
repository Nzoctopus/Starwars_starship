<!DOCTYPE html>
<html lang="en" class="overflow-x-hidden">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/app.jsx', ])
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Starwars</title>
</head>
<body>
    <div class="fixed inset-0 bg-cover bg-center bg-black z-[-1]"></div>
    <div class="fixed inset-0 bg-cover bg-center bg-[url('/public/images/bg_image.jpg')] z-[-1] opacity-30"></div>
    <div id="app" />
</body>
</html>