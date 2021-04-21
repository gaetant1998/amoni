<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>accueil</title>
    <link rel="stylesheet" href="<?=STYLE?>">
</head>
<body>
    
<div class="main-container">
    <div class="second-container txt-c h-20 ">
        <span id='btn' style="position:relative;top:15px;background-color:white" class="ft-s-5 ft-f-6 p-5">
            hello world!
        </span>

        <hr>
        
        <div style="width: 500px; height:300px; border: 1px dashed black;margin:100px" id='drop-zone'>

        </div>

        <div class="m-t-5 p-5"><a href="index.php?url=contact">contact</a></div>


    </div>
</div>
    <script>
        let btn = document.querySelector('#btn')
        let  dropZone = document.querySelector('#drop-zone');
        
        let isMouseInElt = (x, y , elt) => {

            if(x < elt.offsetLeft || x > (elt.offsetLeft + elt.offsetWidth)) {
                return false

            }
            else if(y < elt.offsetTop || y > (elt.offsetTop + elt.offsetHeight)) {
                return false;
            }
            
            return true;
        }

        window.addEventListener('click', e => {
            if(!isMouseInElt(e.clientX, e.clientY, btn)){
                btn.style.color = 'red';
            } else {
                btn.style.color = 'black';
            }
        })

        dropZone.addEventListener('dragenter', e=>{
            e.target.style.borderColor = 'red';
            console.log(e.target);
        })

        dropZone.addEventListener('dragover', e=>{
            e.target.style.borderColor = 'red';
            console.log(e.target);
        })

        dropZone.addEventListener('dragexit', e=>{
            e.target.style.borderColor = 'red';
            console.log(e.target);
        })

        dropZone.addEventListener('dragleave', e=>{
            
            // console.log(e);

        })

        /*
        ondrag: null
​
ondragend: null
​
ondragenter: null
​
ondragexit: null
​
ondragleave: null
​
ondragover: null
​
ondragstart: null
​
ondrop: n
        */

    </script>
</body>
</html>