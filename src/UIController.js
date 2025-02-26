import { todoApp } from './todoApp.js'

export const UIController =(function(){
    let mainProjectArea = document.querySelector('#content')
    let navProjectArea = document.querySelector('#navProjects')
    let newProjectButton = document.querySelector('#createNewProject')
    let mainBody = document.querySelector('body')

    //function that generates links for active projects on nav sidebar
    function populateNavProjects(){
        for(let i= 0;  i<todoApp.projects.length; i++){
            let tempProject = document.createElement('li')
            tempProject.textContent = todoApp.projects[i].title
            tempProject.style.listStyleType = 'none'
            tempProject.style.color = "red"
            tempProject.style.fontWeight = "bold"
            tempProject.dataset.index = i
            navProjectArea.appendChild(tempProject)
        }
    }

    //function to wipe side nav project list, used before repopulating list when a project has been added or deleted
    function wipeNavProjects(){
        navProjectArea.innerHTML=''
    }

    //delegate listener on #navProjects for project li's when clicked (use dataset attribute)
    navProjectArea.addEventListener('click', (e)=>{
        //placeholder as the generate function isn't complete
        console.log('viewProject function not complete yet')
        // viewProject(.target.dataset.index)
    })
    //offer ways of sorting projects, maybe in ways considering todo dueDates and priorities, or how many todos are remaining, etc




    //main content area where projects are opened up and todos can be seen and made which will be crossed out if completed, not crossed out if un complete, as well as a button to delete a todo item for any reason. If no projects exist maybe generate an example project or explanation text that tells a user how to create a new project
    //function that will create html content dynamically for a specific project
    function viewProject(project){
        //don't forget to add a dataset attribute which we'll use to pass to functions that require index positions, so for todos, checklists, and note items


    }
    populateNavProjects()

    //new project modal
    let newProjectModal = document.createElement('aside')
    newProjectModal.style.overflow = 'clip'
    //modals inner elements
    let newProjectTitle = document.createElement('h3')
    newProjectTitle.textContent = "Create New Project"
    newProjectModal.appendChild(newProjectTitle)

    let newProjectNameLabel = document.createElement('label')
    let newProjectNameInput = document.createElement('input')
    newProjectNameLabel.textContent = 'Project Name: *'
    newProjectNameInput.placeholder = '3 character minimum'
    newProjectNameLabel.appendChild(newProjectNameInput)
    newProjectModal.appendChild(newProjectNameLabel)

    let newProjectDescriptionLabel = document.createElement('label')
    newProjectDescriptionLabel.textContent = 'Project Description: '
    let newProjectDescriptionInput = document.createElement('input')
    newProjectDescriptionLabel.appendChild(newProjectDescriptionInput)
    newProjectModal.appendChild(newProjectDescriptionLabel)
    
    //styling modal 
    newProjectModal.style.position = 'absolute'
    newProjectModal.style.top = '25%'
    newProjectModal.style.left = '35%'
    newProjectModal.style.border = '1px solid black'
    newProjectModal.style.backgroundColor = 'lightgray'
    newProjectModal.style.textAlign = 'center'
    newProjectModal.style.borderRadius = '5%'
    //button to trigger saving of the new project
    let saveNewProject = document.createElement('button')
    saveNewProject.type = 'button'
    saveNewProject.textContent = "Save"
    newProjectModal.appendChild(saveNewProject)

    //hide modal by default
    newProjectModal.style.display = 'none'


    //event listener for 'save' button which generates a new project
    saveNewProject.addEventListener('click', ()=>{
        if(newProjectNameInput.value.length>2){
        //triggers createProject from todoApp
            todoApp.createProject(newProjectNameInput.value, newProjectDescriptionInput.value)
            //hide modal
            newProjectModal.style.display = 'none'
            //wipe input fields
            newProjectNameInput.value = ''
            newProjectDescriptionInput.value = ''
            //new project is rendered into sidebar
            wipeNavProjects()
            //regenerate list of projects in side nav
            populateNavProjects()
        }else{
            //tell user that their project name needs to be atleast 3 characters in length
            newProjectNameLabel.querySelector('input').style.borderColor = 'red'
            setTimeout(() => {
                let nameLengthError = document.createElement('span')
                nameLengthError.innerText = 'Project Name must be at least 3 characters long'
                nameLengthError.style.display = 'block'
                nameLengthError.style.color = 'red'
                newProjectNameLabel.after(nameLengthError)
            }, 100);
            //after 3 seconds remove the error message and styling
            setTimeout(() => {
                newProjectNameLabel.querySelector('input').style.borderColor = ''
                newProjectModal.querySelector('span').remove()
            }, 3000);

        }


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
        //hide modal
        newProjectModal.style.display = 'none'

    })

    mainBody.appendChild(newProjectModal)

    //click to show create new project modal
    newProjectButton.addEventListener('click', ()=>{
        //unhide create project modal
        newProjectModal.style.display = ""
    })






    //generate projects that are saved (function), this would be in the main section, within the notes and checklist ul's create buttons to add notes and checklist items, and within those notes and checklist items create buttons to delete those items. These checklist items will also be able to have a cross through them or not depending on if they have been completed.

    //generate projects as a list item in the nav's ul, and give them buttons inside their list items that allows a user to delete the projects, of course prompt with a modal if they are sure they want to delete the project.

    //generate project when user creates it (same function as above just called at different time (listener on a button that exists in the nav element))

    //don't forget that functions that add or delete things will need to repaint the page to include/exclude added/deleted items

    
})()