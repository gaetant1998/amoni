<?php

use amoni\classes\Autoload;

include LIB.'amoni'.DS.'classes'.DS.'Autoload.php';

$src = [
    LIB, RACINE, CONTROLER
];

$paths = [

];

$autolaod = new Autoload($src, $paths);