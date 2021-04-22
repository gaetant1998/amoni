
var spoilers = function(options, classname = '.spoiler'){
    $(classname).getall().forEach(element => {
        new Spoiler(element, options);
    });
}

class Spoiler{
    constructor(element, options={}){
        this.spoiler = element;
        this.btn_spoiler = null;
        this.width = element.style.width;
        this.height = element.style.height;
        this.display = getComputedStyle(element).display;
        this.options = Object.assign({}, {
            textSpoiler : 'voir le spoiler',
            classname_btn : 'btn-spoiler',
            classname_visible : 'spoiler-visible',
            classname_hidden : 'spoiler-hidden',
            set_style : true,
	    display : null
        }, options);

        this.createElements();
        event(this.btn_spoiler).click(this.openSpoiler.bind(this));
    }

    createElements(){
        var btn_spoiler = $('button').create();
        btn_spoiler.innerText = this.options.textSpoiler;
        btn_spoiler.className = this.options.classname_btn;
        this.btn_spoiler = btn_spoiler;

        $(this.spoiler).after(btn_spoiler)

        this.spoiler.classList.add(this.options.classname_hidden);

        if(this.options.set_style){
            this.set_style_hidden();
        }
    }

    set_style_hidden(){
        this.spoiler.style.display = 'inline-block';
        this.spoiler.style.width = '0';
        this.spoiler.style.height = '0';
        this.spoiler.style.opacity = '0';
        this.spoiler.style.overflow = 'hidden';
        this.spoiler.style.transitionProperty = 'opacity, width, height';
        this.spoiler.style.transitionDuration = '.6s';
    }

    set_style_visible(){  

        if(this.display && this.options.display === null){
            this.spoiler.style.display = this.display;
        }else if(this.options.display !== null){
	    this.spoiler.style.display = this.options.display;	
	}else {
	    this.spoiler.style.display = 'inline';
	} 

        this.spoiler.style.width = 'auto';
        this.spoiler.style.height = 'auto';
        this.spoiler.style.opacity = '1';
    }

    openSpoiler(e){
        e.preventDefault();

        this.spoiler.classList.remove(this.options.classname_hidden);
        this.spoiler.classList.add(this.options.classname_visible);
        
        if(this.options.set_style){
            this.set_style_visible();
        }

        $(this.btn_spoiler).remove();
    }

    event(){
    }

    show_option(){
        return this.options;
    }
}

/**

<div>
    <button><button>
    <
<div>

 */