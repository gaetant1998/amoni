var amoni_info = {
        version : '1.0.0' ,
        auteur : 'gomsu gaetant' ,
        mail : 'gomsugaetant24@gmail.com' ,
        web : 'https://www.amoni.com' ,
        description : 'ce framework est destiné a facilité la porgramation en js.'  
} ;

/***************************************************************************************** */
/**************** $ ELEMENT ******************************************************************* */

var $a = {
    /**
     * 
     * @param {string} select : fonctionne comme les sélecteur css
     */
    get : function(select, element=null){
        if(element){
            return element.querySelector(select) ;
        }
        return document.querySelector(select) ;
    },

    getall : function(select, element=null){
        if(element){
            return element.querySelectorAll(select) ;
        }
        return document.querySelectorAll(select) ;
    },

    get_parent : function(element, option=false){
        if(option){
            return $.get(element).parentNode ;
        }
        return element.parentNode ;
    },

    get_after : function(element, option = false){
        if(option){
            return $.get(element).nextSibling ;
        }
        return element.nextSibling ;
    },

    get_before : function(element, option = false){
        if(option){
            return $.get(element).previousSibling ;
        }
        return element.previousSibling ;
    },

    get_first : function(element, option = false, option2 = false){
        if(option2){
            if(option){
                return $.get(element).firstChild ;
            }
            return element.firstChild ;
        }else {
            if(option){
                return $.get(element).firstElementChild ;
            }
            return element.firstElementChild ;
        }
    } ,

    get_last : function(element, option = false, option2 = false){
        if(option2){
            if(option){
                return $.get(element).lastChild ;
            }
            return element.lastChild ;
        }else {
            if(option){
                return $.get(element).lastElementChild ;
            }
            return element.lastElementChild ;  
        }
    } ,

    add : function(elementToAdd, parentElement = document.body, option = false){
        if(option){
            $.get(parentElement).appendChild(elementToAdd) ;
            return this;
        }
        parentElement.appendChild(elementToAdd) ;
        return this;
    },

    add_after : function(elementToAdd, after_element, option = false){
        if(option){
            after_element = $.get(after_element);
            var parentElement = after_element.parentNode ;
        }else{
            var parentElement = after_element.parentNode ;
        }

        if(parentElement.lastChild === after_element)
        {
            // Si le dernierélément est le même que l'élément après lequel on veut insérer, il suffit de faire appendChild()
            parentElement.appendChild(elementToAdd) ;
            return this;
        }
        // Dans le cas contraire, on fait un insertBefore() surl'élément suivant
        parentElement.insertBefore(elementToAdd, after_element.nextSibling) ;
        return this;
    },

    add_before : function(elementToAdd, before_element, option = false){
        if(option){
            before_element = $.get(before_element);
            var parentElement = before_element.parentNode ;
        }else {
            var parentElement = before_element.parentNode ;
        }
        parentElement.insertBefore(elementToAdd, before_element) ;
        return this;
    },

    add_text : function(text, element, option = false, option2 = false){
        if(option2){
            if(option){
                $.get(element).innerText = text ;
                return this;
            }
            element.innerText = text ;
            return this;
        }
        if(option){
            $.get(element).innerText += text ;
            return this;
        }
        element.innerText += text ;
        return this;
    },

    add_html : function(html, element, option = false, option2 = false){
        if(option2){
            if(option){
                $.get(element).innerHTML = html ;
                return this;
            }
            element.innerHTML = html ;
            return this;
        }
        if(option){
            $.get(element).innerHTML += html ;
            return this;
        }
        element.innerHTML += html ; 
        return this;   
    },

    replace : function(newElement, oldElement, option = false){
        if(option){
            oldElement = $.get(oldElement);
            var parentElement = oldElement.parentNode ;
        }else {
            var parentElement = oldElement.parentNode ;
        }
        parentElement.replaceChild(newElement, oldElement) ;
        return this;
    },

    delete : function(elementToDelete, option = false){
        if(option){
            elementToDelete = $.get(elementToDelete) ;
            var parentElement = elementToDelete.parentNode ;
        }else {
            var parentElement = elementToDelete.parentNode ;
        }
        parentElement.removeChild(elementToDelete) ; 
        return this;       
    },

    create : function(Element, type = 'element'){
        if(type == 'element'){
            return document.createElement(Element) ;
        }
        
        if(type == 'text'){
            return document.createTextNode(Element) ;
        }      
    },

    createFragment : function(codeHtml){
        return document.createRange().createContextualFragment(codeHtml);
    },

    clone : function(element, option = false){
        var clone = element.cloneNode(option) ;
        return clone ;
    },

    type : function(element, option =  false){
        if(option){
            return $.get(element).nodeType ;
        }
        return element.nodeType ;
    },

}
var Class = {
    add : function(element, val_class, option=false){
        if(option){
            $.get(element).classList.add(val_class);
            return this;
        }
        element.classList.add(val_class);
        return this;
    },
    
    delete : function(element, val_cass, option=false){
        if(option){
            $.get(element).classList.remove(val_class);
            return this;
        }
        element.classList.remove(val_cass);
        return this;
    }
}

var attr = {
    set : function(name, value, element, option = false){
        if(option){
            $.get(element).setAttribute(name, value) ;
            return this; 
        }
        element.setAttribute(name, value) ;   
        return this;
    },

    get : function(name, element, option = false){
        if(option){
           return $.get(element).getAttribute(name) ;
        }
        return element.getAttribute(name) ;
    }
}

var style = {
    get : function(element, option = false){
        if(option){
           return getComputedStyle($.get(element), null) ;
        }
        return getComputedStyle(element, null) ;
    },

    get_offset : function(element){
        if(option){
           return getOffest($.get(element)) ;
        }
        return getOffest(element) ;
    }
}

/***************************************************************************************** */
/**************** AJAX ******************************************************************* */

var ajax = {
    /**
     * 
     * @param {string} url 
     * @param {string (text || json)} responsetype 
     * @param {boolean true || false} option 
     */
    get : function(url, responsetype='text', option=true){
        this.url = url ;
        this.responsetype = responsetype;
        this.option = option ;
        
        /**
         * @param {function(arg response)} success
         * @param {function(arg xhr)} error
         * @param {function(arg xhr)} wait
         */
        this.run = function(success, wait=null, error=null) {
            var xhr = new XMLHttpRequest() ;
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status >= 200 & xhr.status < 400){
                        success(xhr.response) ;    
                    }else {
                        if(error){
                            error(xhr) ;
                        }else {
                            console.log(xhr);
                        }
                    }
                }else {
                    if(wait){
                        wait(xhr) ;
                    }
                }
            }

            xhr.open('GET', this.url, this.option) ;
            xhr.setRequestHeader('Requested-xhr', 'xmlhttprequest');
            xhr.responseType = this.responsetype ;
            xhr.send() ;
        }
    },

    post : function(url, responsetype='text', option=true){
        this.url = url ;
        this.params = null;
        this.formdata = null;
        this.responsetype = responsetype;
        this.option = option ;

        this.run = function(success, wait=null, error=null) {
            var xhr = new XMLHttpRequest() ;
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status >= 200 & xhr.status < 400){
                        success(xhr.response) ;    
                    }else {
                        if(error){
                            error(xhr) ;
                        }else {
                            console.log(xhr);
                        }
                    }
                }else {
                    if(wait){
                        wait(xhr) ;
                    }else {
                        console.log('...');
                    }
                }
            }

            xhr.open('POST', this.url, this.option) ;
            xhr.responseType = this.responsetype ;
            xhr.setRequestHeader('Requested-xhr', 'xmlhttprequest');
            if(this.params){
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                xhr.send(this.params) ;
            }else if(this.formdata){
                xhr.send(this.formdata) ;
            }
        }

        this.set_params = function(params){
            this.params = params;
        }
        this.set_formdata = function(formdata, option=false){
            if(option){
                this.formdata = new FormData(formdata);
            }else {
                this.formdata = formdata;
            }
        }
    }
}


