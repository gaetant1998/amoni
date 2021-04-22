var scroll_observer = function(name_elements_to_observe, options={}){
    
    this.name = name_elements_to_observe;
    this.options  = Object.assign({},{
        ratio : .3,
        root  : null,
        rootMargin : '0',
        duration : 2,
        translate : 'x',
        translate_init : '50',
        visible : true
    },options);
    
    this.run = function(){

        this.set_style();
        this.observe();
    
    }

    this.set_style = function(){

        if(this.options.translate === 'x'){
            var translate = 'translatex';
        }else {
            var translate = 'translateY';
        }

        var style = "\
        <style>\
            ."+this.name+"-observe-hidden {\
                opacity: 0;\
                transform: "+translate+"("+this.options.translate_init+"px);\
                transition: "+this.options.duration+"s\
            }\
            ."+this.name+"-observe-visible{\
                opacity: 1;\
                transform: "+translate+"(0px);\
                transition: "+this.options.duration+"s\
            }\
            @media (prefers-reduced-motion: reduce) {\
                ."+this.name+"-observe-hidden {\
                    opacity: 1;\
                    transform: "+translate+"(0px);\
                }\
                ."+this.name+"-observe-visible{\
                    transition: 0s\
                }\
            }\
        </style>";

        $.add_html(style,'body',true);
    }
    
    this.observe = function(){
        var elements = $.getall('.'+this.name);
        var  visible = this.options.visible;
        var  name    =  this.name;
        var ratio = this.options.ratio;
        var root = this.options.root;
        var rootMargin = this.options.rootMargin;

        elements.forEach(element => {
            Class.add(element, name+'-observe-hidden');
        }); 
                
        var option = {
            root       : root, //zone d'affichage
            rootMargin : rootMargin+'px',//marge pour etre visible
            threshold  : ratio //a parti de quelle moment l'élément doit etre visible
        }

        var calback = function(entries, observer){
            entries.forEach(entry => {
                if(entry.intersectionRatio > ratio){
                    Class.add(entry.target, name+'-observe-visible');
                    Class.delete(entry.target, name+'-observe-hidden');
                    if(visible){
                        observer.unobserve(entry.target);
                        Class.delete(entry.target, name+'-observe-hidden');
                    }
                }else {
                    Class.add(entry.target, name+'-observe-hidden');
                    Class.delete(entry.target, name+'-observe-visible');
                }
            });
        }//end function callback
        var observer = new IntersectionObserver(calback, option) ;
        elements.forEach(element => {
            observer.observe(element);            
        });
    }

    this.show_option = function(){
        return this.options;
    }
}//end function observer
