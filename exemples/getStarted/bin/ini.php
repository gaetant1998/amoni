<?php

define('DS', DIRECTORY_SEPARATOR);
define('LIB', dirname(dirname(dirname(__DIR__))).DS.'lib'.DS); // c:\path\amoni\lib\ c'est le dossier ou ce trouvre nos bibiothèque peut importe ou il peut se trouver l-important c'est de bien définir le chemin vers ce dossier
define('RACINE', dirname(__DIR__).DS);
define('CONTROLER', RACINE.'controlers'.DS);
define('VIEW', RACINE.'views'.DS);
define('HOST', $_SERVER['HTTP_HOST']);
define('RACINE_DOMAINE', 'http://'.HOST.'/github/amoni/');
define('DOMAINE', RACINE_DOMAINE.'exemples/getStarted/');
define('STYLE', RACINE_DOMAINE.'lib/amoni_js_css/style.css');

include 'autoload.php'; // il contient le script qui va charger nos différentes classes automatiquement

include 'routes.php';