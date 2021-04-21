<?php
namespace amoni\classes;
/**
 * 
 */
abstract class Entity 
{

    public function __construct(array $arrayDatas = []) {
        $this->hydratate($arrayDatas);
    }

    protected function hydratate($arrayDatas) {
        foreach ($arrayDatas as $key => $value) {
            $method = 'set'.ucfirst($key);

            if (method_exists($this, $method)) {
                $this->$method($value);
            }
        }
    }
    
}