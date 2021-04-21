
var lightbox = function(element=null){
    if(element){
        var links = $('a[href$=".png"], a[href$=".PNG"], a[href$=".jpeg"], a[href$=".jpg"]').getall(element);
    }else {
        var links = $('a[href$=".png"], a[href$=".PNG"], a[href$=".jpeg"], a[href$=".jpg"]').getall();
    }
   
    var href_images = [];
    links.forEach(link => {
        href_images.push(link.getAttribute('href'))
    })

    links.forEach(link => {
        event(link).click( e => {
            e.preventDefault();
            var light = new Lightbox(e.currentTarget.getAttribute('href'), href_images);
            light.run();
        })
    });
}

var Lightbox = function(href, href_images){
    this.url        = href;
    this.url_images = href_images; // chemin de tous les images de la lightbox
    this.lightbox    = null;
    this.container   = null;
    this.onkeyup     = null;
    this.onkeyNext   = null;
    this.onkeyBack   = null;
    /**

     */

    this.run = function(){
        this.lightbox   = this.buildDom(this.href);
        this.onkeyup    = this.onkeyup.bind(this);

        this.set_style_lb();

        this.loadImage(this.url);

        $('body').add(this.lightbox, true);
        event(document).keyup(this.onkeyup);
    }

    this.buildDom = function(src){
        var dom = $('div').create();
        dom.innerHTML = 
        "<div class='lightbox'>\
            <button class='lightbox-close'>fermer</button>\
            <div class='lightbox-back btn-img-l'>precedent</div>\
            <div class='lightbox-next btn-img-r'>suivant</div>\
            <div class='lightbox-container'>\
                \
            </div>\
        </div>";

        var close = $('.lightbox-close').get(dom);
        var back  = $('.lightbox-back').get(dom);
        var next  = $('.lightbox-next').get(dom);

        this.set_style_btn(back, next, close);

        this.set_event(back, next, close);
        
        return dom;
    }

    this.set_style_lb = function(){
        this.lightbox.style.position = 'fixed';
        this.lightbox.style.top = '0';
        this.lightbox.style.left = '0';
        this.lightbox.style.zIndex = '20';
        this.lightbox.style.width = '100%';
        this.lightbox.style.height = '100%';
        this.lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';

        this.container = $('.lightbox-container').get(this.lightbox);
        this.container.style.display = 'flex' ;
        this.container.style.justifyContent = 'center' ;
        this.container.style.alignItems = 'center';
        this.container.style.marginLeft = '50px';
        this.container.style.marginRight = '50px';
        this.container.style.backgroundColor = 'rgba(255, 255, 255, 0.151)';
        this.container.style.height = '100%';
        this.container.style.minHeight = '100vh';
        this.container.style.maxHeight = '100vh';
        this.container.style.overflow = 'auto';

    }

    this.set_style_btn = function(back, next, close){

        back.style.position = 'absolute';
        back.style.top = '50%';
        back.style.left = '3px';        
        back.style.width = '50px';
        back.style.height = '50px';
        back.style.borderRightColor = 'rgba(255, 255, 255, 0.329)';
        back.style.borderTopColor = 'rgba(255, 255, 255, 0.329)';
        back.style.cursor = 'pointer';
        back.style.textIndent = '-3000px';
        back.style.transitionProperty = 'border-top-color, border-right-color';
        back.style.transitionDuration = '1s';

        next.style.position = 'absolute';
        next.style.top = '50%';
        next.style.right = '3px';        
        next.style.width = '50px';
        next.style.height = '50px';
        next.style.borderRightColor = 'rgba(255, 255, 255, 0.329)';
        next.style.borderTopColor = 'rgba(255, 255, 255, 0.329)';
        next.style.cursor = 'pointer';
        next.style.textIndent = '-3000px';
        next.style.transitionProperty = 'border-top-color, border-right-color';
        next.style.transitionDuration = '1s';

        close.style.position = 'absolute';
        close.style.top = '0';
        close.style.right = '3px';
        close.style.cursor = 'pointer';

    }

    this.set_event = function(back, next, close){
        event(close).click(this.close.bind(this))
        event(back).mouseover( (e)=>{
            e.currentTarget.style.borderTopColor = 'white';
            e.currentTarget.style.borderRightColor = 'white';
        });
        event(next).mouseover( (e)=>{
            e.currentTarget.style.borderTopColor = 'white';
            e.currentTarget.style.borderRightColor = 'white';
        });
        event(back).click(this.back.bind(this))
        event(next).click(this.next.bind(this))
    }

    this.loadImage = function(url){
        this.url = null;
        var image = new Image();
        var loader = $('span').create();
        var container = this.container;
        container.innerHTML = "";
        loader.classList.add('lightbox-loader');
        loader.classList.add('loader-quart');
        
        $(container).add(loader);
        
        image.onload = () => {
            $(loader).remove();
            $(container).add(image);
            this.url = url
        }
        
        image.src = url;
    }

    this.close = function(e){
        e.preventDefault();
        $(this.lightbox).remove();
        event(document).keyup(this.onkeyup);
    }

    this.onkeyup = function(e){
        if(e.key === 'Escape'){
            this.close(e);
        }else if(e.key === 'ArrowRight' || e.key === 'Right'){
            this.next(e);
        }else if(e.key === 'ArrowLeft' || e.key === 'Left'){
            this.back(e);
        }
    }

    this.next = function(e){
        e.preventDefault();
        var index = this.url_images.findIndex(image =>image === this.url);// a chercher
        if(index === this.url_images.length-1){
            index = -1;
        }
        this.loadImage(this.url_images[index+1]);
    }

    this.back = function(e){
        e.preventDefault();
        var index = this.url_images.findIndex(image => image === this.url);

        if(index <= 0){
            index = this.url_images.length;
        }                
        this.loadImage(this.url_images[index-1]);
    }
}
/**
               <img src="+href+" alt=''>\
 *  <div class="lightbox">
        <button class="lightbox-close">fermer</button>
        <div class="lightbox-back btn-img-l">precedent</div>
        <div class="lightbox-next btn-img-r">suivant</div>
        <div class="lightbox-container">
        </div>
    </div>
 */

 /**
    .lightbox{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
} 

.lightbox-next, .lightbox-back{
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    border-right-color: rgba(255, 255, 255, 0.329);
    border-top-color: rgba(255, 255, 255, 0.329);
    cursor: pointer;
    text-indent: -3000px;
    transition-property: border-top-color, border-right-color;
    transition-duration: 1s;
}

.lightbox-back{
    left: 3px; 

}

.lightbox-next{
    right: 3px;
}

.lightbox-close{
    position: absolute;
    top: 0px;
    right: 5px;
    cursor: pointer;
}

.lightbox-next:hover, .lightbox-back:hover{
    border-top-color: white;
    border-right-color: white;
}

.lightbox-container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
    margin-right: 50px;
    background-color: rgba(255, 255, 255, 0.151);
    height: 100%;
    overflow: auto;
    min-height: 100vh;
}
 .lightbox-container img{
    max-width: 100%;
    max-height: 100vh;
    overflow: auto;
} 

  */