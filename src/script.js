import {menu} from './views/menu.js'
import {route} from './route.js'

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#menu').innerHTML = menu();

    route(window.location.hash);

    window.addEventListener('hashchange',()=> {
        route(window.location.hash);
    })
})