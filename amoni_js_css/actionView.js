class View 
{

    constructor(props = {}){
        this.props = props
    }

}


function renderView(view, container) {
    if (view instanceof View) {
        container.appendChild(view.render());
    } else {
        container.appendChild(view);
    }
}

function newElt(elt, options={}, childs = null) {
    elt = document.createElement(elt);

    for (const key in options) {
        elt.setAttribute(key, options[key]);
    }

    if (childs) {
        
        for (const key in childs) {
            let child = childs[key];

            if (child instanceof View) {
                elt.appendChild(child.render());
            } else {
                elt.appendChild(child);
            }
        }
    }
   
    return elt;
}

function newText(text) {
    return document.createTextNode(text);
}

function selectElt(selector) {
    return document.querySelector(selector);
}

function selectAllElt(selector) {
    return document.querySelectorAll(selector);
}
