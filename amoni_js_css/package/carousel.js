
var Carousel = function(nameElement, options={}){

    this.element     = $a.get(nameElement);  // on recupère l'élément qui contient les élément à mettre en carousol
    this.items       =  null;
    this.currentItem = 0;       
    this.carousel    = null;//createDivWithClass('carousel'); on créer notre div qui represente le carousel 
    this.panorama    = null;//createDivWithClass('carousel-panorama'); on créer la div qui contiendra les éléments a metre en carousel 
    this.nextButton  = null;
    this.backButton  = null;
    this.options  = Object.assign({/*contiedra les objects fusionnées*/}, { //on définis nos options par défaut si oncun options n'est donné grace a assign
        itemsToScroll : 4,
        itemsVisible  : 2,
        overflow : 'hidden',//hidden | unset | auto | scroll
        duration : 1,
        width : '30',
        height : '30',
        boucle : false,
        loop : false,
        navigation : true,
        mobile : '700',
        infiniteScrool : false
    }, options)
    this.isModile = false;

    this.run = function(){
        var children = [].slice.call(this.element.children); // on recupère tous ses éléments HTMLCollection pour ne pas avoir les node de type text
        this.carousel = this.createDivWithClass('carousel');
        this.panorama = this.createDivWithClass('carousel-panorama');
        this.items = children.map(child => {
            var item = this.createDivWithClass('carousel-item');
            $a.add(child, item).add(item, this.panorama);
            return item;
        });
        
        this.onresize();
        //this.setStyle();// on appel la fonction qui va bien redimentionner le 
        
        if(this.options.overflow === 'hidden' || this.options.overflow === 'unset'){
            if(this.options.navigation){
                this.createNavigation();
            }

            if(this.options.loop){
                this.backButton.style.opacity = '0';
            }
        }
        $a.add(this.panorama, this.carousel).add(this.carousel, this.element);// on insert notre carousel et son panorama dans la l'element
        
        window.addEventListener('resize', this.onresize.bind(this))
        this.carousel.addEventListener('keyup', (e)=>{
            if(e.key === 'ArrowRight' || e.key === 'Right'){
                this.next();
            }else if(e.key === 'ArrowLeft' || e.key === 'Left'){
                this.back();
            }
        })
        // console.log(this.carousel)
        // console.log(this.children)
        // console.log(this.options.itemsToScroll)
        // console.log(this.options.itemsVisible)
        // console.log(this.carousel)
        //console.log(this.panorama.children)
        //console.log(this.items)
    }

    this.createDivWithClass = function(nameClass){
        var div = $a.create('div');
        div.classList.add(nameClass);
        return div;
    }

    this.setStyle = function(){
        var ratio = this.items.length / this.itemsVisible();
        this.carousel.style.position = 'relative';
        this.carousel.style.overflow = this.options.overflow;
        this.carousel.setAttribute('tabindex', '0');
        this.panorama.style.width = (ratio * 100)+'%';
        this.items.forEach(item => {
            item.style.width = (100 / this.itemsVisible()) / ratio +'%';
            item.style.display = 'inline-block';
        });
    }

    this.createNavigation = function(){
        var nextButton = this.createDivWithClass('carousel-next');
        var backButton = this.createDivWithClass('carousel-back');

        backButton.classList.add('btn-img-l');
        nextButton.classList.add('btn-img-r');

        backButton.style.position = 'absolute';
        backButton.style.top = '50%';
        backButton.style.left = '3px';
        backButton.style.zIndex = '10';
        backButton.style.width = this.options.width+'px';
        backButton.style.height = this.options.height+'px';
        backButton.style.backgroundColor = 'rgba(255,255,255,0.2)';
        backButton.style.cursor = 'pointer';
        backButton.style.transitionProperty = 'background-color, opacity';
        backButton.style.transitionDuration = '1s';

        nextButton.style.position = 'absolute';
        nextButton.style.top = '50%';
        nextButton.style.left = 'auto';
        nextButton.style.right = '3px';
        nextButton.style.zIndex = '10';
        nextButton.style.width = this.options.width+'px';
        nextButton.style.height = this.options.height+'px';
        nextButton.style.backgroundColor = 'rgba(255,255,255,0.2)';
        nextButton.style.cursor = 'pointer';
        nextButton.style.transitionPropriety = 'background-color, opacity';
        nextButton.style.transitionDuration = '1s';

        $a.add(backButton, this.carousel).add(nextButton, this.carousel);
        
        backButton.addEventListener('mouseover', (e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)';
        });

        nextButton.addEventListener('mouseover', (e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)';            
        });

        backButton.addEventListener('click', this.back.bind(this));
        nextButton.addEventListener('click', this.next.bind(this));

        backButton.addEventListener('mouseout', (e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
        });

        nextButton.addEventListener('mouseout', (e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';            
        });

        this.backButton = backButton;
        this.nextButton = nextButton;
    }

    this.next = function(){
        this.goToItem(this.currentItem + this.itemsToScroll());
    }

    this.back = function(){
        this.goToItem(this.currentItem - this.itemsToScroll());        
    }

    this.goToItem = function(index){
        if(!this.options.boucle){
            if(index < 0 ){
                index = 0;
            }else if(index >= this.items.length ){
                index = this.items.length-1;
            }
        }else {
            if(index < 0 ){
                index = this.items.length-1;
            }else if(index >= this.items.length ){
                index = 0;
            }            
        }

        if(this.options.loop){
            if(index == 0){
                this.backButton.style.opacity = '0';
            }else{
                this.backButton.style.opacity = '1';
            }

            if(index >= this.items.length-1){
                this.nextButton.style.opacity = '0';
            }else {
                this.nextButton.style.opacity = '1';
            }
        }
        
        var translatex = index * - 100 / this.items.length;
        this.panorama.style.transform = 'translate3d('+translatex+'%, 0, 0)';
        this.panorama.style.transitionProperty = 'transform';
        this.panorama.style.transitionDuration = this.options.duration+'s';
        this.currentItem = index ; 
    }

    this.show_option = function(){
        return this.options;
    }

    this.itemsToScroll = function(){
        if(this.isModile){
            return 1;
        }else{
            return this.options.itemsToScroll;
        }
    }

    this.itemsVisible = function(){
        if(this.isModile){
            return 1;
        }else{
            return this.options.itemsVisible;
        }
    }

    this.onresize = function(){
        var mobile = this.options.mobile;
        if(mobile > window.innerWidth){
            this.isModile = true;
            this.setStyle()
        }else {
            this.isModile = false;
            this.setStyle()
        }
    }

}