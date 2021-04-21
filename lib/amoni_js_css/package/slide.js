/**
 *  permet de masquer un élément (slide up) ou de l'affichher (slide down)
*/
var slide = {
    /**
     * masque un element horizontalement
     * @param {html element} element elemnt à masquer
     * @param {int} duration duré de l'animation
    */
    up_h : function(element, duration=1000){
        var width = element.offsetWidth+'px' ;
        element.style.width = width;
        element.style.transitionProperty = 'width, margin, padding';
        element.style.transitionDuration = duration+'ms';
        element.offsetWidth;
        element.style.overflow = 'hidden';
        element.style.width = 0;
        element.style.padding = 0;
        element.style.margin = 0;
        window.setTimeout(() => {
            element.style.display = 'none';
            element.style.removeProperty('width');
            element.style.removeProperty('padding');
            element.style.removeProperty('margin');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition-property');
            element.style.removeProperty('transition-duration');
            element.style.width = width;
        }, duration);
        return this;
    },

    /**
     * masque un element verticalement
     * @param {html element} element elemnt à masquer
     * @param {int} duration duré de l'animation
    */

    up_v : function(element, duration=1000){
        var height = element.offsetHeight+'px' ;
        element.style.height = height;
        element.style.transitionProperty = 'height, margin, padding';
        element.style.transitionDuration = duration+'ms';
        element.offsetHeight;
        element.style.height = 0;
        element.style.padding = 0;
        element.style.margin = 0;
        element.style.overflow = 'hidden';
        window.setTimeout(() => {
            element.style.display = 'none';
            element.style.removeProperty('height');
            element.style.removeProperty('padding');
            element.style.removeProperty('margin');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition-property');
            element.style.removeProperty('transition-duration');
            element.style.height = height;
        }, duration);
        return this;
    },

    /**
     * affiche un element horizontalement
     * @param {html element} element elemnt à masquer
     * @param {int} duration duré de l'animation
    */

    down_h : function(element, duration=1000){
        element.style.removeProperty('display');
        var display = window.getComputedStyle(element).display;
        if (display) {
            element.style.display = display;
        }
        var width = element.offsetWidth+'px' ;
        element.style.width = 0;
        element.style.padding = 0;
        element.style.margin = 0;
        element.offsetWidth;
        element.style.transitionProperty = 'width, margin, padding';
        element.style.transitionDuration = duration+'ms';
        element.style.width = width;
        element.style.removeProperty('padding');
        element.style.removeProperty('margin');
        window.setTimeout(() => {
            element.style.removeProperty('transition-property');
            element.style.removeProperty('transition-duration');
        }, duration);
    },

    /**
     * masque un element verticalement
     * @param {html element} element elemnt à masquer
     * @param {int} duration duré de l'animation
    */

    down_v : function(element, duration=1000){
        element.style.removeProperty('display');
        var display = window.getComputedStyle(element).display;
        if (display) {
            element.style.display = display;
        }
        var height = element.offsetHeight+'px' ;
        element.style.height = 0;
        element.style.padding = 0;
        element.style.margin = 0;
        element.offsetHeight;
        element.style.transitionProperty = 'height, margin, padding';
        element.style.transitionDuration = duration+'ms';
        element.style.height = height;
        element.style.removeProperty('padding');
        element.style.removeProperty('margin');
        window.setTimeout(() => {
            element.style.removeProperty('transition-property');
            element.style.removeProperty('transition-duration');
        }, duration);
    },

    /**
     * masque ou affiche un element horizontalement en détectant si il est oui ou non afficher
     * @param {html element} element elemnt à masquer
     * @param {int} duration duré de l'animation
    */

    toggle_h : function(element, duration){
        var display = window.getComputedStyle(element).display;
        if (display === 'none') {
            this.down_h(element, duration);
        }else {
            this.up_h(element, duration);
        }
    },

    /**
     * masque ou affiche un element verticalement en détectant si il est oui ou non afficher
     * @param {html element} element elemnt à masquer
     * @param {int} duration duré de l'animation
    */
    toggle_v : function(element, duration){
        var display = window.getComputedStyle(element).display;
        if (display === 'none') {
            this.down_v(element, duration);
        }else {
            this.up_v(element, duration);
        }
    }
}