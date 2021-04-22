<?php
namespace amoni\classes;

use PDO;
/**
 * 
 */
class PDOconnec
{
    static $pdo = null;
    protected $host;
    protected $db;
    protected $root = 'root';
    protected $password = '';
    protected $option = null;

    public function __construct($host, $db, $root = 'root', $password = '', $option = null) {
        $this->host = $host;
        $this->db = $db;
        $this->root = $root;
        $this->password = $password;
        $this->option = $option;

    }

    public function mysql() {
        if (!self::$pdo) {
            self::$pdo = new PDO("mysql:host=".$this->host."; dbname=".$this->db, $this->root, $this->password, $this->option);
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }
        return self::$pdo;
    }
}