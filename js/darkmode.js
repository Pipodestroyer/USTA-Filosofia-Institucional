let darkmode = localStorage.getItem('darkmode')
const themeswitch = document.getElementById('themeswitch')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeswitch.addEventListener("click", () =>{
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

const themeswitchmobile = document.getElementById('mobile-themeswitch')

themeswitchmobile.addEventListener("click", () =>{
    darkmodemobile = localStorage.getItem('darkmode')
    darkmodemobile !== "active" ? enableDarkmode() : disableDarkmode()
})

let dropdown = localStorage.getItem('dropdown')
const menu = document.getElementById('menu')
const drops = document.getElementById('mobile-dropdown')
const home = document.getElementsByClassName('container')[0];


const enableDropdown = () => {
    drops.classList.add('show')
    home.classList.add('show')
    document.body.classList.add('show')
    localStorage.setItem('dropdown', 'active')
}

const disableDropdown = () => {
    drops.classList.remove('show')
    home.classList.remove('show')
    document.body.classList.remove('show')
    localStorage.setItem('dropdown', null)
}

if(dropdown === "active") disableDropdown()

menu.addEventListener("click", () =>{
    dropdown = localStorage.getItem('dropdown')
    dropdown !== "active" ? enableDropdown() : disableDropdown()
})