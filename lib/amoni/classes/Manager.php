<?php
namespace amoni\classes;
use PDO;
/**
 * 
 */
class Manager extends PDO
{
    protected $pdo;

    public function __construct(array $db = [], $sgbd = 'mysql') {

        $host = (isset($db['host']))? $db['host'] : "localhost";
        $dbname = (isset($db['dbname']))? $db['dbname'] : "phpmyadmin";
        $root = (isset($db['root']))? $db['root'] : "root";
        $password = (isset($db['password']))? $db['password'] : "";
        $option = (isset($db['option']))? $db['option'] : null;

       $pdo = new PDOconnec($host, $dbname, $root, $password, $option); 
    
       if ($sgbd == 'mysql') {
            $this->pdo = $pdo->mysql();
       }

       $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }

    

    public function get(string $table, $SQL = null, $select = '*') {
        $sql = " select $select from $table ";

        if ($SQL) {
            $sql .= $SQL;
        }

        $q = $this->pdo->query($sql);
        
        return $q->fetch();
    } 


    public function read(string $table, $SQL = null, $select = '*') {
        $sql = " select $select from $table ";

        if ($SQL) {
            $sql .= $SQL;
        }

        $q = $this->pdo->query($sql);
        
        return $q->fetchAll();
    } 

    public function insert(string $table, array $vals) {
        $sql = " insert into $table ";
        $cols = " ( ";
        $values = " ( ";

        $i = 0;

        foreach ($vals as $k => $v) {
            if($i == 0) {
                $cols .= " $k ";
                $values .= " :$k ";    
                $i++;
                continue;
            }

            $cols .= " , $k ";
            $values .= " , :$k ";
        }

        $sql .= $cols.' ) values '.$values.' ) ';
        
        $q = $this->pdo->prepare($sql);
        $q = $q->execute($vals);

        return $q;
    }

    public function update(string $table, array $vals, $where = '0', $limit = '1') {
        $sql = " update $table set ";

        $i = 0;

        foreach ($vals as $k => $v) {
            if($i == 0) {
                $sql .= " $k=:$k ";
                $i++;
                continue;
            }

            $sql .= " , $k=:$k where $where limit $limit ";
        }
        
        $q = $this->pdo->prepare($sql);
        $q = $q->execute($vals);

        return $q;

    }

    public function delete(string $table, $where = '0', $limit = 1) {
        $sql = " delete from $table where $where limit $limit ";

        $q = $this->pdo->exec($sql);

        return $q;

    }

}