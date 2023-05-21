//* Visual elements
const $welcome = document.querySelector('#welcome');
const $main = document.querySelector('#main');
const $aside = document.querySelector('#aside');

//* Funcional elements
const $nameCardie = document.querySelector('#name-input');
const $projectNameCardie = document.querySelector('#name-project-input');
const $btnStart = document.querySelector('#btn-start');

let menuValue = true
const $btnMenu = document.querySelector('#btn-menu');
const $svgBurger = document.querySelector('#btn-burger');
const $svgCloseMenu = document.querySelector('#btn-close-menu');

//* Visual functions
function start() {
    let owner = $nameCardie.value
    let project = $projectNameCardie.value
    if (owner !== '' && project !== '') {
        $welcome.classList.add('disapear')

        setTimeout(() => {
            $welcome.style.display = 'none'
            $main.style.display = 'block'

            setTimeout(() => {
                $main.classList.remove('disapear')
                console.log('hola')
            }, 300);

        }, 300)
        
    } else {
        alert('Campos incorrectos o incompletos')
    }
}

function toggleMenu() {
    if (menuValue) {
        $svgBurger.style = 'display: none; opacity: 0; transform: translateX(0vw)';
        $svgCloseMenu.style = 'display: block; opacity: 1; transform: translateX(0vw)';
        $aside.style = 'transform: translateX(0vw)'
        menuValue = false
    } else {
        $aside.style = 'transform: translateX(-100vw)'
        $svgBurger.style = 'display: block; opacity: 1; transform: translateX(100vw)';
        $svgCloseMenu.style = 'display: none; opacity: 0; transform: translateX(100vw)';
        menuValue = true
    }
}

//* Event listeners
$btnStart.addEventListener('click', start)

$btnMenu.addEventListener('click', toggleMenu)