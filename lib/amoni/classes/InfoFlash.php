<?php
namespace amoni\classes;

class InfoFlash
{

    static function get_info() {
        if (isset($_SESSION["infoFlash"])) {
            echo $_SESSION["infoFlash"];

            unset($_SESSION["infoFlash"]);
        }
    }

    static function set_info($msg, $class = "alert-info ") {
        $_SESSION["infoFlash"] = "<div class='$class p-3 alert  text-center info-flash'> $msg </div>" ; 
    }
}