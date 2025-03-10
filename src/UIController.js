import { todoApp } from './todoApp.js'

export const UIController =(function(){
    //targeting content and sidebar regions
    let mainProjectArea = document.querySelector('#content')
    let navProjectArea = document.querySelector('#navProjects')
    //targeting side nav buttons
    let newProjectButton = document.querySelector('#createNewProject')
    let infoButton = document.querySelector('#infoButton')
    let wipeProjectsButton = document.querySelector('#deleteAllProjectsButton')
    //target newProjectModal which pre exists inside our html template, and target its specific input fields and buttons
    let newProjectModal = document.querySelector('#newProjectModal') 
    let newProjectNameInput = document.querySelector('#newProjectName')
    let newProjectDescriptionInput = document.querySelector('#newProjectDescription')
    let newProjectModalSaveButton = document.querySelector('#saveNewProject')
    let newProjectModalCancelButton = document.querySelector('#cancelNewProject')
    let newProjectNameLabel = document.querySelector('#newProjectNameLabel')

    //invocations on load/refresh
    populateNavProjects()
    drawExplainer()

    //function that generates links for active projects on nav sidebar
    function populateNavProjects(){
        for(let i= 0;  i<todoApp.projects.length; i++){
            let tempProject = document.createElement('li')
            tempProject.textContent = todoApp.projects[i].title
            tempProject.style.listStyleType = 'none'
            tempProject.style.color = "red"
            tempProject.style.fontWeight = "bold"
            tempProject.dataset.projectIndex = i
            let projectDeleteButton = document.createElement('button')
            projectDeleteButton.innerText = '-'
            projectDeleteButton.type = 'button'
            projectDeleteButton.dataset.sideButtonIndex = i
            tempProject.appendChild(projectDeleteButton)
            navProjectArea.appendChild(tempProject)
        }
        createSideProjectDeleteButtons()

    }

    //event listener for info button which invokes drawExplainer
    infoButton.addEventListener('click', e=>{
        mainProjectArea.lastChild.remove()
        drawExplainer()
    })



    //listeners on side nav project delete buttons
    function createSideProjectDeleteButtons(){
        navProjectArea.addEventListener('click', e=>{
            if(!e.target.dataset.sideButtonIndex){return}
                todoApp.deleteProject(e.target.dataset.sideButtonIndex)
                wipeNavProjects()
                populateNavProjects()
            })  
        }


    //function to wipe side nav project list, used before repopulating list when a project has been added or deleted
    function wipeNavProjects(){
        navProjectArea.innerHTML=''
    }

    //variable that helps us keep track of which project is actively being viewed
    // let activeViewedProject;
        //not sure if i need it for now
    //delegate listener on #navProjects for project li's when clicked (use dataset attribute)
    navProjectArea.addEventListener('click', (e)=>{
        //if what you're clicking on doesn't have a data-index attribute then do nothing
        if(!e.target.dataset.projectIndex){return}
        //otherwise, invoke viewProject function giving the function that data-index attribute value
        viewProject(e.target.dataset.projectIndex)
        //change the value of activeViewedProject
        // activeViewedProject = Number(e.target.dataset.projectIndex)
        
    })


    function drawExplainer(){
        let explainerContainer = document.createElement('div')
        let explainerHeader = document.createElement('h2')
        explainerHeader.innerText = "Welcome"
        explainerContainer.appendChild(explainerHeader)

        let explainerPara = document.createElement('p')
        explainerPara.innerText = 'To the left you can click on a project to open it, click on the - button beside it to delete it, create new projects, or delete all projects. This data can be accessed again by clicking the info button at the bottom of the side navigation bar. \n \n All data is stored on your computer browser in local storage, have no fear your data is your data'
        explainerContainer.appendChild(explainerPara)
        mainProjectArea.appendChild(explainerContainer)
    }


    //event listener for 'save' button which generates a new project
    newProjectModalSaveButton.addEventListener('click', ()=>{
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

    //event listener for cancel button, which again wipes input fields, and hides modal
    newProjectModalCancelButton.addEventListener('click', ()=>{
        newProjectNameInput.value = ''
        newProjectDescriptionInput.value = ''
        //hide modal
        newProjectModal.style.display = 'none'

    })

    //click to show create new project modal
    newProjectButton.addEventListener('click', ()=>{
        if(newProjectModal.style.display !== 'grid'){
            newProjectModal.style.display = 'grid'
        }else{
            newProjectNameInput.value = ''
            newProjectDescriptionInput.value = ''
            newProjectModal.style.display = 'none'
        }
    })

    // wipeProjectsButton listener
    wipeProjectsButton.addEventListener('click', ()=>{
        let userWipeConfirm = prompt("Are you sure you want to wipe )everything?(true/false) ")
        if(userWipeConfirm==='true'){
            if(Array.from(document.querySelectorAll('#navProjects li')).length>0){
                todoApp.startANew()
                wipeNavProjects()
                populateNavProjects()
                mainProjectArea.lastChild.remove()
                drawExplainer()
            }
        }
    })








    //time to remake everything
    function viewProject(projectIndex){
        //wipe project view area in case a project was being shown (lastChild because it was appended after the hidden modals)
        mainProjectArea.removeChild(mainProjectArea.lastChild)
        //pull project from imported projects array, Project object
        let currentProject = todoApp.projects[projectIndex]
        //create div element for this project to be displayed
        let buildProject = document.createElement('div')
        //build a div that holds the project title, and changeprojecttitle button
        let projectTitleArea = document.createElement('section')
        //create h3 which wraps projects title, give it content, append it to div temp project variable
        let buildProjectTitle = document.createElement('h3')
        buildProjectTitle.innerText = `Project Name: ${currentProject.title}`
        projectTitleArea.appendChild(buildProjectTitle)
        let changeProjectTitleButton = document.createElement('button')
        changeProjectTitleButton.type = 'button'
        changeProjectTitleButton.innerText = 'Change Name'
        projectTitleArea.appendChild(changeProjectTitleButton)
        buildProject.appendChild(projectTitleArea)


        changeProjectTitleButton.addEventListener('click', e=>{
            //if this modal exists remove it
            if(document.querySelector('#changeProjectTitleModal')){
                document.querySelector('#changeProjectTitleModal').remove()
            }
            let changeProjectTitleModal = document.createElement('aside')
            changeProjectTitleModal.id = 'changeProjectTitleModal'
            changeProjectTitleModal.style.display = 'grid'
            let changeProjectTitleModalHeader = document.createElement('h4')
            changeProjectTitleModalHeader.innerText = 'Change Project Name'
            changeProjectTitleModal.appendChild(changeProjectTitleModalHeader)
            let priorProjectTitle = document.createElement('p')
            priorProjectTitle.innerText = `Previous Title: ${todoApp.projects[projectIndex].title}`
            changeProjectTitleModal.appendChild(priorProjectTitle)
            //label for input field to change project title value
            let newProjectTitleModalLabel = document.createElement('label')
            newProjectTitleModalLabel.innerText = 'New Title: '
            //input for new project title, is nested by label
            let newProjectModalTitleInput = document.createElement('input')
            newProjectModalTitleInput.placeholder = 'Minimum 3 characters'
            newProjectModalTitleInput.id = 'newProjectModalTitleInput'
            newProjectTitleModalLabel.appendChild(newProjectModalTitleInput)
            newProjectTitleModalLabel.setAttribute('for', 'newProjectModalTitleInput')
            //append label into changeProjectTitleModal
            changeProjectTitleModal.appendChild(newProjectTitleModalLabel)
            //create div to place buttons in for easier styling
            let changeProjectTitleButtonDiv = document.createElement('div')
            //change value button
            let changeProjectTitleButton = document.createElement('button')
            changeProjectTitleButton.type = 'button'
            changeProjectTitleButton.innerText = "Change"
            changeProjectTitleButtonDiv.appendChild(changeProjectTitleButton)
            //cancel button
            let cancelChangeProjectTitleButton = document.createElement('button')
            cancelChangeProjectTitleButton.type = 'button'
            cancelChangeProjectTitleButton.innerText = "Cancel"
            changeProjectTitleButtonDiv.appendChild(cancelChangeProjectTitleButton)
            changeProjectTitleModal.appendChild(changeProjectTitleButtonDiv)
            mainProjectArea.appendChild(changeProjectTitleModal)
            //event listeners for changeProjectTitleButton and cancelChangeProjectTitleButton
            changeProjectTitleButton.addEventListener('click', e=>{
                if(newProjectModalTitleInput.value.length>2){
                    todoApp.projects[projectIndex].changeProjectTitle(newProjectModalTitleInput.value)
                    changeProjectTitleModal.remove()
                    viewProject(projectIndex)
                    wipeNavProjects()
                    populateNavProjects()
                }else{
                    newProjectModalTitleInput.style.borderColor = 'red'
                    setTimeout(() => {
                        let nameLengthError = document.createElement('span')
                        nameLengthError.innerText = 'Project Name must be at least 3 characters long'
                        nameLengthError.style.display = 'block'
                        nameLengthError.style.color = 'red'
                        newProjectTitleModalLabel.after(nameLengthError)
                    }, 100);
                    //after 3 seconds remove the error message and styling
                    setTimeout(() => {
                        newProjectModalTitleInput.style.borderColor = ''
                        changeProjectTitleModal.querySelector('span').remove()
                    }, 3000);
                }
            })
            cancelChangeProjectTitleButton.addEventListener('click', e=>{
                changeProjectTitleModal.remove()
            })
        })


        //create project descriptiion container using a div to hold text output and button
        let projectDescriptionArea = document.createElement('section')
        //create paragraph element which tells user their projects description
        let buildProjectDescription = document.createElement('p')
        buildProjectDescription.innerText = `Project Description: ${currentProject.description}`
        projectDescriptionArea.appendChild(buildProjectDescription)
        
        //change project description button 
        let changeProjectDescriptionButton = document.createElement('button')
        changeProjectDescriptionButton.type = 'button'
        changeProjectDescriptionButton.innerText = 'Change Description'
        projectDescriptionArea.appendChild(changeProjectDescriptionButton)
        buildProject.appendChild(projectDescriptionArea)
        //event listener ont hat button to change project description
        changeProjectDescriptionButton.addEventListener('click', e=>{
            if(document.querySelector('#changeProjectDescriptionModal')){
                document.querySelector('#changeProjectDescriptionModal').remove()
            }
            let changeProjectDescriptionModal = document.createElement('aside')
            changeProjectDescriptionModal.id = 'changeProjectDescriptionModal'
            changeProjectDescriptionModal.style.display = 'grid'
            let changeProjectDescriptionHeader = document.createElement('h3')
            changeProjectDescriptionHeader.innerText = "Change Project Description"
            changeProjectDescriptionModal.appendChild(changeProjectDescriptionHeader)

            let changeProjectDescriptioOldValue = document.createElement('p')
            changeProjectDescriptioOldValue.innerText = `Old value: ${todoApp.projects[projectIndex].description}`
            changeProjectDescriptionModal.appendChild(changeProjectDescriptioOldValue)
            let changeProjectDescriptionLabel = document.createElement('label')
            changeProjectDescriptionLabel.innerText = 'New Description: '
            let changeProjectDescriptionInput = document.createElement('input')
            changeProjectDescriptionInput.id = 'changeProjectDescriptionInput'
            changeProjectDescriptionLabel.setAttribute('for', 'changeProjectDescriptionInput')
            changeProjectDescriptionLabel.appendChild(changeProjectDescriptionInput)
            changeProjectDescriptionModal.appendChild(changeProjectDescriptionLabel)
            //create section to house save and cancel buttons
            let changeProjectDescriptionButtons = document.createElement('section')
            let changeProjectDescriptionSaveButton = document.createElement('button')
            changeProjectDescriptionSaveButton.type = 'button'
            changeProjectDescriptionSaveButton.innerText = "Change"
            changeProjectDescriptionButtons.appendChild(changeProjectDescriptionSaveButton)
            let changeProjectDescriptionCancelButton = document.createElement('button')
            changeProjectDescriptionCancelButton.type = 'button'
            changeProjectDescriptionCancelButton.innerText = 'Cancel'
            changeProjectDescriptionButtons
            changeProjectDescriptionButtons.appendChild(changeProjectDescriptionCancelButton)
            changeProjectDescriptionModal.appendChild(changeProjectDescriptionButtons)

            mainProjectArea.appendChild(changeProjectDescriptionModal)

            //event listeners on the save and cancel buttons
            changeProjectDescriptionSaveButton.addEventListener('click', e=>{
                todoApp.projects[projectIndex].changeProjectDescription(changeProjectDescriptionInput.value)
                changeProjectDescriptionModal.remove()
                viewProject(projectIndex)
            })
            changeProjectDescriptionCancelButton.addEventListener('click', e=>{
                changeProjectDescriptionModal.remove()
            })

        })


        //create todo area div that will hold the add todo button and the rendered todo elements
        let projectTodoArea = document.createElement('section')
        //button that allows users to add todo's to their projects, listener for this button will follow the creation of todo elements
        let createTodoButton = document.createElement('button')
        createTodoButton.type = 'button'
        createTodoButton.innerText = 'Add Todo'
        projectTodoArea.appendChild(createTodoButton)

        //create a ul where todo items will be inserted, a todo container if you must describe it
        let buildProjectTodos = document.createElement('ul')
        buildProjectTodos.style.padding = '3%'
        projectTodoArea.appendChild(buildProjectTodos)
        buildProject.appendChild(projectTodoArea)

        //listener on the createTodoButton, builds newTodoModal and displays it to user, includes buttons with own listeners to actually build todos
        createTodoButton.addEventListener('click', e=>{
            //check if this modal exists, if so remove it
            let existingModal = document.querySelector('#newTodoModalAside')
            if(existingModal){
                existingModal.remove()
            }
            //build modal
            let newTodoModal = document.createElement('aside')
            newTodoModal.id = 'newTodoModalAside'
            //build elements for users to input data and append them into newTodoModal:
            let newTodoModalHeader = document.createElement('h3')
            newTodoModalHeader.innerText = 'Create New Todo'
            newTodoModal.appendChild(newTodoModalHeader)
            //label and input elements for users todo name input
            let newTodoNameLabel = document.createElement('label')
            newTodoNameLabel.innerText = 'Todo Name: * '
            let newTodoNameInput = document.createElement('input')
            newTodoNameInput.id = 'newTodoNameInputField'
            newTodoNameInput.placeholder='Minimum 3 characters'
            newTodoNameLabel.setAttribute('for', 'newTodoNameInputField')
            newTodoNameLabel.appendChild(newTodoNameInput)
            newTodoModal.appendChild(newTodoNameLabel)
            //label and input elements for users todo description input
            let newTodoDescriptionLabel = document.createElement('label')
            newTodoDescriptionLabel.innerText = 'Todo Description: '
            let newTodoDescriptionInput = document.createElement('input')
            newTodoDescriptionInput.id = 'newTodoDescriptionInputField'
            newTodoDescriptionLabel.appendChild(newTodoDescriptionInput)
            newTodoDescriptionLabel.setAttribute('for', 'newTodoDescriptionInputField')
            newTodoModal.appendChild(newTodoDescriptionLabel)
            //label and input field for users todo priority input
            let newTodoPriorityLabel = document.createElement('label')
            newTodoPriorityLabel.innerText = 'Todo Priority'
            let newTodoPriorityInput = document.createElement('input')
            newTodoPriorityInput.type = 'number'
            newTodoPriorityInput.id = 'newTodoPriorityInput'
            newTodoPriorityInput.placeholder = '0=lowest, 10=highest'
            newTodoPriorityLabel.setAttribute('for', 'newTodoPriorityInput')
            newTodoPriorityLabel.appendChild(newTodoPriorityInput)
            newTodoModal.appendChild(newTodoPriorityLabel)
            //label and input field for users todo duedate input
            let newTodoDuedateLabel = document.createElement('label')
            newTodoDuedateLabel.innerText = 'Todo Due Date:'
            let newTodoDuedateInput = document.createElement('input')
            newTodoDuedateInput.id = 'newTodoDueDateInput'
            newTodoDuedateInput.type = 'date'
            newTodoDuedateLabel.appendChild(newTodoDuedateInput)
            newTodoDuedateLabel.setAttribute('for', 'newTodoDueDateInput')
            newTodoModal.appendChild(newTodoDuedateLabel)
            //button for saving input as a new todo
            let saveNewTodoButton = document.createElement('button')
            saveNewTodoButton.type = 'button'
            saveNewTodoButton.innerText = "Save Todo"
            newTodoModal.appendChild(saveNewTodoButton)
            //button for cancelling making a new todo and will wipe modal input fields
            let cancelNewTodoButton = document.createElement('button')
            cancelNewTodoButton.type = 'button'
            cancelNewTodoButton.innerText = 'Cancel'
            newTodoModal.appendChild(cancelNewTodoButton)

            //add modal to project area
            mainProjectArea.appendChild(newTodoModal)

            //show newTodoModal element to user, as it's hidden by default, yet create a toggle on the button to hide the modal if clicked again
            newTodoModal.style.display = 'grid'

            //listener code for save new todo, and cancel buttons
            saveNewTodoButton.addEventListener('click', e=>{
                if(newTodoNameInput.value.length>2){
                    currentProject.createTodo(newTodoNameInput.value, newTodoDescriptionInput.value, newTodoPriorityInput.value, newTodoDueDateInput.value)
                    newTodoNameInput.value = ''
                    newTodoDescriptionInput.value = ''
                    newTodoPriorityInput.value = ''
                    newTodoDueDateInput.value = ''
                    newTodoModal.style.display = 'none'
                    //rerender project with this new todo and remove the modal
                    newTodoModal.remove()
                    viewProject(projectIndex)
                }else{
                    let todoNameLengthError = document.createElement('p')
                    setTimeout(() => {
                        todoNameLengthError.innerText = 'Name needs to have a length of at least 3 characters'
                        todoNameLengthError.style.color = 'red'
                        newTodoNameInput.after(todoNameLengthError)
                        newTodoNameInput.style.borderColor = 'red'
                    }, 1);
                    setTimeout(() => {
                        newTodoNameInput.style.borderColor = ''
                        todoNameLengthError.remove()
                    }, 3000);
                }
            })

            cancelNewTodoButton.addEventListener('click', e=>{
                newTodoModal.remove()
            })


        })




        //build todo items
        function buildTodoItem(todo, index){
            let newTodoItem = document.createElement('li')
            newTodoItem.style.border = '1px solid pink'
            newTodoItem.dataset.todoItemIndex = index
            let newTodoName = document.createElement('h4')
            newTodoName.innerText = `Todo Name: ${todo.name}`
            //button to change name:


            newTodoItem.appendChild(newTodoName)
            let newTodoDescription = document.createElement('p')
            newTodoDescription.innerText = `Todo Description: ${todo.description}`
            //button to change description:


            newTodoItem.appendChild(newTodoDescription)
            let newTodoDuedate = document.createElement('p')
            newTodoDuedate.innerText = `Todo Due Date:${todo.dueDate}`
            //button to change due date:


            newTodoItem.appendChild(newTodoDuedate)
            let newTodoPriority = document.createElement('p')
            newTodoPriority.innerText = `Todo Priority: ${Number(todo.priority)}`
            //button to chang todo priority:


            newTodoItem.appendChild(newTodoPriority)
            if(todo.priority<3){
                newTodoItem.style.backgroundColor = 'lightgreen'
            }else if(todo.priority<7){
                newTodoItem.style.backgroundColor = 'yellow'
            }else{
                newTodoItem.style.backgroundColor = 'red'
            }
            
            //container for notes, followed by for loop that will build note elements (li)
            let noteDisplayContainer = document.createElement('section')
            let noteUlContainer = document.createElement('ul')
            noteUlContainer.innerText = 'Todo Notes:'
            noteDisplayContainer.appendChild(noteUlContainer)
            if(todo.notes.length<1){noteUlContainer.innerText+='none'}
            for(let i = 0; i<todo.notes.length; i++){
                let tempNote = document.createElement('li')
                tempNote.innerText = todo.notes[i]
                let tempNoteChangeButton = document.createElement('button')
                tempNoteChangeButton.type = 'button'
                tempNoteChangeButton.innerText = 'Change'
                let tempNoteDeleteButton = document.createElement('button')
                tempNoteDeleteButton.type = 'button'
                tempNoteDeleteButton.innerText = 'X'
                tempNote.appendChild(tempNoteChangeButton)
                tempNote.appendChild(tempNoteDeleteButton)

                noteUlContainer.appendChild(tempNote)

                //event listeners for change and delete buttons for each note
                tempNoteChangeButton.addEventListener('click', e=>{
                    if(document.querySelector('#newNoteValueModal')){
                        document.querySelector('#newNoteValueModal').remove()
                    }
                    //modal for taking in new user note value
                    let newNoteValueModal = document.createElement('aside')
                    newNoteValueModal.id = 'newNoteValueModal'
                    newNoteValueModal.style.display = 'grid'
                    let newNoteValueModalHeader = document.createElement('h3')
                    newNoteValueModalHeader.innerText = 'Change Note Value'
                    newNoteValueModal.appendChild(newNoteValueModalHeader)
                    let newNoteValueModalLabel = document.createElement('label')
                    newNoteValueModalLabel.innerText = 'New Note Value: '
                    let newNoteValueModalInput = document.createElement('input')
                    newNoteValueModalInput.id = 'newNoteValueModalInput'
                    newNoteValueModalLabel.setAttribute('for', 'newNoteValueModalInput')
                    newNoteValueModalLabel.appendChild(newNoteValueModalInput)
                    newNoteValueModal.appendChild(newNoteValueModalLabel)
                    let newNoteValueModalButtonSection = document.createElement('section')
                    let newNoteValueModalSubmitButton = document.createElement('button')
                    newNoteValueModalSubmitButton.type = 'button'
                    newNoteValueModalSubmitButton.innerText = 'Submit'
                    newNoteValueModalButtonSection.appendChild(newNoteValueModalSubmitButton)
                    let newNoteValueModalCancelButton = document.createElement('button')
                    newNoteValueModalCancelButton.type = 'button'
                    newNoteValueModalCancelButton.innerText = "Cancel"
                    newNoteValueModalButtonSection.appendChild(newNoteValueModalCancelButton)
                    newNoteValueModal.appendChild(newNoteValueModalButtonSection)
                    mainProjectArea.appendChild(newNoteValueModal)
                    //event listeners for newNoteValueModal submit and cancel
                    newNoteValueModalSubmitButton.addEventListener('click', e=>{
                        todo.changeNote(newNoteValueModalInput.value, i)
                        document.querySelector('#newNoteValueModal').remove()
                        viewProject(projectIndex)
                    })
                    newNoteValueModalCancelButton.addEventListener('click', e=>{
                        document.querySelector('#newNoteValueModal').remove()
                    })
                    //event listener for delete note



                    //put this following in an event listener on a submit button
                    // todo.notes[i].changeNote()
                })
                tempNoteDeleteButton.addEventListener('click', e=>{
                    todo.deleteNote(i)
                    viewProject(projectIndex)
                })







            }
            //note button for users to add notes duh
            let addNoteButton = document.createElement('button')
            addNoteButton.type = 'button'
            addNoteButton.innerText = "Add Note"
            noteDisplayContainer.appendChild(addNoteButton)
            //event listener that creates note modal so users can add a new note
            addNoteButton.addEventListener('click', e=>{
                if(document.querySelector('#addNoteModal')){
                    document.querySelector('#addNoteModal').remove()
                }
                let addNoteModal = document.createElement('aside')
                addNoteModal.style.display = 'grid'
                addNoteModal.id = 'addNoteModal'
                let addNoteHeader = document.createElement('h3')
                addNoteHeader.innerText = "Add New Note"
                addNoteModal.appendChild(addNoteHeader)
                let addNoteLabel = document.createElement('label')
                addNoteLabel.innerText = "Todo Note: "
                let addNoteInput = document.createElement('input')
                addNoteInput.id = 'addNoteInput'
                addNoteLabel.appendChild(addNoteInput)
                addNoteLabel.setAttribute('for', 'addNoteInput')
                addNoteModal.appendChild(addNoteLabel)
                let addNoteModalButtonSection = document.createElement('section')
                let addNoteModalSubmitButton = document.createElement('button')
                addNoteModalSubmitButton.type = 'button'
                addNoteModalSubmitButton.innerText = 'Submit'
                let addNoteModalCancelButton = document.createElement('button')
                addNoteModalCancelButton.type = 'button'
                addNoteModalCancelButton.innerText = 'Cancel'
                addNoteModalButtonSection.appendChild(addNoteModalSubmitButton)
                addNoteModalButtonSection.appendChild(addNoteModalCancelButton)
                addNoteModal.appendChild(addNoteModalButtonSection)
                mainProjectArea.appendChild(addNoteModal)

                //event listeners for submit and cancel buttons:
                addNoteModalSubmitButton.addEventListener('click', e=>{
                    todo.addNote(addNoteInput.value)
                    addNoteModal.remove()
                    viewProject(projectIndex)
                })
                addNoteModalCancelButton.addEventListener('click', e=>{
                    addNoteModal.remove()
                })
            })

            //note section into temp todo item
            newTodoItem.appendChild(noteDisplayContainer)


            //generate checklist items
            let checklistContainer = document.createElement('section')
            let checklistUlContainer = document.createElement('ul')
            for(let i = 0; i<todo.checklist.length; i++){
                let tempChecklistItem = document.createElement('li')
                let tempChecklistItemLabel = document.createElement('label')
                tempChecklistItemLabel.innerText = todo.checklist[i].description
                let tempChecklistItemCheck = document.createElement('input')
                tempChecklistItemCheck.type = 'checkbox'
                tempChecklistItemLabel.appendChild(tempChecklistItemCheck)
                //render checkmark if checklist item is checked in stored projects
                if(todo.checklist[i].checked===true){
                    tempChecklistItemCheck.setAttribute('checked', true)
                }
                //even listeners on the check boxes to change the checked value
                tempChecklistItemCheck.addEventListener('click', e=>{
                    todo.toggleChecklistItem(i)
                    viewProject(projectIndex)
                })
                tempChecklistItem.appendChild(tempChecklistItemLabel)
                checklistUlContainer.appendChild(tempChecklistItem)
            }

            checklistContainer.appendChild(checklistUlContainer)
            let addChecklistItemButton = document.createElement("button")
            addChecklistItemButton.type = 'button'
            addChecklistItemButton.innerText = "Create Checklist Item"
            addChecklistItemButton.id = 'addChecklistItemButton'
            checklistContainer.appendChild(addChecklistItemButton)
            //event listener for add checklist item button, shows a modal, modal has buttons to submit or cancel creation
            addChecklistItemButton.addEventListener('click', e=>{
                if(document.querySelector('#newChecklistModal')){
                    document.querySelector('#newChecklistModal').remove()
                }
                let newChecklistModal = document.createElement('aside')
                newChecklistModal.id = 'newChecklistModal'
                newChecklistModal.style.display = 'grid'
                let newChecklistModalHeader = document.createElement('h3')
                newChecklistModalHeader.innerText = "New Checklist Item"
                newChecklistModal.appendChild(newChecklistModalHeader)
                let newChecklistModalLabel = document.createElement('label')
                newChecklistModalLabel.innerText = 'Value: '
                let newChecklistModalInput = document.createElement('input')
                newChecklistModalInput.id = 'newChecklistModalInput'
                newChecklistModalLabel.appendChild(newChecklistModalInput)
                newChecklistModal.appendChild(newChecklistModalLabel)
                //button section
                let newChecklistModalButtonSection = document.createElement('section')
                let newChecklistModalSubmitButton = document.createElement('button')
                newChecklistModalSubmitButton.type = 'button'
                newChecklistModalSubmitButton.innerText = 'Submit'
                newChecklistModalButtonSection.appendChild(newChecklistModalSubmitButton)
                let newChecklistModalCancelButton = document.createElement('button')
                newChecklistModalCancelButton.type = 'button'
                newChecklistModalCancelButton.innerText = 'Cancel'
                newChecklistModalButtonSection.appendChild(newChecklistModalCancelButton)
                newChecklistModal.appendChild(newChecklistModalButtonSection)
                //event listeners on the submit and cancel button
                newChecklistModalSubmitButton.addEventListener('click', e=>{
                    todo.createChecklistItem(newChecklistModalInput.value)
                    newChecklistModal.remove()
                    viewProject(projectIndex)
                })
                newChecklistModalCancelButton.addEventListener('click', e=>{
                    newChecklistModal.remove()
                })

                mainProjectArea.appendChild(newChecklistModal)
            })
            //checklist items into temp todo item
            newTodoItem.appendChild(checklistContainer)

            



            //add delete todo button
            let todoButtonContainer = document.createElement('section')
            let deleteTodoButton = document.createElement('button')
            deleteTodoButton.type = 'button'
            deleteTodoButton.innerText = 'Delete Todo'
            todoButtonContainer.appendChild(deleteTodoButton)
            //event listener for delete todo button
            deleteTodoButton.addEventListener('click', e=>{
                let userConfirmationTodoDelete = prompt("Are you sure you want to delete this todo? (yes/no)")
                if(userConfirmationTodoDelete==='no'){
                    return
                }else{
                    todoApp.projects[projectIndex].deleteTodo(index)
                    viewProject(projectIndex)
                }
            })






            //add toggle todo, so users can complete or uncomplete a todo
            let toggleTodoButton = document.createElement('button')
            toggleTodoButton.type = 'button'
            toggleTodoButton.innerText = 'Toggle Todo'
            //event listener for this toggle button
            toggleTodoButton.addEventListener('click', e=>{
                todo.toggleTodo(index)
                if(todo.complete===true){
                    newTodoItem.style.textDecoration = 'line-through'
                }else{
                    newTodoItem.style.textDecoration = 'none'
                }
            })
            //add button to button container of div
            todoButtonContainer.appendChild(toggleTodoButton)








            newTodoItem.appendChild(todoButtonContainer)

            //return temp todo item, as this function will be called by a for loop that appends these todos (li's) into a list (ul)
            return newTodoItem

        }

        //loop that inserts html elements for todo items of project
        for(let i = 0; i<todoApp.projects[projectIndex].todos.length; i++){
            buildProjectTodos.appendChild(buildTodoItem(todoApp.projects[projectIndex].todos[i]), i)
        }

        //add project into main element
        mainProjectArea.appendChild(buildProject)
    }
})()