
function $(query = null){

    var element = query;
            
    return {

        get : function(container = null){
            if(container === null){
                element = document.querySelector(query);
                return element;
            }

            element = container.querySelector(query);
            return element;
        },

        getall : function(container = null){
            if(container === null){
                element = document.querySelectorAll(query);
                return element;
            }

            element = container.querySelectorAll(query);
            return element;
        },

        parent : function(option=false){
            if(!option){
                return element.parentNode ;
            }
            return $(query).get().parentNode ;
        },

        next : function(option = false){
            if(!option){
                return element.nextSibling ;
            }
            return $(query).get().nextSibling ;
        },
        
        prev : function(option = false){
            if(!option){
                return element.previousSibling ;
            }
            return $(query).get().previousSibling ;
        },

        first : function(option = false, option2 = false){
            if(!option2){
                if(!option){
                    return element.firstElementChild ;
                }
                return $(query).get().firstElementChild ;
            }else {
                if(!option){
                    return element.firstChild ;
                }
                return $(query).get().firstChild ;
            }
        } ,
        
        last : function(option = false, option2 = false){
            if(option2){
                if(option){
                    return $(query).get().lastChild ;
                }
                return element.lastChild ;
            }else {
                if(option){
                    return $(query).get().lastElementChild ;
                }
                return element.lastElementChild ;  
            }
        } ,

        add : function(elementToAdd, option = false){
            if(!option){
                element.appendChild(elementToAdd) ;
                return this;
            }
            $(query).get().appendChild(elementToAdd) ;
            return this;
        },
        
            // ici element === after element
        after : function(elementToAdd, option = false){
            if(option){
                element = $(query).get();
                var parentElement = element.parentNode ;
            }else{
                var parentElement = element.parentNode ;
            }
        
            if(parentElement.lastChild === element)
            {
             // Si le dernierélément est le même que l'élément après lequel on veut insérer, il suffit de faire appendChild()
            parentElement.appendChild(elementToAdd) ;
            return this;
            }
            // Dans le cas contraire, on fait un insertBefore() surl'élément suivant
            parentElement.insertBefore(elementToAdd, element.nextSibling) ;
            return this;
        },
        
        before : function(elementToAdd, option = false){
            if(option){
                element = $(query).get();
                var parentElement = element.parentNode ;
            }else {
                var parentElement = element.parentNode ;
            }
            parentElement.insertBefore(elementToAdd, element) ;
            return this;
        },

        text : function(text, option = false, option2 = false){
            if(option2){
                if(!option){
                    element.innerText = text ;
                    return this;
                }
                $(query).get().innerText = text ;
                return this;
            }

            if(!option){
                element.innerText += text ;
                return this;
            }
            $(query).get().innerText += text ;
            return this;
        },
        
        html : function(html, option = false, option2 = false){
            if(option2){
                if(!option){
                    element.innerHTML = html ;
                    return this;
                }
                $(query).get().innerHTML = html ;
                return this;
            }
            if(!option){
                element.innerHTML += html ; 
                return this;
            }
            $(query).get().innerHTML += html ;
            return this;
        },

            
        replace : function(newElement, option = false){
            if(option){
                element = $(query).get();
                var parentElement = element.parentNode ;
            }else {
                var parentElement = element.parentNode ;
            }
            parentElement.replaceChild(newElement, element) ;
            return this;
        },

        remove : function(option = false){
            if(option){
                element = $(query).get() ;
                var parentElement = element.parentNode ;
            }else {
                var parentElement = element.parentNode ;
            }
            parentElement.removeChild(element) ; 
            return this;       
        },

        create : function(options={}, content=null){
            var options = Object.assign({}, {
                type : 'element',
                id : null,
                classname : null
            }, options);

            if(options.type == 'element'){
                element =  document.createElement(query) ;
                    
                if(options.id){
                    element.id = options.id;
                }

                if(options.classname){
                    element.className = options.classname;
                }

                if(content){
			element.innerHTML = content;
		    }
                return element;
            }
                
            if(options.type == 'text'){
                return document.createTextNode(query) ;
            }      
        },

        fragment : function(){
            return document.createRange().createContextualFragment(element);
        },
        
        clone : function(option = false){
            return element.cloneNode(option) ;
        },
        
        type : function(){
            return element.nodeType ;
        },
        
        log : function(){
            console.log(element);
            return this;
        } 

    }

}

function attr(element){
    return {
        set : function(name, value){
           element.setAttribute(name, value) ;
           return this;
        },

        get : function(name){
            return element.getAttribute(name);
        },

	    remove : function(name){
	        element.removeAttribute(name);
	        return this;	
	    }
    }
}

function style(element){
    return {
        width : function(width=null){
            if(width){
                element.style.width = width;
                return this;
            }
            return getComputedStyle(element, null).width;
        },

        height : function(height=null){
            if(height){
                element.style.height = height;
                return this;
            }
            return getComputedStyle(element, null).height;
        },

        Width : function(){
            return element.offsetWidth;
        },

        Height : function(){
            return element.offsetHieght;
        },

        top : function(top=null){
            if(top){
                element.style.top = top;
                return this;
            }
            return element.offsetTop;
        },

        bottom : function(bottom){
            if(bottom){
                element.style.bottom = bottom;
                return this;
            }
            return element.offsetBottom;
        },

        left : function(left){
            if(left){
                element.style.left = left;
                return this;
            }
            return element.offsetLeft;
        },

        right : function(right){
            if(bottom){
                element.style.right = right;
                return this;
            }
            return element.offsetRight;
        },

        Top : function(){
            return element.getBoundingClientRect().top;
        },

        Bottom : function(){
            return element.getBoundingClientRect().bottom;
        },

        Left : function(){
            return element.getBoundingClientRect().left;
        },

        Right : function(){
            return element.getBoundingClientRect().right;
        },

        position : function(position=null){
            if(position){
                element.style.position = position;
                return this;
            }
            return getComputedStyle(element, null).position;
        },

        display : function(display=null){
            if(display){
                element.style.display = display;
                return this;
            }
            return getComputedStyle(element, null).display;
        }
    }
}

function Class(element){
    return {
        add : function(name){
            element.classList.add(name);
        },

        remove: function(name){
            element.classList.remove(name);
        }
    }
}

function event(element){
    return {
        click : function(callback){
            element.addEventListener('click', callback);
        },

        dblclick : function(callback){
            element.addEventListener('dblclick', callback);
        },

        mouseover : function(callback){
            element.addEventListener('mouseover', callback);
        },

        mouseout : function(callback){
            element.addEventListener('mouseout', callback);
        },

        mousedown : function(callback){
            element.addEventListener('mousedown', callback);
        },

        mouseup : function(callback){
            element.addEventListener('mouseup', callback);
        },

        mousemove : function(callback){
            element.addEventListener('mousemove', callback);
        },

        keyup : function(callback){
            element.addEventListener('keyup', callback);
        },

        keydown : function(callback){
            element.addEventListener('keypress', callback);
        },

        keypress : function(callback){
            element.addEventListener('keypress', callback);
        },

        focus : function(callback){
            element.addEventListener('focus', callback);
        },

        blur : function(callback){
            element.addEventListener('blur', callback);
        },

        select : function(callback){
            element.addEventListener('select', callback);
        },

        resize : function(callback){
            element.addEventListener('resize', callback);
        },

        change : function(callback){
            element.addEventListener('change', callback);
        },

        submit : function(callback){
            element.addEventListener('submit', callback);
        },

        reset : function(callback){
            element.addEventListener('reset', callback);
        }
    }
}

function revent(element){

    return {
        click : function(callback){
            element.removeEventListener('click', callback);
        },

        dblclick : function(){
            element.removeEventListener('dblclick', callback);
        },

        mouseover : function(callback){
            element.removeEventListener('mouseover', callback);
        },

        mouseout : function(callback){
            element.removeEventListener('mouseout', callback);
        },

        mousedown : function(callback){
            element.removeEventListener('mousedown', callback);
        },

        mouseup : function(callback){
            element.removeEventListener('mouseup', callback);
        },

        mousemove : function(callback){
            element.removeEventListener('mousemove', callback);
        },

        keyup : function(callback){
            element.removeEventListener('keyup', callback);
        },

        keydown : function(callback){
            element.removeEventListener('keypress', callback);
        },

        keypress : function(callback){
            element.removeEventListener('keypress', callback);
        },

        focus : function(callback){
            element.removeEventListener('focus', callback);
        },

        blur : function(callback){
            element.removeEventListener('blur', callback);
        },

        select : function(callback){
            element.removeEventListener('select', callback);
        },

        resize : function(callback){
            element.removeEventListener('resize', callback);
        },

        change : function(callback){
            element.removeEventListener('change', callback);
        }
    }
}

function ajax(url, events={}, async = true){
    events = Object.assign({}, {
        load : null,        //lorsque la requette  a bien été reussi et renvoi la reponse
        loadstart : null,  //lorsque la requette est fini
        loadend : null,    // lorsque la requette est abandonné
        abort : null,      //lorsque la requette a rencontrer une erreur
        error : null,      //evênement qui donnes la progression de la requette 
        timout : null,
        progress : null    //evênement qui donnes la progression de la requette 
    }, events);

    return {
        get : function(type, timout=null){
            var xhr = new XMLHttpRequest() ;
            
            if(events.progress){
                xhr.addEventListener('progress', (e)=>{
                    events.progress(e.loaded, e.total);
                })
            }

            if(events.loadstart){
                xhr.onloadstart = ()=>{
                    events.loadstart(xhr);
                }  
            }

            if(events.abort){
                xhr.onabort = ()=>{
                    events.abort(xhr);
                }  
            }

            if(events.timout){
                xhr.ontimeout = ()=>{
                    events.timout(xhr);
                }  
            }

            xhr.onload = ()=>{
                if(xhr.status === 200){
                    if(events.load){
                        events.load(xhr.response);
                    }
                }else{
                    if(events.error){
                        events.error(xhr.response, xhr.status, xhr);
                    }
                }
            }

            if(events.loadend){
                xhr.onloadend = ()=>{
                    events.loadend(xhr);
                }  
            }

            xhr.open('GET', url, async) ;
            xhr.setRequestHeader('Requested-xhr', 'xmlhttprequest');
            
            if(async){
                if(timout){
                    xhr.timeout = 1000;
                }
                xhr.responseType = type ;
            }
            xhr.send() ;

        },

        post : function(options={}, data=null){
            options = Object.assign({}, {
                type : 'text',
                timeout: null,
                formdata: false,
                params : null
            }, options);

            var xhr = new XMLHttpRequest() ;
            
            if(events.progress){
                xhr.addEventListener('progress', (e)=>{
                    events.progress(e.loaded, e.total);
                })
            }

            if(events.loadstart){
                xhr.onloadstart = ()=>{
                    events.loadstart(xhr);
                }  
            }

            if(events.abort){
                xhr.onabort = ()=>{
                    events.abort(xhr);
                }  
            }

            if(events.timout){
                xhr.ontimeout = ()=>{
                    events.timout(xhr);
                }  
            }

            xhr.onload = ()=>{
                if(xhr.status === 200){
                    if(events.load){
                        events.load(xhr.response);
                    }
                }else{
                    if(events.error){
                        events.error(xhr.response, xhr.status, xhr);
                    }
                }
            }
            
            if(events.loadend){
                xhr.onloadend = ()=>{
                    events.loadend(xhr);
                }  
            }

            xhr.open('POST',url, async) ;
            xhr.responseType = options.type ;
            xhr.setRequestHeader('Requested-xhr', 'xmlhttprequest');
            if(options.params){
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                xhr.send(options.params) ;
            }else if(data){
                if(options.formData){
                    data = new FormData(data);
                }
                xhr.send(data) ;
            }
        }
    }
}