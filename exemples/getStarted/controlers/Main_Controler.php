<?php
namespace controlers;

use amoni\classes\Controler;

class Main_Controler extends Controler
{
    public function index() {
        $this->render(VIEW.'accueil.php');
    }

    public function contact($nom = '') {
        $this->render(VIEW.'contact.php', ['nom'=>$nom]);
    }
}

