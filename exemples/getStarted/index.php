<?php

use amoni\router\Router;

include "bin/ini.php";

$router = new Router(RACINE, $routes);
$router->run('');
