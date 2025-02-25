import { todoApp } from './todoApp.js'

export const UIController =(function(){
    //Generate site layout elements //mostly done with template
        //sidebar with projects in a list (could sort these later with uncompleted task count vs due dates/etc), including a button where a new project can be made
        //main content area where projects are opened up and todos can be seen and made which will be crossed out if completed, not crossed out if un complete, as well as a button to delete a todo item for any reason. If no projects exist maybe generate an example project or explanation text that tells a user how to create a new project
    let mainProjectArea = document.querySelector('#content')
    let navProjectArea = document.querySelector('navProjects')
    let newProjectButton = document.querySelector('#createNewProject')
    let mainBody = document.querySelector('body')

    console.log(todoApp.projects)
    function generateSavedProjects(){
        for(let savedProject in todoApp.projects){
            console.log('test')
            //don't forget to add a dataset attribute which we'll use to pass to functions that require index positions
        }
    }
    generateSavedProjects()

    //new project modal
    let newProjectModal = document.createElement('div')
    newProjectModal.style.overflow = 'clip'
    //modals inner elements
    let newProjectTitle = document.createElement('h3')
    newProjectTitle.textContent = "Create New Project"
    newProjectModal.appendChild(newProjectTitle)

    let newProjectNameLabel = document.createElement('label')
    let newProjectNameInput = document.createElement('input')
    newProjectNameLabel.textContent = 'Project Name: '
    newProjectNameLabel.appendChild(newProjectNameInput)
    newProjectModal.appendChild(newProjectNameLabel)

    let newProjectDescriptionLabel = document.createElement('label')
    newProjectDescriptionLabel.textContent = 'Project Description: '
    let newProjectDescriptionInput = document.createElement('input')
    newProjectDescriptionLabel.appendChild(newProjectDescriptionInput)
    newProjectModal.appendChild(newProjectDescriptionLabel)
    //styling modal inner elements
    newProjectNameLabel.style.display = 'block'
    newProjectDescriptionLabel.style.display = 'block'
    newProjectNameInput.style.marginLeft = "45px"
    newProjectDescriptionInput.style.marginLeft = "10px"

    
    //styling modal 
    newProjectModal.style.position = 'absolute'
    newProjectModal.style.top = '25%'
    newProjectModal.style.left = '35%'
    newProjectModal.style.border = '1px solid black'
    newProjectModal.style.backgroundColor = 'lightgray'
    newProjectModal.style.textAlign = 'center'
    newProjectModal.style.width = '0%'
    newProjectModal.style.height = '0%'
    newProjectModal.style.borderRadius = '5%'
    //button to trigger saving of the new project
    let saveNewProject = document.createElement('button')
    saveNewProject.type = 'button'
    saveNewProject.textContent = "Save"
    newProjectModal.appendChild(saveNewProject)
    saveNewProject.style.marginTop = '15px'
    //event listener for 'save' button which generates a new project
    saveNewProject.addEventListener('click', ()=>{
        //triggers createProject from todoApp
        todoApp.createProject(newProjectNameInput.value, newProjectDescriptionInput.value)
        //hide modal
        newProjectModal.style.width = '0%'
        newProjectModal.style.height = '0%'
        //wipe input fields
        newProjectNameInput.value = ''
        newProjectDescriptionInput.value = ''
        //new project is rendered into sidebar
        
    })
    //button to allow users to exit the modal, which also wipes any values entered into input fields and hides modal
    let modalCancelButton = document.createElement('button')
    modalCancelButton.type = 'button'
    modalCancelButton.textContent = 'Cancel'
    newProjectModal.appendChild(modalCancelButton)

    //event listener for cancel button, which again wipes input fields, and hides modal
    modalCancelButton.addEventListener('click', ()=>{
        newProjectNameInput.value = ''
        newProjectDescriptionInput.value = ''
        newProjectModal.style.width = '0%'
        newProjectModal.style.height = '0%'
    })

    mainBody.appendChild(newProjectModal)

    //click to show create new project modal
    newProjectButton.addEventListener('click', ()=>{
        //unhide create project modal
            newProjectModal.style.width = '50%'
            newProjectModal.style.height = '20%'
    })






    //generate projects that are saved (function), this would be in the main section, within the notes and checklist ul's create buttons to add notes and checklist items, and within those notes and checklist items create buttons to delete those items. These checklist items will also be able to have a cross through them or not depending on if they have been completed.

    //generate projects as a list item in the nav's ul, and give them buttons inside their list items that allows a user to delete the projects, of course prompt with a modal if they are sure they want to delete the project.

    //generate project when user creates it (same function as above just called at different time (listener on a button that exists in the nav element))

    //don't forget that functions that add or delete things will need to repaint the page to include/exclude added/deleted items

    
})()