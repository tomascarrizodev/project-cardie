//* Projects with their notes
let data = {
    project: [
        {
            type: 'sticky',
            title: '',
            body: '',
            color: 'blue',
            tags: ['school', 'maths']
        },
        {
            type: 'ul',
            style: 'dotted',
            title: '',
            body: [
                'frist step',
                'second',
                'third'
            ],
            color: 'blue',
            tags: ['school', 'maths']
        },
        {
            type: 'ol',
            style: 'num',
            title: '',
            body: [
                'frist step',
                'second',
                'third'
            ],
            color: 'blue',
            tags: ['school', 'maths']
        },
        {
            type: 'check',
            title: '',
            body: [
                'frist step',
                'second',
                'third'
            ],
            color: 'blue',
            tags: ['school', 'maths'],
            checks: [1, 2],
            checked: 'largo'
        }
    ]
}

//* Visual elements
const $welcome = document.querySelector('#welcome');
const $main = document.querySelector('#main');
const $aside = document.querySelector('#aside');

const $ownerName = document.querySelector('#owner-container-name')

const $deleteContainer = document.querySelector('#delete-project-container');

const $projectNameMain = document.querySelector('#project-name');

const $newItemMenu = document.querySelector('#new-item-menu');

//* Funcional elements
const $nameCardie = document.querySelector('#name-input');
const $projectNameCardie = document.querySelector('#name-project-input');
const $btnStart = document.querySelector('#btn-start');

const $btnNewProject = document.querySelector('#btn-new-project');

let menuValue = true
const $btnMenu = document.querySelector('#btn-menu');
const $svgBurger = document.querySelector('#btn-burger');
const $svgCloseMenu = document.querySelector('#btn-close-menu');

const $projectContainer = document.querySelector('#project-container');

let $deleteProjectName = document.querySelector('#delete-project-name')
const $cancelDeleteProject = document.querySelector('#delete-project-btn-cancel')
const $confirmDeleteProject = document.querySelector('#delete-project-btn-confirm')

const $btnCreateNote = document.querySelector('#create-btn');

const $btnCancelNewItem = document.querySelector('#btn-cancel-new-item');

const $btnNewStickyMenu = document.querySelector('#btn-new-sticky');

//* Variables
const closeSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path
            d = "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </svg > 
`

let projectCounter = 0
let projectCurrent
const regex = /^[a-zA-Z 0-9!?,.:;]*[a-zA-Z ][a-zA-Z 0-9!?,.:;]*$/
let valueNewInput
let creating = false

let projectsCreated = []
let projectsCreatedArr = []

let deletingProject
let deleteProjectID

//* Visual functions
function newElement(elem) {
    return document.createElement(elem)
}

function start() {
    let owner = $nameCardie.value.trim()
    let projectName = $projectNameCardie.value.trim()

    if (owner.match(regex) && projectName.match(regex)) {
        // animacion del start al main
        $welcome.classList.add('disapear')

        setTimeout(() => {
            $welcome.style.display = 'none'
            $main.style.display = 'block'

            setTimeout(() => {
                $main.classList.remove('disapear')
            }, 300);

        }, 300)

        // creaccion del project en el menu
        
        let div = newElement('div')
        div.setAttribute('class', 'project project-on')
        div.setAttribute('id', `project-${projectCounter}`)

        let button = newElement('button')
        button.setAttribute('id', `btn-${projectCounter}`)
        button.setAttribute('class', 'menu-project')
        button.setAttribute('onclick', 'showDeleteProjectMenu()')

        let span = newElement('span')
        span.setAttribute('id', `project-name-${projectCounter}`)
        span.textContent = projectName

        button.innerHTML = closeSvg
        div.appendChild(button)
        div.appendChild(span)

        $projectNameMain.textContent = projectName

        $projectContainer.append(div)

        projectsCreated.push(projectName)
        projectsCreatedArr.push(div)

        data[`project-${projectCounter}`] = []
        
        $ownerName.innerHTML = owner[0].toUpperCase() + owner.slice(1) + "'s Cardie"

        projectCurrent = projectName
        projectCounter++
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

function newProject() {
    if (creating == false) {
        
        let div = newElement('div')
        div.setAttribute('class', 'project')
        div.setAttribute('id', 'new-project-temp')

        let input = newElement('input')
        input.setAttribute('type', 'text')
        input.setAttribute('id', 'input-new-project')

        let btnConfirm = newElement('button')
        btnConfirm.setAttribute('id', 'confirm-new-project')
        btnConfirm.textContent = 'Confirm'
        btnConfirm.setAttribute('onclick', `confirmNewProject()`)
        
        let btnCancel = newElement('button')
        btnCancel.setAttribute('id', 'cancel-new-project')
        btnCancel.textContent = 'Cancel'
        btnCancel.setAttribute('onclick', `cancelNewProject()`)
        
        div.appendChild(input)
        div.appendChild(btnConfirm)
        div.appendChild(btnCancel)

        $projectContainer.appendChild(div)

        input.focus()

        creating = true
    } else {
        return false
    }
}

function confirmNewProject() {
    let $input = document.querySelector('#input-new-project');
    let repeated = false
    if (!$input.value.match(regex)) {
        alert('Ingresa un texto valido')
    } else {
        for (let i = 0; i < projectsCreated.length; i++) {
            if ($input.value == projectsCreated[i]) {
                repeated = true
            }
        }
        if (repeated == false) {
            createNewProject($input)
        } else {
            alert('Proyecto ya creado')
        }
    }
}

function cancelNewProject() {
    let $newProject = document.querySelector('#new-project-temp');
    $projectContainer.removeChild($newProject)
    creating = false
}

function createNewProject(input) {

    let div = newElement('div')
    div.setAttribute('class', 'project')
    div.setAttribute('id', `project-${projectCounter}`)

    let button = newElement('button')
    button.setAttribute('id', `btn-${projectCounter}`)
    button.setAttribute('class', 'menu-project')
    button.setAttribute('onclick', 'showDeleteProjectMenu()')

    let span = newElement('span')
    span.setAttribute('id', `project-name-${projectCounter}`)
    span.textContent = input.value

    button.innerHTML = closeSvg
    div.appendChild(button)
    div.appendChild(span)

    $projectContainer.append(div)

    data[`project-${projectCounter}`] = []

    projectCounter++
    projectsCreated.push(input.value)
    projectsCreatedArr.push(div)
    cancelNewProject()
}

function showDeleteProjectMenu() {
    $deleteContainer.style = 'display: block;'
}

function cancelDeleteProject() {
    $deleteContainer.style = 'display: none;'
}

function confirmDeleteProject() {
    console.log(deleteProjectID)
    document.querySelector(`#${deleteProjectID}`).remove()
    delete data[deleteProjectID]
    cancelDeleteProject()
}

function cancelNewItem() {
    $newItemMenu.style.display = 'none'
}

function createNewStickyMenu() {

}

//* Event listeners
$btnStart.addEventListener('click', start)

$btnMenu.addEventListener('click', toggleMenu)

$btnNewProject.addEventListener('click', newProject)

$projectContainer.addEventListener('click', event => {
    let elem = event.target
    let deleteName
    let deleteID
    
    if (elem.tagName == 'path') {
        deleteName = elem.parentNode.parentNode.parentNode.querySelector('span').textContent
        deleteID = elem.parentNode.parentNode.parentNode.id
    }
    else if (elem.tagName == 'svg') {
        deleteName = elem.parentNode.parentNode.querySelector('span').textContent
        deleteID = elem.parentNode.parentNode.id
    } 
    else if (elem.tagName == 'button') {
        deleteName = elem.parentNode.querySelector('span').textContent
        deleteID = elem.parentNode.id
    }

    if (elem.tagName === 'SPAN') {
        projectsCreatedArr.forEach(e => {
            e.classList.remove('project-on')
        })
        elem.parentNode.classList.add('project-on')
        $projectNameMain.textContent = elem.textContent
    }
    else if (elem.tagName == 'DIV') {
        projectsCreatedArr.forEach(e => {
            e.classList.remove('project-on')
        })
        elem.classList.add('project-on')
        $projectNameMain.textContent = elem.querySelector('span').textContent
    }

    $deleteProjectName.textContent = deleteName
    deleteProjectID = deleteID
})

$cancelDeleteProject.addEventListener('click', cancelDeleteProject) 

$confirmDeleteProject.addEventListener('click', confirmDeleteProject)

$btnCreateNote.addEventListener('click', function () {
    $newItemMenu.style.display = 'flex'
})

$btnCancelNewItem.addEventListener('click', cancelNewItem)

$btnNewStickyMenu.addEventListener('click', function () {
    console.log('sticky')
})