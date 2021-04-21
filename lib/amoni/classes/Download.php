<?php
namespace amoni\classes;

class Download 
{
    protected $file = "";

    public function __construct($pathFile) {
        $this->file = $pathFile;
    }

    public function download($name = NULL) {
        if(!file_exists($this->file)) {
            return false;
        }

        if(!is_null($name)) {
            $basename = $name;
        }else {
            $basename = basename($this->file);
        }

        header('pragma: public');
        header('expires: 0');
        header('cache-control: must-revalidate,post-check=0,pre-check=0');
        header('content-type: application/force-download');
        header('content-type: application/octet-stream');
        header('content-type: application/download');
        header('content-disposition: attachement');
        header('content-disposition: filename='.$basename.';');
        header('content-transfer-encoding:binary');
        header('content-length:'.filesize($this->file));
        readfile($this->file);
        
        return true;
    }

}