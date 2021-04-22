<?php
namespace amoni\classes;

class Upload 
{
    protected $file = [];
    protected $destination = "";
    protected $error = "";
    protected $errorCode = null;
    protected $extensions = [];
    protected $size = null;
    protected $name = null;
    protected $extension = "";
    protected $replace = false;

    public function __construct(array $file, string $destination) {
        $this->file = $file;
        $this->destination = $destination;

        $this->_getExtension();

    }

    public function upload(bool $replace = false) {
        $this->replace = $replace;

        if(!$this->fileIsOk()) {
            return false;
        }

        if(!$this->sizeIsOK()) {
            return false;
        }

        if(!$this->extensionIsOk()) {
            return false;
        }

        if(!$this->move_file()) {
            return false;
        }

        return true;
    }

    protected function _getExtension() {
        $info = pathinfo($this->file['name']);
        $this->extension = $info["extension"];
    }

    protected function move_file() {
        $tmp   = $this->file["tmp_name"];
        $name = basename($this->file['name']);

        if ($this->name != null) {
            $name = $this->name.'.'.$this->extension;
        }

        if(file_exists($name)) {
            if($this->replace) {

            } else {
                $this->error = "le fichier existe déjà ";
                $this->errorCode = 3;
                return false;
            }
        }

        if(move_uploaded_file($tmp, $this->destination.$name)) {
            return true;
        }
        
        $this->error = "échec de l'upload ";
        $this->errorCode = 4;

        return false;
    }

    protected function extensionIsOk() {
        
        if(empty($this->extensions)) {
            return true;  
        }

        foreach ($this->extensions as $value) {
            if ( strtoupper($value) == strtoupper($this->extension)) {
                return true;
            }
        }

        $this->error = "l'extension n'est pas pris en charge!";
        $this->errorCode = 2;
        return false;
    }

    protected function sizeIsOk() {
        if($this->size == null) {
            return true;
        }


        if($this->size >= $this->file['size'] ) {
            return true;
        } 

        
        $this->error = "la taille du ficher n'est pas autoriser ";
        $this->errorCode = 1;
        return false;
    }

    protected function fileIsOk() {
        if($this->file['error'] == 0) {
            return true;
        }

        $this->error = "impossible de charger le fichier ";
        $this->errorCode = 0;
        return false;
    }

    public function setExtensions(array $extensions) {
        $this->extensions = $extensions;
    }

    public function setSize(int $size) {
        $this->size = $size;
    }

    public function setName(string $name) {
        $this->name = $name;
    }

    public function getError() {
        return $this->error;
    }

    public function getExtension() {
        return $this->extension;
    }

    public function getErrorCode() {
        return $this->errorCode;
    }

    public function getSize() {
        return $this->file['size'];
    }

    public function getName() {
        return $this->file['name'];
    }
}