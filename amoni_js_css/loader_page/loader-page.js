
window.addEventListener('load', e => {
    let loader = document.querySelector('.loader-page');
    loader.classList.add('loader-page-desactive');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 400);
} ) 