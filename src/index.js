import { todoApp } from './todoApp.js'

//link the imported module to the window object thus allowing us to call from todoApp while our users are interacting inside the browsers window.
window.todoApp = todoApp