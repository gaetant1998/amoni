<?php
namespace amoni\classes;
/**
 * 
 */

class Autoload
{
    protected $racineLoaders = null;
    protected $psr_4;
    public function __construct(array $racineLoaders, array $psr_4 = []) {
        $this->racineLoaders = &$racineLoaders;
        $this->psr_4 = &$psr_4;

        $this->start_autoload();
    }

    protected function autoload($className) {

        $racineLoaders = &$this->racineLoaders;
        $find = false;
        
        foreach($racineLoaders as $racine) {
            if (file_exists($racine.$className.'.php')) {
                require $racine.$className.'.php';
                $find = true;
                break;
            } 
        }  

        if (!$find) {
            if (key_exists($className, $this->psr_4)) {
                require $this->psr_4[$className].'.php';
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