'use strict'

function modals(options={}, classname='.js-modal'){
    $(classname).getall().forEach(a => {
        new Modal(a, options);
    });  
}

class Modal{
    constructor(a, options){
        this.modal = null;
        this.btnClose = null;
        this.contentModal = null;
        this.href = null;
        this.elementStopPropagation = null;
        this.options = Object.assign({}, {
            propagation : false,     //autoriser ou non la fermeture de la fêntre modale en cliquant dessus
            elementStopPropagation : null, // element de la fenêtre modale qui ne sera affecter si l'on peut cliquer sur le modal pour le fermer
            id_btnClose : '#closeModal', 
            set_style   : false,
            position : 'fixed',
            contentModal : '#content-modal'
        }, options);

        this.closeModal = this.closeModal.bind(this);
        this.keyModal   = this.keyModal.bind(this);
        this.stopPropagation = this.stopPropagation.bind(this);

        event(a).click(this.openModal.bind(this));
    }

    openModal(e){
        e.preventDefault();

        var href = attr(e.target).get('href');
        this.href = href;

        if(href.startsWith('#')){ // si la valeur du href commence par # alors sa veut dire que le modale est dans la même page 
            
            this.modal = $(href).get() ; 
        
        }else { // sinom on faire un appel à l'ajax pour recuperrer le modal dans la page sible
            
            this.loadModal(href);
            //return
        }

        this.contentModal = $(this.options.contentModal).get(this.modal);
        var display = getComputedStyle(this.modal).style;
        this.btnClose  = $(this.options.id_btnClose).get(this.modal);
        
        if(this.btnClose === null){
            alert('vous devez donnez un nom de button valide pour pouvoir fermer le modal!');
            throw Error('vous devez donnez un nom de button valide pour pouvoir fermer le modal');
        }
        if(this.modal === null){
            alert('modal indefini!');
            throw Error('modal indefini!');
        }

        this.modal.removeAttribute('aria-hidden');
        this.modal.setAttribute('aria-modal', 'true');

        if(this.options.set_style === true){
            this.set_style();
        }else {
            if(display){
                this.modal.style.display = display;
            }
            this.modal.style.display = null;
        }
        this.event();
    }

    closeModal(e){
        e.preventDefault();

        if(this.modal === null) return
        
        attr(this.modal).set('aria-hidden', 'true');
        attr(this.modal).remove('aria-modal');
        
        if(this.options.set_style){

            this.modal.style.transform  = 'translatey(100%)';
            
            setTimeout(() => {
                
                if(!this.href.startsWith('#')){ 
                    $(this.modal).remove();
                    return
                }

                this.modal.style.display = 'none';
                this.modal = null;

            }, 700);

        }else {

            if(!this.href.startsWith('#')){ 
                $(this.modal).remove();
                return
            }
            
            this.modal.style.display = 'none';
            this.modal = null;
        }

        if(this.options.propagation){
            event(this.modal).click(this.closeModal);
        }
        revent(this.btnClose).click(this.closeModal);
        event(window).keyup(this.keyModal);
        
       
    }

    stopPropagation(e){
        e.stopPropagation();
    }

    keyModal(e){
        if(e.key === 'Escape' || e.key === 'Esc'){
            this.closeModal(e)
        }
    }

    event(){
        if(this.options.propagation){
            event(this.modal).click(this.closeModal);
            if(this.options.elementStopPropagation){
                this.elementStopPropagation = $(this.options.elementStopPropagation).get(this.modal);
                event(this.elementStopPropagation).click(this.stopPropagation);
            }
        }
        event(this.btnClose).click(this.closeModal);
        event(window).keyup(this.keyModal);  
    }

    show_option(){
        return this.options;
    }

    set_style(){
        this.modal.style.position = this.options.position;
        this.modal.style.top      = '0';
        this.modal.style.left     = '0';
        this.modal.style.opacity  = '0';        
        this.modal.style.transform  = 'translatey(500px)';        
        this.modal.style.transitionProperty = 'transform';
        this.modal.style.transitionDuration = '.7s';
        this.modal.style.width    = '100%';
        this.modal.style.height   = '100%';
        this.modal.style.display  = 'flex';
        this.modal.style.justifyContent = 'center';
        this.modal.style.alignItems = 'center';
        this.modal.style.backgroundColor = 'rgba(0,0,0,.8)';
        this.modal.style.zIndex = '10';

        setTimeout(() => {
            this.modal.style.opacity = '1';
            this.modal.style.transform  = 'translatey(0)';        
        }, 100);

        this.btnClose.style.position = 'absolute';
        this.btnClose.style.top = '0';
        this.btnClose.style.right = '15px';
        this.btnClose.style.zIndex = '10';
        this.btnClose.style.cursor = 'pointer';

        if(this.contentModal === null){
            throw Error('l\élément qui contient le contenu du modal n\'a pas été trouvé! '+this.options.contentModal)
        }
        
        this.contentModal.style.maxWidth = '600px';
        this.contentModal.style.maxHeight = '500px';
        this.contentModal.style.overflow = 'auto';
        this.contentModal.style.backgroundColor = '#fff';
    }

    loadModal(url){

        var susscess = (reponsehtml)=>{ 
            //console.log(url.split('#'));
            var nameModal = null;
            nameModal = '#'+url.split('#')[1];
            if(reponsehtml){
                var fragment = $(reponsehtml).fragment(); //
                this.modal = $(nameModal).get(fragment);
                
                $('body').add(this.modal, true);
            }    
        }

        ajax(url, {load:susscess}, false).get();
    }
}

/**
        .modal{
            position: fixed;
            top:0; left:0;
            width:100%;
            height: 100%;
            display: flex;
            justify-content : center;
            align-items : center;
            
            background-color: rgba(0,0,0,.8);
            z-index: 100;
        }
        .modal-content{
            max-width: 600px;
            max-height: 500px;
            overflow: auto;
            background-color: #fff;
        }
        #fermer{
            position : absolute;
            top: 0;
            right: -5px;
            z-index: 100;

        }

*/