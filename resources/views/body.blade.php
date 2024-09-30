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
    <div class="left-0 right-0 justify-center flex flex-wrap pt-5 pb-5">
        <a href="/starships/add_custom_ship" class="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ADD Custom Starships</a>
        <a href="/starships/add_satellite" class="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ADD Satellite</a>
        <a href="/starships/main_list/?page=1" class="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Main Page</a>
        <a href="/starships/list_custom_ship" class="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">List all Custom Starships</a>
        <a href="/starships/list_custom_satellites" class="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">List all Satellites</a>
    </div>
    <div id="app" />
</body>
</html>