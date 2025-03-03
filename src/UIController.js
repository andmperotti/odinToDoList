import { todoApp } from './todoApp.js'

export const UIController =(function(){
    let mainProjectArea = document.querySelector('#content')
    let navProjectArea = document.querySelector('#navProjects')
    let newProjectButton = document.querySelector('#createNewProject')
    let mainBody = document.querySelector('body')
    let newTodoNoteModal = document.querySelector('#newNoteModal')
    let newTodoNoteInputValue = document.querySelector('#newNoteString').value
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
    let newCheckListDescriptionValue = document.querySelector('#newChecklistDescription').value
    let newChecklistCheckedValue = document.querySelector('#newChecklistChecked').value
    let newProjectModal = document.querySelector('#newProjectModal') 
    let newProjectNameInput = document.querySelector('#newProjectName')
    let newProjectDescriptionInput = document.querySelector('#newProjectDescription')
    let saveNewProject = document.querySelector('#saveNewProject')
    let modalCancelButton = document.querySelector('#cancelNewProject')
    let newProjectNameLabel = document.querySelector('#newProjectNameLabel')


    //function that generates links for active projects on nav sidebar
    function populateNavProjects(){
        for(let i= 0;  i<todoApp.projects.length; i++){
            let tempProject = document.createElement('li')
            tempProject.textContent = todoApp.projects[i].title
            tempProject.style.listStyleType = 'none'
            tempProject.style.color = "red"
            tempProject.style.fontWeight = "bold"
            tempProject.dataset.projectIndex = i
            navProjectArea.appendChild(tempProject)
        }
    }
    populateNavProjects()

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
        console.log(todoApp.projects[e.target.dataset.projectIndex])
        
    })
    //offer ways of sorting projects, maybe in ways considering todo dueDates and priorities, or how many todos are remaining, etc




    //main content area where projects are opened up and todos can be seen and made which will be crossed out if completed, not crossed out if un complete, as well as a button to delete a todo item for any reason. If no projects exist maybe generate an example project or explanation text that tells a user how to create a new project
    //function that will create html content dynamically for a specific project
    function viewProject(projectIndex){
        //wipe project view area in case a project was being shown (lastChild because it was appended after the hidden modals)
        mainProjectArea.removeChild(mainProjectArea.lastChild)
        //don't forget to add a dataset attribute which we'll use to pass to functions that require index positions, so for todos, checklists, and note items

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

        //1.this isnt invoking the function
        //2.its trying to invoke it for EVERY todo in a project... weird
        newNoteModalSaveButton.addEventListener('click', e=>{
            //this below code needs to go into a listener on a save note button
            todo.addNote(newTodoNoteInputValue)
            // viewProject(activeViewedProject)
            newTodoNoteModal.style.display = 'none'

        })
        //when cancel button is clicked hide the modal and wipe the input field
        newNoteModalCancelButton.addEventListener('click', e=>{
            newTodoNoteModal.style.display = 'none'
            newTodoNoteInputValue = ''
        })
        
                
        let todoChecklist = document.createElement('ul')
        todoChecklist.innerText = "Todo Checklist: "
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



        //need to create a ui for adding notes to todo items, might start it in th template
        //need to create a ui for adding checklist items to todo items, might start it in the template






        //need to build a button to toggle the complete property value of a todo item
        let completeTodoButton = document.createElement('button')
        completeTodoButton.type = 'button'
        completeTodoButton.innerText = 'Toggle Complete'
        completeTodoButton.addEventListener('click', e=>{
            if(todo.complete===true){
                todo.complete = false
                viewProject(activeViewedProject)
            }else{
                todo.complete = true
                viewProject(activeViewedProject)

            }
        })
        todoContainer.appendChild(completeTodoButton)

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
        todoContainer.appendChild(deleteTodoButton)

        //function to build checkList items
        function buildChecklist(checklist, index){
            let checklistItem = document.createElement('li')
            checklistItem.attributes.dataset.checklistIndex = index
            let checklistDescription = document.createElement('label')
            checklistDescription.innerText = `${checklist.description}`
            let checklistItemBox = document.createElement('input')
            checklistItemBox.type = 'checkbox'
            if(checklist.checked){
                //this code might be wrong, checked is an attribute on the input element and its a boolean attribute, just needs to be added, if saved as true, elsewhere we'll have an event listener that lets us change this value.
                // checklistItemBox.checked = true
                checklistItemBox.setAttribute='checked'
            }
            checklistDescription.appendChild(checklistItemBox)
            checklistItem.appendChild(checklistDescription)
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
            //3. this doesn't work at all
            deleteNoteButton.addEventListener('click', e=>{
                todo.deleteNote(index)
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


    //button to wipe all projects, temporarily use an alert to confirm
    let wipeProjectsButton = document.createElement('button')
    wipeProjectsButton.type = 'button'
    wipeProjectsButton.innerText = "Delete All Projects"
    // wipeProjectsButton
    wipeProjectsButton.addEventListener('click', ()=>{
        let userWipeConfirm = prompt("Are you sure you want to wipe )everything?(true/false) ")
        if(userWipeConfirm==='true'){
            todoApp.startANew()
            wipeNavProjects()
            populateNavProjects()
        }
    })
    document.querySelector('nav').appendChild(wipeProjectsButton)






    //generate projects that are saved (function), this would be in the main section, within the notes and checklist ul's create buttons to add notes and checklist items, and within those notes and checklist items create buttons to delete those items. These checklist items will also be able to have a cross through them or not depending on if they have been completed.

    //generate projects as a list item in the nav's ul, and give them buttons inside their list items that allows a user to delete the projects, of course prompt with a modal if they are sure they want to delete the project.

    //generate project when user creates it (same function as above just called at different time (listener on a button that exists in the nav element))

    //don't forget that functions that add or delete things will need to repaint the page to include/exclude added/deleted items

    
})()