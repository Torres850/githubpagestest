<?php
// Simulamos un error del servidor manualmente
http_response_code(500);
include("error500.php"); // Mostramos la página personalizada
exit;
