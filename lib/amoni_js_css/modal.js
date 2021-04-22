
class Modal extends View
{
    render() {
        let idModal = 'window-modal';
        let contentHeader = [];
        let contentBody = [];
        let activeBtnClose = true;

        let widthContainer = 'auto';
        let heightContainer = 'auto';
        let classContainer = '';

        if(this.props.width) {
            widthContainer = this.props.width; 
        }

        if(this.props.height) {
            heightContainer = this.props.height; 
        }

        if(this.props.class) {
            classContainer = this.props.class; 
        }

        let style = {
            modal : "position:fixed;top:0;height:100%;width:100%;background-color:rgba(0,0,0,0.7);z-index:100;display:flex; justify-content:center;align-items:center",
            container : "background-color:white; height: auto; min-width:50%; max-height:100vh;overflow:auto; height:"+heightContainer+"; width:"+widthContainer+" ",
            header : "position:relative;min-height:50px;",
            btnClose : "font-size:30px;position:absolute;right:15px;cursor: pointer;text-align:center;color:red"
        }

        if(this.props.activeBtnClose == false || this.props.activeBtnClose == true) {
            activeBtnClose = this.props.activeBtnClose;
        }

        if(this.props.idModal) {
            idModal = this.props.idModal;
        }

        let btnClose = newElt('div', {
            style: style.btnClose
        }, [newText('x')]);

        if (activeBtnClose == true) {
            contentHeader['0'] = btnClose;
    
            if(this.props.header){
                contentHeader['1'] = this.props.header
            }
        } else {
            if(this.props.header){
                contentHeader['0'] = this.props.header
            }
        }

        let header = newElt('div', {
            style:style.header
        }, contentHeader);

        if(this.props.body){
            contentBody['0'] = this.props.body
        }

        let body = newElt('div', {}, contentBody);

        let container = newElt('div', {
            style : style.container,
            class : classContainer
        }, [header, body])
        
        let modal = newElt('div', {
            id: idModal,
            style: style.modal
        }, [ container ]);

        if (activeBtnClose == true) {
            
            let closeModal_withClick = () => {
                modal.parentElement.removeChild(modal);

                btnClose.removeEventListener('click', closeModal_withClick);
                window.removeEventListener('keyup', closeModal_withKey);
            }

            let closeModal_withKey = (e) => {
                if (e.key == 'Escape' || e.key == 'Esc') {
                    modal.parentElement.removeChild(modal);
                    btnClose.removeEventListener('click', closeModal_withClick);
                    window.removeEventListener('keyup', closeModal_withKey);
                }
            }

            btnClose.addEventListener('click', closeModal_withClick )
    
            window.addEventListener('keyup', closeModal_withKey )

        }

        return modal;
    }

}