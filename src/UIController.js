import { todoApp } from './todoApp.js'

export const UIController =(function(){
    let mainProjectArea = document.querySelector('#content')
    let navProjectArea = document.querySelector('#navProjects')
    let newProjectButton = document.querySelector('#createNewProject')
    let mainBody = document.querySelector('body')
    let newTodoNoteModal = document.querySelector('#newNoteModal')
    let newTodoNoteInput = document.querySelector('#newNoteString')
    let newTodoModal = document.querySelector('#newTodoModal')
    let newTodoNameInput = document.querySelector('#newTodoName')
    let newTodoDescriptionInput = document.querySelector('#newTodoDescription')
    let newTodoPriorityInput = document.querySelector('#newTodoPriority')
    let newTodoDueDateInput = document.querySelector('#newTodoDueDate')
    let saveNewTodoButton = document.querySelector('#createNewTodoButton')
    let cancelNewTodoButton = document.querySelector('#cancelNewTodoButton')
    let newNoteModalCancelButton = document.querySelector('#cancelNewNote')
    let newNoteModalSaveButton = document.querySelector('#saveNewNote')
    let newChecklistModal = document.querySelector('#newChecklistModal')
    let newCheckListDescription= document.querySelector('#newChecklistDescription')
    let saveNewChecklistItem = document.querySelector('#createNewChecklist')
    let cancelNewChecklistModal = document.querySelector('#cancelNewChecklist')
    let newProjectModal = document.querySelector('#newProjectModal') 
    let newProjectNameInput = document.querySelector('#newProjectName')
    let newProjectDescriptionInput = document.querySelector('#newProjectDescription')
    let saveNewProject = document.querySelector('#saveNewProject')
    let modalCancelButton = document.querySelector('#cancelNewProject')
    let newProjectNameLabel = document.querySelector('#newProjectNameLabel')
    let wipeProjectsButton = document.querySelector('#deleteAllProjectsButton')
    let infoButton = document.querySelector('#infoButton')



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
        setSideNavDeletes()

    }
    populateNavProjects()


    //listeners on side nav project delete buttons
    function setSideNavDeletes(){
        let projectDeleteButtons = Array(...document.querySelectorAll('ul li button'))
        for(let i = 0; i<projectDeleteButtons.length;i++){
            projectDeleteButtons[i].addEventListener('click', e=>{
                todoApp.deleteProject(i)
                wipeNavProjects()
                populateNavProjects()
            })  
        }
    }


    //function to wipe side nav project list, used before repopulating list when a project has been added or deleted
    function wipeNavProjects(){
        navProjectArea.innerHTML=''
    }

    //variable to keep track of which project is being viewed
    let activeViewedProject;
    //delegate listener on #navProjects for project li's when clicked (use dataset attribute)
    navProjectArea.addEventListener('click', (e)=>{
        //if what you're clicking on doesn't have a data-index attribute then do nothing
        if(!e.target.dataset.projectIndex){return}
        //otherwise, invoke viewProject function giving the function that data-index attribute value
        viewProject(e.target.dataset.projectIndex)
        activeViewedProject = Number(e.target.dataset.projectIndex)
        
    })
    //offer ways of sorting projects, maybe in ways considering todo dueDates and priorities, or how many todos are remaining, etc

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
    drawExplainer()


    //main content area where projects are opened up and todos can be seen and made which will be crossed out if completed, not crossed out if un complete, as well as a button to delete a todo item for any reason. If no projects exist maybe generate an example project or explanation text that tells a user how to create a new project
    //function that will create html content dynamically for a specific project
    function viewProject(projectIndex){
        //wipe project view area in case a project was being shown (lastChild because it was appended after the hidden modals)
        mainProjectArea.removeChild(mainProjectArea.lastChild)
        //pull project from imported projects array, Project object
        let currentProject = todoApp.projects[projectIndex]
        //create div element for this project
        let buildProject = document.createElement('div')
        //create h3 which wraps projects title, give it content, append it to div temp project variable
        let buildProjectTitle = document.createElement('h3')
        buildProjectTitle.innerText = `Project Name: ${currentProject.title}`
        buildProject.appendChild(buildProjectTitle)

        let buildProjectDescription = document.createElement('p')
        buildProjectDescription.innerText = `Project Description: ${currentProject.description}`
        buildProject.appendChild(buildProjectDescription)

        //add button to create a todo
        let createTodoButton = document.createElement('button')
        createTodoButton.type = 'button'
        createTodoButton.innerText = 'Add Todo'
        buildProject.appendChild(createTodoButton)

        //create a ul where todo items will be inserted
        let buildProjectTodos = document.createElement('ul')
        buildProjectTodos.style.padding = '3%'
        buildProject.appendChild(buildProjectTodos)

        //listener on the createTodoButton
        createTodoButton.addEventListener('click', e=>{
            //show element to user, as it's hidden by default, yet create a toggle on the button 
            if(newTodoModal.style.display !== 'grid'){
                newTodoModal.style.display = 'grid'
            }else{
                newTodoModal.style.display = 'none'
                newTodoNameInput.value = ''
                newTodoDescriptionInput.value = ''
                newTodoPriorityInput.value = ''
                newTodoDueDateInput = ''
            }
            //listener code for save new todo, and cancel buttons
            saveNewTodoButton.addEventListener('click', e=>{
                if(newTodoNameInput.value.length>2){
                    currentProject.createTodo(newTodoNameInput.value, newTodoDescriptionInput.value, newTodoPriorityInput.value, newTodoDueDateInput.value)
                    newTodoNameInput.value = ''
                    newTodoDescriptionInput.value = ''
                    newTodoPriorityInput.value = ''
                    newTodoDueDateInput.value = ''
                    newTodoModal.style.display = 'none'
                    //rerender project with this new todo
                    viewProject(activeViewedProject)
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
                newTodoNameInput.value = ''
                newTodoDescriptionInput.value = ''
                newTodoPriorityInput.value = ''
                newTodoDueDateInput.value = ''
                newTodoModal.style.display = 'none'
            })
        })

        function generateTodos(){
            for(let i = 0; i<currentProject.todos.length; i++){
                //invoke function that builds todo item as a node and appends it into buildProjectTodos
                buildProjectTodos.appendChild(buildTodo(currentProject.todos[i], i))
            }
        }
        //generate preexisting todo items when project is loaded
        generateTodos()

        mainProjectArea.appendChild(buildProject)
    }

    //function that builds preexisting todo item nodes in view, it gets passed each todo object from a project, and its index in the todos array...
    function buildTodo(todo, index){
        let todoContainer = document.createElement('li')
        todoContainer.style.border = '1px solid black'
        todoContainer.style.listStyleType = 'none'
        todoContainer.dataset.todoIndex = index

        let todoName = document.createElement('h4')
        todoName.innerText = `Todo Name: ${todo.name}`
        todoContainer.appendChild(todoName)

        let todoDescription = document.createElement('p')
        todoDescription.innerText = `Todo Description: ${todo.description}`
        todoContainer.appendChild(todoDescription)

        let todoPriority = document.createElement('p')
        todoPriority.innerText = `Todo Priority: ${todo.priority}`
        todoContainer.appendChild(todoPriority)
        if(todo.priority<3){
            todoContainer.style.backgroundColor = 'lightgreen'
        }else if(todo.priority<6){
            todoContainer.style.backgroundColor = 'yellow'
        }else{
            todoContainer.style.backgroundColor = 'red'
        }

        let todoDueDate = document.createElement('p')
        todoDueDate.innerText = `Todo due date: ${todo.dueDate}`
        todoContainer.appendChild(todoDueDate)

        let todoNotes = document.createElement('ul')
        todoNotes.innerText = "Todo Notes: "
        todoNotes.style.border = '1px solid grey'
        todoNotes.style.margin = '5px'
        //this code builds note elements
        if(todo.notes.length<1){
            todoNotes.innerText += 'None'
        }
        for(let i = 0; i<todo.notes.length; i++){
            buildNote(todo.notes[i], i)
        }
        todoContainer.appendChild(todoNotes)
        //button for adding notes
        let newTodoNoteButton = document.createElement('button')
        newTodoNoteButton.type = 'button'
        newTodoNoteButton.innerText = 'Add Note'
        todoContainer.appendChild(newTodoNoteButton)
        //show note modal
        newTodoNoteButton.addEventListener('click', e=>{
            newTodoNoteModal.style.display = 'grid'
        })

        newNoteModalSaveButton.addEventListener('click', e=>{
            console.log(newTodoNoteInput.value)
            todo.addNote(newTodoNoteInput.value)
            newTodoNoteInput.value = ''
            newTodoNoteModal.style.display = 'none'
            viewProject(activeViewedProject)

        })
        //when cancel button is clicked hide the modal and wipe the input field
        newNoteModalCancelButton.addEventListener('click', e=>{
            newTodoNoteModal.style.display = 'none'
            newTodoNoteInput.value = ''
        })
        
                

        //checklist output
        let todoChecklist = document.createElement('ul')
        todoChecklist.innerText = "Todo Checklist: "
        todoChecklist.style.border = '1px solid red'
        if(todo.checklist.length<1){
            todoChecklist.innerText += 'None'
        }
        for(let i = 0; i< todo.checklist.length; i++){
            //checklist items, input type='checkbox' checked
            todoChecklist.appendChild(buildChecklist(todo.checklist[i], i))
        }
        todoContainer.appendChild(todoChecklist)

        //if todo is complete place a line-through styling on it
        if(todo.complete === true){
            todoContainer.style.textDecoration = 'line-through'
        }else{
            todoContainer.style.textDecoration = 'none'
        }
        let todoComplete = document.createElement('p')
        todoComplete.innerText= `Todo status: ${todo.complete}`
        if(todo.todoComplete===true){
            todoComplete.style.color = 'green'
        }


        let createChecklistButton = document.createElement('button')
        createChecklistButton.type = 'button'
        createChecklistButton.innerText = "Create Checklist Item"
        todoContainer.appendChild(createChecklistButton)

        createChecklistButton.addEventListener('click', e=>{
            if(newChecklistModal.style.display != 'grid'){
                newChecklistModal.style.display = 'grid'
            }else{
                newChecklistModal.style.display = ''
            }
        })
        saveNewChecklistItem.addEventListener('click', e=>{
            todo.createChecklistItem(newCheckListDescription.value)
            viewProject(activeViewedProject)
            newChecklistModal.style.display = ''
            newCheckListDescription.value = ''
        })
        cancelNewChecklistModal.addEventListener('click', e=>{
            newChecklistModal.style.display = ''
            newCheckListDescription.value = ''
        })







        //need to build a button to toggle the complete property value of a todo item
        let todoEditsDiv = document.createElement('div')
        let completeTodoButton = document.createElement('button')
        completeTodoButton.type = 'button'
        completeTodoButton.innerText = 'Toggle Todo Complete'
        completeTodoButton.addEventListener('click', e=>{
            if(todo.complete===true){
                todo.complete = false
                viewProject(activeViewedProject)
            }else{
                todo.complete = true
                viewProject(activeViewedProject)

            }
        })
        todoEditsDiv.appendChild(completeTodoButton)

        let deleteTodoButton = document.createElement('button')
        deleteTodoButton.type = 'button'
        deleteTodoButton.innerText = "Delete Todo"
        deleteTodoButton.addEventListener('click', e=>{
            let userConfirmsTodoDelete = prompt("Are you sure you want to delete this todo item?(yes/no) ")
            if(userConfirmsTodoDelete === 'yes'){
                todoApp.projects[activeViewedProject].deleteTodo(index)
                viewProject(activeViewedProject)
            }
        })
        todoEditsDiv.appendChild(deleteTodoButton)
        todoContainer.appendChild(todoEditsDiv)

        //function to build checkList items
        function buildChecklist(checklist, index){
            let checklistItem = document.createElement('li')
            checklistItem.dataset.checklistIndex = index
            let checklistDescription = document.createElement('label')
            checklistDescription.innerText = `${checklist.description}`
            let checklistItemBox = document.createElement('input')
            checklistItemBox.type = 'checkbox'
            checklistItemBox.checked = checklist.checked
            checklistItemBox.addEventListener('click', e=>{
                todo.toggleChecklistItem(index)
                viewProject(activeViewedProject)
            })
            checklistDescription.appendChild(checklistItemBox)
            checklistItem.appendChild(checklistDescription)
            return checklistItem
        }

        //function to build note elements
        function buildNote(note, index){
            let tempNote = document.createElement('li')
            let tempNoteString = document.createElement('span')
            tempNoteString.innerText = note
            tempNote.appendChild(tempNoteString)
            tempNote.dataset.noteIndex = index
            //add button to delete the note
            let deleteNoteButton = document.createElement('button')
            deleteNoteButton.type = 'button'
            deleteNoteButton.innerText = 'Delete'
            tempNote.appendChild(deleteNoteButton)
            todoNotes.appendChild(tempNote)
            deleteNoteButton.addEventListener('click', e=>{
                todo.deleteNote(index)
                viewProject(activeViewedProject)
            })
        }

        return todoContainer
    }

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
    modalCancelButton.addEventListener('click', ()=>{
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
            //somehow newProjectModal gets removed but not a new project

            //maybe use display = '' for that starter rubric to tell users how to use the app, as in to hide it when viewProject is invoked and then display it when delete all projects is invoked or a button to show starter info is clicked
        }
    })

    infoButton.addEventListener('click', e=>{
        mainProjectArea.lastChild.remove()
        drawExplainer()
    })
    
    
})()