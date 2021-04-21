<?php

$routes = [];

$routes[''] = "controlers:Main_Controler:index";
$routes['contact/?(.*)'] = "controlers:Main_Controler:contact";