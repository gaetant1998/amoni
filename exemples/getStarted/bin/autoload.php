<?php

use amoni\classes\Autoload;

include LIB.'amoni'.DS.'classes'.DS.'Autoload.php';

$src = [
    LIB, RACINE, CONTROLER
];

$psr_4 = [

];

$autolaod = new Autoload($src, $psr_4);