<?php

use amoni\classes\Autoload;

include LIB.'amoni'.DS.'classes'.DS.'Autoload.php';

$src = [
    LIB
];

$psr_4 = [

];

$autolaod = new Autoload($src, $psr_4);