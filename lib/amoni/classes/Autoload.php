<?php
namespace amoni\classes;
/**
 * 
 */

class Autoload
{
    protected $racineLoaders = null;
    protected $paths;
    
    public function __construct(array $racineLoaders, array $paths = []) {
        $this->racineLoaders = &$racineLoaders;
        $this->paths = &$paths;

        $this->start_autoload();
    }

    protected function autoload($className) {

        $racineLoaders = &$this->racineLoaders;
        $find = false;
        
        foreach($racineLoaders as $racine) {
            if (file_exists($racine.$className.'.php')) {
                include_once $racine.$className.'.php';
                $find = true;
                break;
            } 
        }  

        if (!$find) {
            if (key_exists($className, $this->paths)) {
                include_once $this->paths[$className].'.php';
            } else {
                foreach($racineLoaders as $racine) {
                    echo "<br>impossible de trouver la classe ".$racine.$className.'.php<br/>';
                }
            }
        }
    }
    
    protected function start_autoload() {
        spl_autoload_register([$this, 'autoload']);
    }
}