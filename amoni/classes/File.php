<?php
namespace amoni\classes;

class File
{
    static $errors = array();
    static $error = "";

    static function delete($path_file) {
        if (file_exists($path_file)) {
            if (is_file($path_file)) {
                unlink($path_file);
                return true;
            }
        }
        self::$errors[] = "ceci n'est pas un fichier!";
        return false;    
    }

    /**
     * permet de télécharger une ressource
     * @param FILES $file le fichier à télécharger
     * @param string $dest le chemin ou elle sera stocker
     * @param int [option, $tail] la taille autoriser
     * @param array [option, $extention]  les extension autoriser 
     * 
     * @return 0 si il y a une erreur
     * @return 1 si la taille est on valide
     * @return 2 si l'extention est non valide 
     * @return 3 si le fichiers existe déjà
     * @return 4 si tout c'est bien passer
     */

    static function uploaded(array $file, string $dest, $tail = NULL, array $extension = array(), string $finalName = null) { 
        $name  = $file['name'];
        $tmp   = $file["tmp_name"];

        $info = pathinfo($file["name"]);
        $file_extension = $info["extension"];

        if($file["error"] != 0) {
            self::$error = 'impossible de traiter le fichier '.$name;
            return false;
        }

        if (!is_null($tail)) {
            if($file["size"] > $tail) {
                self::$error = 'la taille du fichier : '.$name.' est supérieur au poids max : '.$tail; 
                return false;
            }
        }

        if(is_array($extension) and  count($extension) > 0) {
            if(!in_array($file_extension, $extension)) {
                self::$error = 'l\'extension du fichier '.$name.' n\'est pas prise en charge !';
                return false;
            }
        } 

        if ($finalName != null) {
            $final_dest = $dest.$finalName.'.'.$file_extension;
        } else {
            $final_dest = $dest.basename($name);
        }

        if(file_exists($final_dest)) {
            self::$error = 'le fichier '.$name.' existe déjà';
            return false;
        }
        
        if(move_uploaded_file($tmp, $final_dest)) {
            return true;
        }

        self::$error = 'impossible d\enregistrer la ressource '.$name.' pour le moment!';
        return false;
    }

    static function multi_uploaded($files, $dest, $tail = NULL, array $extension = array()) {
        $errors = array();
        $success = array();
        /**
         *  on parcours chaque item du sous tableau error du tableau $files
         *  et on vérifie que le $files['error'][$key] == 0 sinon on défini
         *  une erreur et on continu à l'iération suivante .
         */
        foreach ($files['error'] as $key => $error) {
            $name = $files['name'][$key];
            $tmp  = $files["tmp_name"][$key];
            
            if($error != 0) {
                $errors[$name] = 'erreur : '.$error.' impossible de charger le fichier!' ;
                continue;
            }
    
            if (!is_null($tail)) {
                /**
                 * si une taille max est défini alors :
                *  on vérifie ensuite que le size vérifie la valeur entrer dans 
                *  l'argument tail de la fonction. sinon on défini
                *  une erreur et on continu à l'iération suivante .
                */
                if($files["size"][$key] > $tail) {
                    $errors[$name] = 'la taille du fichier est suppérieur au poids max :'.$tail.'octets' ;
                    continue;
                }
            }
    
            if(is_array($extension) and  count($extension) > 0) {
                $info = pathinfo($name);
                echo $file_extension = $info["extension"];
                //die();
                /**
                 *  si des extension son définis alors on vérifie que l'extension
                 *  du fichier files['name'][$key] vérifie l'un des extension sinon on défini
                 *  une erreur et on continu à l'iération suivante .
                 *  
                 */
                if(!in_array($file_extension, $extension)) {
                    $errors[$name] = "cette extension n'est pas prise en charges !";
                    continue;
                }
            } 
            /**
             * si le fichier existe déjà on passe au fichier suivant.
             */
            $final_dest = $dest.basename($name) ;
            
            if(file_exists($final_dest)) {
                $errors[$name] = 'le fichier existe déjà !' ;
                continue ;
            }
            /**
            *  si l'enregistrement de la ressource se passe bien on defini 
            *  un messag de succès
            */
            if(move_uploaded_file($tmp, $final_dest)) {
                $success[$name] = 'ok';
            }else {
                $errors[$name] = 'impossible de téléchargé la ressource pour le moment!';
            }    
        }
        /**
         *  on retourne les éventuels messages d'erreurs et de succes
         */
        return array($errors, $success);
    }

    static function download($file, $name = NULL) {
        if(!is_null($name)) {
            $basename = $name;
        }else {
            $basename = basename($file);
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
        header('content-length:'.filesize($file));
        readfile($file); 
    }

    static function create($filename) {
        $file = fopen($filename, 'a') ;
        fseek($file, 0);
        fputs($file, '');
        fclose($file);
    }

    static function read($filename, $br = null) {
        if(file_exists($filename)) {
            $file = fopen($filename, 'r');
            $content = '';
            $test = fgets($file);
            
            while ($test) {
                $content .= $test;
                $test = fgets($file);
            }
            fclose($file);

            if($br == 'br') {
                return nl2br($content);
            }
            return $content;
        }

    }

    static function readAll() {
        
    }

    static function write($filename, $content, $mode = null , $fseek = null) {
        
        if (!is_null($mode) and $mode == 'end') {
            $file = fopen($filename, 'a');    
        }else {
            $file = fopen($filename, 'r+');
    
            if(!is_null($fseek) and is_int($fseek)) {
                fseek($file, $fseek) ;
            }
        }
        fputs($file, $content);
        fclose($file);
    }

    static function get_error() {
        return self::$error;
    }
    
}