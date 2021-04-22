<?php
namespace amoni\cache;

class Cache
{
    protected $dirname;
    protected $duration;
    protected $buffer;  // buffer = filename

    public function __construct(string $dirname, float $duration) {
        $this->dirname = $dirname;
        $this->duration = $duration;
    }

    public function write(string $filename, $content) {
        return file_put_contents($this->dirname.$filename, $content);
    }

    public function read(string $filename) {
        $file = $this->dirname.$filename;
       
        if (!file_exists($file)) {
            return false;
        }

        $fileTime = (time() - filemtime($file)) / 60;

        if ($fileTime > $this->duration) {
            return false;
        }

        return file_get_contents($file);
    }

    public function delete(string $filename) {
        $file = $this->dirname.$filename;

        if (!file_exists($file)) {
            return false;
        }

        unlink($file);
    }

    public function clear() {
        $files = glob($this->dirname.'*');

        foreach ($files as $file) {
            unlink($file);
        }
    }

    public function startBuffer() {
        ob_start();
    }

    public function getBuffer() {
        return ob_get_clean();
    }

    public function start(string $filename) {
        if ($content = $this->read($filename)) {
            echo $content;
            $this->buffer = false;
            return true; // on retourne true pour signifier que le contenu est déja en cache et a été afficher
        } else {
            $this->buffer = $filename;            
        }

        ob_start();
        return false;
    }

    public function end() {
        if (false === $this->buffer) {
            ob_end_clean();
        } else {
            echo $content = ob_get_clean();
        
            $this->write($this->buffer, $content);            
        }

    }
}