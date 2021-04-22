<?php
namespace amoni\fetch;

class Fetch
{
    protected $url;
    protected $session = false; // pour ne pas perdre la connexion courente
    protected $pathCookie = null;
    protected $error = null;
    protected $followLocation = true; // pour suivre les redirection
    protected $numReq = 0;

    public function __construct($url = null) {
        $this->url = $url;
    }

    public function get($url) {
        $curl = curl_init();

        $url = $this->getURL($url);

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_COOKIESESSION, true);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, $this->followLocation);
        
        if ($this->session) {

            if ($this->numReq == 0) {
                curl_setopt($curl, CURLOPT_COOKIEJAR, $this->pathCookie);

                $this->numReq++;
            } else {
                curl_setopt($curl, CURLOPT_COOKIEFILE, $this->pathCookie);
            }
        }

        $reponse = curl_exec($curl);
        
        curl_close($curl);

        return $this->returnReponse($reponse);
    }

    /**
     * @param {$file} array('name file', $_FILES['nameFile'])
     */
    public function post(string $url = null, array $post = null, array $file = null) {
        $curl = curl_init();

       $url = $this->getURL($url);

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_COOKIESESSION, true);
        curl_setopt($curl, CURLOPT_POST, true);
        //curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-type: multipart/form-data'));

        $form = $post;

        if ($file != null) {
            if ($file[1]['tmp_name'] != null) {
                $form[$file[0]] = $this->curlFile($file[1]);
            }
        }

        curl_setopt($curl, CURLOPT_POSTFIELDS, $form);

        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, $this->followLocation);
        
        if ($this->session) {

            if ($this->numReq == 0) {
                curl_setopt($curl, CURLOPT_COOKIEJAR, $this->pathCookie);

                $this->numReq++;
            } else {
                curl_setopt($curl, CURLOPT_COOKIEFILE, $this->pathCookie);
            }
        }

        $reponse = curl_exec($curl);
        
        curl_close($curl);

        return $this->returnReponse($reponse);
    }

    public function curlFile($file) {
        return new \CURLFile($file['tmp_name'], $file['type'], $file['name']);
    }

    protected function getURL($url) {
        if($url != null ) {
            return $url;
        } elseif ($this->url != null) {
            return $this->url;
        } else {
            return '';
        }
    }

    protected function returnReponse($reponse) {
        return $reponse;
    }

    public function newSession(string $pathCookie = null) {

        if ($pathCookie == null) {
            $pathCookie = 'cookie_session_rep_fetch_curl.txt';
            file_put_contents($pathCookie, '');
            
            if (!file_exists($pathCookie)) {
                $this->error = 'impossible de créer le fichier de session!';
                
                return false;
            }
        } elseif (!file_exists($pathCookie)) {
            $this->error = 'impossible de trouver le fichier pour la session!';
            
            return false;
        }

        $this->session = true;
        $this->pathCookie = $pathCookie;
        
        return true;
    }

    public function closeSession() {
        if ($this->pathCookie != null) {
            unlink($this->pathCookie);
            $this->pathCookie = null;
            $this->session = false;
            $this->numReq = 0;
        }
    }

    public function getError() {
        return $this->error;
    }

    public function setFollowLocation(bool $bool) {
        $this->followLocation = $bool; 
    }
}