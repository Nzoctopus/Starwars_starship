<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/app.jsx', ])
    <title>Starwars</title>
</head>
<body>
    <div class="fixed inset-0 bg-cover bg-center bg-black z-[-1]"></div>
    <div class="fixed inset-0 bg-cover bg-center bg-[url('/public/images/bg_image.jpg')] z-[-1] opacity-30"></div>
    <div class="sticky top-0 px-4 sm:px-6 lg:px-8 mx-auto sm:text-center bg-gradient-to-b from-black to-transparent h-24">
        <p class="mt-6 text-[2.5rem] leading-none sm:text-6xl tracking-tight font-bold text-yellow-500">STARWARS</p>
    </div>
    <div id="app" />
</body>
</html>