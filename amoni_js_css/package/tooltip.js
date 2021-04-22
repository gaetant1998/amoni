
/**
    sélectionner tous les éléments avec l'attribut title
    Lorsque l'on survole un de ces élément :
    -> on crée une bulle avec le bon titre
    -> on place cette bulle au dessus de l'élément
    -> anime l'apparition de cette bulle 
    Lorsqu'on quite le survol de l'élément :
    -> anime la dispaition de l'élément 
    -> supprime le toolptip du $
*/

var tooltips = function(selector){
    $(selector).getall().forEach(element => {
        var info_b = new tooltip(element);
        info_b.run();
    })
}

var tooltip = function(element){

    this.element   = element;
    this.target_tooltip = this.element.getAttribute('data-tooltip')
    if(this.target_tooltip){
        this.title = $(this.target_tooltip).get().innerHTML;
    }else{
        this.title = this.element.title
    }
    this.tooltip = null;

    this.run = function(){  
        /**
            on utilse bind(this)   pour lorsque on utile this à l'interieur
            de l'évênement elle face plustot référence à notre objet tooltip
            au lieux de l'élément 
        */           
        event(this.element).mouseover(this.mouseover.bind(this));           
        event(this.element).mouseout(this.mouseout.bind(this));

    };//end function run

    this.mouseover = function(e){
        this.create_tooltip(this.title);
        this.set_style();
    }

    this.mouseout = function(e){
        this.delete_tooltip(this.element);
        this.tooltip = null;
    }

    this.create_tooltip = function(title){
        var tooltip       = $('div').create();
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = title ;
        $('body').add(tooltip, true);
        this.tooltip      = tooltip;
    }

    this.delete_tooltip = function(){
       if(this.tooltip !== null){
            Class(this.tooltip).remove('tooltip-visible')
            //this.tooltip.addEventListener('transitionend', ()=>{
            $(this.tooltip).remove();
               // this.tooltip = null;
           // })
       }
    }

    this.set_style = function(){
        var width   = this.tooltip.offsetWidth;
        var height  = this.tooltip.offsetHeight;
        var left    = this.element.offsetWidth/2 + this.element.getBoundingClientRect().left + document.documentElement.scrollLeft; 
        var top     = this.element.getBoundingClientRect().top - height + document.documentElement.scrollTop - 10 ; 
        this.tooltip.style.left  = left+'px';
        this.tooltip.style.top   = top+'px';
        this.tooltip.classList.add('tooltip-visible');
    }
}//end objet tooltip
