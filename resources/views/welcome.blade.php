<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="shortcut icon" href="{{ asset('/') }}images/favicon.png" type="image/png">
    @vite('resources/css/app.css')

    <style>
        input {
            cursor: inherit;
        }

        .a {
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div id="app">
        <app></app>
    </div>

    @vite( 'resources/js/app.js')
    <!-- loading script with vite blade directive -->
</body>


</html>