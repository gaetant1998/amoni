<?php
namespace amoni\router;

/**
 *  
 */
class Router 
{
    protected $routes = [];
    protected $appRoot;

    public function __construct(string $appRoot, array &$routes = []) {
        $this->routes = $routes;
        $this->appRoot = $appRoot;//chemin vers la racine du site
    }

    public function run($req = '') {
        
        foreach ( $this->routes as $key => $route) {
            if (preg_match('#^'.$key.'$#isU', $req, $matches) ) {
                
                $infos  = explode(':', $route, 3);
                $path   = $infos[0];
                $nameCallBack   = $infos[2];

                $nameControler  = $path.'\\'.$infos[1];
     
                $controler = new $nameControler();
                
                array_shift($matches);
                
                if (method_exists($controler, $nameCallBack)) {
                    call_user_func_array([$controler, $nameCallBack], $matches);
                }   else {
                    throw new \Exception("<h1>la méthode '$nameCallBack' n'existe pas dans '$nameControler' </h1>", 1);
                }

                return 0;
            }
        }

        throw new \Exception("<h1>ressource introuvable : '$req' </h1>", 1);
    }

    public function addRoute(array $route) {
        if (!array_key_exists('req', $route)) {
            return false;
        }

        if (!array_key_exists('path', $route)) {
            return false;
        }

        if (!array_key_exists('controler', $route)) {
            return false;
        }

        if (!array_key_exists('action', $route)) {
            return false;
        }
        
        $this->routes[] = $route;
        return $this;
    }

    public function addRoutes(array $routes) {
        foreach ($routes as $route) {
            $this->addRoute($route);
        }

        return $this;
    }

}