class Editor 
{
    constructor(formID, width, height, buttons) {
        this.textarea = document.querySelector('#'+formID);
        this.width  = width;
        this.height = height;
        this.buttons = buttons;
        this.editor = document.createElement('div');
        this.divButtons = document.createElement('div');
        this.divTextarea = document.createElement('div');
        
        this.hiddenTextarea();
        this.createDivButton();
        this.createDivTextarea();
        this.createEditor();
        this.addEventCommand();
        
    }

    hiddenTextarea() {
        this.textarea.style.opacity = 0;
        this.textarea.style.width= 0;
        this.textarea.style.height = 0;
    }

    createDivButton() {
        this.divButtons.style.width = this.width;
        this.divButtons.classList.add('editor-commands')

        let buttons = {
            'bold' : ['bold', true, 'B'],
            'italic': ['italic', true, 'I'],
            'undo' : ['undo', false, 'undo'],
            'redo' : ['redo', false, 'redo'],
            'underline' : ['underline', true, 'U'],
            'hr' : ['insertHorizontalRule', false, 'hr'],
            'selectAll' : ['selectAll', false, 'Ctrl+A'],
            'color' : ['foreColor', false, 'color'],
            'bcolor' : ['backColor', false, 'back-Color'],
            'img' : ['insertImage', false, 'img'],
            'ol' : ['insertOrderedList', false, 'ol'],
            'ul' : ['insertUnorderedList', false, 'ul'],
            'police' : ['fontName', false, 'police'],
            'size' : ['fontSize', false, 'size'],
            'justifyCenter' : ['justifyCenter', false, 'j-center'],
            'justifyFull' : ['justifyFull', false, 'j-full'],
            'justifyLeft' : ['justifyLeft', false, 'j-left'],
            'justifyRight' : ['justifyRight', false, 'j-right'],
            'link' : ['createLink', false, 'link'],
            'removeFormat' : ['removeFormat', false, 'remove-format'],
            'suppr' : ['delete', false, 'suppr'],
            'paragraph' : ['insertParagraph', false, 'P'],
            'paste' : ['paste', false, 'paste'],
            'copy' : ['copy', false, 'copy'],
            'cut' : ['cut', false, 'cut'],
            'supprRev' : ['forwardDelete', false, 'suppr-rev']
        }
        
        this.buttons.forEach(element => {

            if (buttons[element]) {
                this.divButtons.innerHTML += "<span data-command='"+buttons[element][0]+"' data-active='"+buttons[element][1]+"' class='editor-commands-desactive'>"+buttons[element][2]+"</span>";
            }
        });

        this.editor.appendChild(this.divButtons);
    }

    createDivTextarea() {
        
        this.divTextarea.style.width = this.width;
        this.divTextarea.style.height = this.height;
        this.divTextarea.contentEditable = 'true';
        this.divTextarea.innerHTML = this.textarea.value;
        this.divTextarea.classList.add('editor');

        this.editor.appendChild(this.divTextarea);
    }

    createEditor() {
        let parentElement = this.textarea.parentNode;
        parentElement.insertBefore(this.editor, this.textarea);
    }

    addEventCommand() {
        let commandButtons = this.divButtons.querySelectorAll("span[data-command]");

        let length = commandButtons.length;

        for (let i = 0; i < length; i++) {
            commandButtons[i].addEventListener("mousedown", e => {
                e.preventDefault();

                let commandName = e.target.getAttribute("data-command");
                let active = e.target.getAttribute("data-active");

                if (active === 'true') {
                    if (e.target.classList.contains('editor-commands-active')) {
                        e.target.classList.remove('editor-commands-active')
                    } else {
                        e.target.classList.add('editor-commands-active')
                    }
                }

                if (commandName === 'createLink') {
                    let link = prompt("url :", 'http://');
                    document.execCommand(commandName, false, link);
                } else if (commandName === 'backColor') {
                    let color = prompt('color:', '');
                    document.execCommand(commandName, false, color);
                }else if (commandName === 'insertImage') {
                    let src = prompt('src:', '');
                    document.execCommand(commandName, false, src);
                }else if (commandName === 'fontName') {
                    let name = prompt('police:', '');
                    document.execCommand(commandName, false, name);
                }else if (commandName === 'fontSize') {
                    let size = prompt('taille:', '');
                    document.execCommand(commandName, false, size);
                }else if (commandName === 'foreColor') {
                    let color = prompt('couleur:', '');
                    document.execCommand(commandName, false, color);
                } else {
                    document.execCommand(commandName, false);
                }
            })
        }
        
        this.divTextarea.addEventListener('keyup', e => {
            let val = this.divTextarea.innerHTML;
            this.textarea.value = val;
        })

        this.divTextarea.addEventListener('mouseup', e => {
            let val = this.divTextarea.innerHTML;
            this.textarea.value = val;
        })
    }
}