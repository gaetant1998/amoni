<?php
namespace amoni\validator;

/**
 * 
 */
class FormValidator
{
    protected $form;
    protected $errors = [];

    public function __construct(array &$form) {
        $this->form = $form;
    }

    public function validate(array $rules) {

        foreach ($rules as $name => $rule) {
            if (array_key_exists($name, $this->form)) {
                foreach ($rule as $key => $value) {
                    switch ($key) {
                        case 'required':
                            $this->required($name, $value);
                            break;
                        case 'strmin':
                            $this->strmin($name, $value);
                            break;
                        case 'strmax':
                            $this->strmax($name, $value);
                            break;
                        case 'numeric':
                            $this->numeric($name, $value);
                            break;
                        case 'value':
                            $this->value($name, $value);
                            break;
                        case 'regex':
                            $this->regex($name, $value);
                            break;
                        default:
                            
                            break;
                    }

                }
            }
        }
    }

    public function getErrors() {
        return $this->errors;
    }

    protected function required($nameChamp, array $rule) {
        $champ = trim($this->form[$nameChamp]);

        if ($rule[0] == true) {
            if (empty($champ) || is_null($champ)) {
                $this->errors[] = (isset($rule[1]))? $rule[1]: 'le champ '.$nameChamp.' ne peut pas être null!';
            }
        }
    }

    protected function strmin($nameChamp, array $rule) {
        $champ = trim($this->form[$nameChamp]);

        if (strlen($champ) < (int)$rule[0]) {
            $this->errors[] = (isset($rule[1]))? $rule[1]: 'le champ '.$nameChamp.' doit comporter au moins '.$rule[0].' caractères!';
        }
    }

    protected function strmax($nameChamp, array $rule) {
        $champ = trim($this->form[$nameChamp]);

        if (strlen($champ) > (int)$rule[0]) {
            $this->errors[] = (isset($rule[1]))? $rule[1]: 'le champ '.$nameChamp.' doit comporter au plus '.$rule[0].' caractères!';
        }
    }

    protected function numeric($nameChamp, array $rule) {
        $champ = trim($this->form[$nameChamp]);
        
        if ($rule[0] == false) {
            return 0;
        }

        if (!is_numeric($champ)) {
            $this->errors[] = (isset($rule[1]))? $rule[1]: 'la valeur du champ '.$nameChamp.' doit être numerique!';
        }
    }

    protected function value($nameChamp, array $rule) {
        $champ = trim($this->form[$nameChamp]);

        if (!($champ == $rule[0])) {
            $this->errors[] = (isset($rule[1]))? $rule[1]: 'la valeur du champ '.$nameChamp.' doit être = '.$rule[0].'!';
        }
    }

    protected function valideEmail($nameChamp, array $rule) {
        $champ = trim($this->form[$nameChamp]);

        if ($rule[0] == false) {
            return 0;
        }

        if (filter_var($champ, FILTER_VALIDATE_EMAIL)) {
            $this->errors[] = (isset($rule[1]))? $rule[1]: 'la valeur du champ '.$nameChamp.' doit être numerique!';
        }
    }

    protected function regex($nameChamp, array $rule) {
        $champ = trim($this->form[$nameChamp]);

        if (!preg_match($rule[0], $champ)) {
            $this->errors[] = (isset($rule[1]))? $rule[1]: 'la valeur du champ '.$nameChamp.' ne vérifie pas l\'expression regex : '.$rule[0].'!';
        }
    }
}
