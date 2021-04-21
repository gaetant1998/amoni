<?php

use amoni\router\Router;

include "bin/ini.php";

$url = (isset($_GET['url']))? $_GET['url'] : '';

$router = new Router(RACINE, $routes);
$router->run($url);
echo "ok";