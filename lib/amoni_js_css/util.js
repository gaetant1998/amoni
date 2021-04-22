
let isMouseInElt = (x, y , elt) => {

    if(x < elt.offsetLeft || x > (elt.offsetLeft + elt.offsetWidth)) {
        return false

    }
    else if(y < elt.offsetTop || y > (elt.offsetTop + elt.offsetHeight)) {
        return false;
    }
    
    return true;
}

let isClassInElt = (name, elt) {
    
}