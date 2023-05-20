function Menu(e) {
    let list = document.querySelector('ul');

    e.name === 'menu' ? (e.name = "close", list.classList.add('top-[75px]'), list.classList.add('opacity-100'), list.classList.add('bg-white'))
    : (e.name = "menu", list.classList.remove('top-[75px]'), list.classList.remove('opacity-100'), list.classList.remove('bg-white'))
}
window.addEventListener('scroll', function(){
    const nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('bg-white');
        nav.classList.add('shadow');
    } else {
        nav.classList.remove('bg-white');
        nav.classList.remove('shadow');
    }
});