<?php

use amoni\classes\Manager;
use amoni\router\Router;

include "bin/ini.php";

$url = (isset($_GET['url']))? $_GET['url'] : '';

$router = new Router(RACINE, $routes);
$router->run($url);

try {
    $mg = new Manager();   
    
    // echo '<pre>';
    // print_r($mg->read('gestion_livre.livre', null, 'titreLivre'));
    // echo '</pre>';
} catch (Exception $e) {
    echo($e->getMessage());
    echo '<pre>';
    print_r($e->getTraceAsString());
    echo '</pre>';
}