<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Error 500 - Problema interno</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f0f2f5;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            background-color: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
            width: 90%;
        }

        .container img {
            max-width: 150px;
            margin-bottom: 20px;
        }

        h1 {
            font-size: 48px;
            color: #dc3545;
            margin-bottom: 10px;
        }

        p {
            font-size: 18px;
            color: #555;
            margin-bottom: 30px;
        }

        .buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        .buttons a {
            text-decoration: none;
            background-color: #007bff;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            transition: background-color 0.3s ease;
        }

        .buttons a:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://i.imgur.com/QIxIKBH.png" alt="Error 500">
        <h1>Error 500</h1>
        <p>Ocurrió un problema interno en el servidor.<br>Por favor, intenta de nuevo más tarde.</p>
        <div class="buttons">
            <a href="../index.html">Volver al inicio</a>
            <a href="../index.htmls">Registrarse</a>
        </div>
    </div>
</body>
</html>
