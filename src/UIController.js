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
        //create h3 which wraps projects title, give it content, append it to div temp project variable
        let buildProjectTitle = document.createElement('h3')
        buildProjectTitle.innerText = `Project Name: ${currentProject.title}`
        buildProject.appendChild(buildProjectTitle)

        //create change project title button here then add its event listener logic:


        //create paragraph element which tells user their projects description
        let buildProjectDescription = document.createElement('p')
        buildProjectDescription.innerText = `Project Description: ${currentProject.description}`
        buildProject.appendChild(buildProjectDescription)
    
        //create change project description button here then add its even listener logic:


        //button that allows users to add todo's to their projects, listener for this button will follow the creation of todo elements
        let createTodoButton = document.createElement('button')
        createTodoButton.type = 'button'
        createTodoButton.innerText = 'Add Todo'
        buildProject.appendChild(createTodoButton)

        //create a ul where todo items will be inserted, a todo container if you must describe it
        let buildProjectTodos = document.createElement('ul')
        buildProjectTodos.style.padding = '3%'
        buildProject.appendChild(buildProjectTodos)

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
            
            //notes
                //generate note elements, with delete and edit buttons beside or below it
                //add note button, which generates modal
                    //Add note header
                    //notes description field inside label
                    //save note button
                    //cancel note creation button
            //checklists
                //generate checklist items with their text as innerText of a checkbox input element, delete and change buttons beside or below them
                //add checklist item button, which generates a modal
                    //add checklist item header
                    //checklist description field inside label
                    //save checklist item
                    //cancel creation of checklist item





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




//old code:



    // //main content area where projects are opened up and todos can be seen and made which will be crossed out if completed, not crossed out if un complete, as well as a button to delete a todo item for any reason. If no projects exist maybe generate an example project or explanation text that tells a user how to create a new project
    // //function that will create html content dynamically for a specific project
    // function viewProject(projectIndex){





    //     //function that builds preexisting todo item nodes in view, it gets passed each todo object from a project, and its index in the todos array...
    //     function buildTodo(todo, index){
    //         let todoContainer = document.createElement('li')
    //         todoContainer.style.border = '1px solid black'
    //         todoContainer.style.listStyleType = 'none'
    //         todoContainer.dataset.todoIndex = index

    //         let todoName = document.createElement('h4')
    //         todoName.innerText = `Todo Name: ${todo.name}`
    //         todoContainer.appendChild(todoName)

    //         let todoDescription = document.createElement('p')
    //         todoDescription.innerText = `Todo Description: ${todo.description||'none'}`
    //         todoContainer.appendChild(todoDescription)

    //         let todoPriority = document.createElement('p')
    //         todoPriority.innerText = `Todo Priority: ${todo.priority||0}`
    //         todoContainer.appendChild(todoPriority)
    //         if(todo.priority<3){
    //             todoContainer.style.backgroundColor = 'lightgreen'
    //         }else if(todo.priority<6){
    //             todoContainer.style.backgroundColor = 'yellow'
    //         }else{
    //             todoContainer.style.backgroundColor = 'red'
    //         }

    //         let todoDueDate = document.createElement('p')
    //         todoDueDate.innerText = `Todo due date: ${todo.dueDate}`
    //         todoContainer.appendChild(todoDueDate)

    //         let todoNotes = document.createElement('ul')
    //         todoNotes.innerText = "Todo Notes: "
    //         todoNotes.style.border = '1px solid grey'
    //         todoNotes.style.margin = '5px'
    //         //this code builds note elements
    //         if(todo.notes.length<1){
    //             todoNotes.innerText += 'None'
    //         }
    //         for(let i = 0; i<todo.notes.length; i++){
    //             buildNote(todo.notes[i], i)
    //         }
    //         //button for adding notes
    //         let newTodoNoteButton = document.createElement('button')
    //         newTodoNoteButton.type = 'button'
    //         newTodoNoteButton.innerText = 'Add Note'
    //         todoNotes.appendChild(newTodoNoteButton)
    //         todoContainer.appendChild(todoNotes)
    //         //toggle note modal
    //         newTodoNoteButton.addEventListener('click', e=>{
    //             if(newTodoNoteModal.style.display !== 'grid'){
    //                 newTodoNoteModal.style.display = 'grid'
    //             }else{
    //                 newTodoNoteModal.style.display = ''

    //             }
    //         })

    //         newNoteModalSaveButton.addEventListener('click', e=>{
    //             todo.addNote(newTodoNoteInput.value)
    //             newTodoNoteInput.value = ''
    //             newTodoNoteModal.style.display = 'none'
    //             viewProject(projectIndex)
    //         })
    //         //when cancel button is clicked hide the modal and wipe the input field
    //         newNoteModalCancelButton.addEventListener('click', e=>{
    //             newTodoNoteModal.style.display = 'none'
    //             newTodoNoteInput.value = ''
    //         })
            
                    

    //         //checklist output
    //         let todoChecklist = document.createElement('ul')
    //         todoChecklist.innerText = "Todo Checklist: "
    //         todoChecklist.style.border = '1px solid red'
    //         if(todo.checklist.length<1){
    //             todoChecklist.innerText += 'None'
    //         }
    //         for(let i = 0; i< todo.checklist.length; i++){
    //             //checklist items, input type='checkbox' checked
    //             todoChecklist.appendChild(buildChecklist(todo.checklist[i], i))
    //         }
    //         let createChecklistButton = document.createElement('button')
    //         createChecklistButton.type = 'button'
    //         createChecklistButton.innerText = "Create Checklist Item"
    //         todoChecklist.appendChild(createChecklistButton)

    //         todoContainer.appendChild(todoChecklist)

    //         //if todo is complete place a line-through styling on it
    //         if(todo.complete === true){
    //             todoContainer.style.textDecoration = 'line-through'
    //         }else{
    //             todoContainer.style.textDecoration = 'none'
    //         }
    //         let todoComplete = document.createElement('p')
    //         todoComplete.innerText= `Todo status: ${todo.complete}`
    //         if(todo.todoComplete===true){
    //             todoComplete.style.color = 'green'
    //         }


    
    //         createChecklistButton.addEventListener('click', e=>{
    //             if(newChecklistModal.style.display != 'grid'){
    //                 newChecklistModal.style.display = 'grid'
    //             }else{
    //                 newChecklistModal.style.display = ''
    //             }
    //         })
    //         saveNewChecklistItem.addEventListener('click', e=>{
    //             todo.createChecklistItem(newCheckListDescription.value)
    //             viewProject(projectIndex)
    //             newChecklistModal.style.display = ''
    //             newCheckListDescription.value = ''
    //         })
    //         cancelNewChecklistModal.addEventListener('click', e=>{
    //             newChecklistModal.style.display = ''
    //             newCheckListDescription.value = ''
    //         })

    //         //need to build a button to toggle the complete property value of a todo item
    //         let todoEditsDiv = document.createElement('div')
    //         let completeTodoButton = document.createElement('button')
    //         completeTodoButton.type = 'button'
    //         completeTodoButton.innerText = 'Toggle Todo Complete'
    //         completeTodoButton.addEventListener('click', e=>{
    //             if(todo.complete===true){
    //                 todo.complete = false
    //                 viewProject(projectIndex)
    //             }else{
    //                 todo.complete = true
    //                 viewProject(projectIndex)

    //             }
    //         })
    //         todoEditsDiv.appendChild(completeTodoButton)

    //         let deleteTodoButton = document.createElement('button')
    //         deleteTodoButton.type = 'button'
    //         deleteTodoButton.innerText = "Delete Todo"
    //         deleteTodoButton.addEventListener('click', e=>{
    //             let userConfirmsTodoDelete = prompt("Are you sure you want to delete this todo item?(yes/no) ")
    //             if(userConfirmsTodoDelete === 'yes'){
    //                 todoApp.projects[projectIndex].deleteTodo(index)
    //                 viewProject(projectIndex)
    //             }
    //         })
    //         todoEditsDiv.appendChild(deleteTodoButton)
    //         todoContainer.appendChild(todoEditsDiv)

    //         //function to build checkList items
    //         function buildChecklist(checklist, index){
    //             let checklistItem = document.createElement('li')
    //             checklistItem.dataset.checklistIndex = index
    //             let checklistDescription = document.createElement('label')
    //             checklistDescription.innerText = `${checklist.description}`
    //             let checklistItemBox = document.createElement('input')
    //             checklistItemBox.type = 'checkbox'
    //             checklistItemBox.checked = checklist.checked
    //             checklistItemBox.addEventListener('click', e=>{
    //                 todo.toggleChecklistItem(index)
    //                 viewProject(projectIndex)
    //             })
    //             checklistDescription.appendChild(checklistItemBox)
    //             checklistItem.appendChild(checklistDescription)
    //             return checklistItem
    //         }

    //         //function to build note elements
    //         function buildNote(note, index){
    //             let tempNote = document.createElement('li')
    //             let tempNoteString = document.createElement('span')
    //             tempNoteString.innerText = note
    //             tempNote.appendChild(tempNoteString)
    //             tempNote.dataset.noteIndex = index
    //             //add button to delete the note
    //             let deleteNoteButton = document.createElement('button')
    //             deleteNoteButton.type = 'button'
    //             deleteNoteButton.innerText = 'Delete'
    //             tempNote.appendChild(deleteNoteButton)
    //             todoNotes.appendChild(tempNote)
    //             deleteNoteButton.addEventListener('click', e=>{
    //                 todo.deleteNote(index)
    //                 viewProject(projectIndex)
    //             })
    //         }

    //         return todoContainer
    //     }



    //     function generateTodos(){
    //         for(let i = 0; i<currentProject.todos.length; i++){
    //             //invoke function that builds todo item as a node and appends it into buildProjectTodos
    //             buildProjectTodos.appendChild(buildTodo(currentProject.todos[i], i))
    //         }
    //     }
    //     //generate preexisting todo items when project is loaded
    //     generateTodos()

    //     mainProjectArea.appendChild(buildProject)
    // }    
    