<?php
namespace amoni\classes;

abstract class Controler 
{

    protected function render (string $tmpl, array $vars = null) {
        if ($vars != null) {
            extract($vars);
        }

        include $tmpl;
    }
}