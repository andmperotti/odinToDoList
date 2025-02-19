//create classes for projects, todo items, and checklist items, and storage functions to save a pojo local version of the app data to localStorage, which we can run functions on which then save those changes to the local storage.

//project class
    //name and description properties
    //todos property which is an array which will hold Todo class instances
class Project{
    constructor(title, description, todos=[]){
        this.title = title
        this.description = description
        this.todos = todos
    }
    //create todo function
    createTodo(todoName, todoDescription, todoPriority, todoDueDate, todoNotes, todoChecklist){
        this.todos.push(new Todo(todoName, todoDescription, todoPriority, todoDueDate, todoNotes, todoChecklist))
    }

    //complete todo function
    completeTodo(todoIndex){
        this.todos[todoIndex].complete=true
    }
    //delete todo function
    deleteTodo(todoIndex){
        this.todos.splice(todoIndex, 1)
    }
}

//todo class
    //title, description, dueDate, priority, notes, and checklist
        //notes will be an array which just holds strings
        //checklist will be an array which holds instances of Checklist class instances
class Todo{
    constructor(name, description, priority, dueDate, notes=[], checklist=[], complete=false){
        this.name = name
        this.description = description
        this.priority = priority
        this.dueDate = Date(dueDate)
        this.notes = notes
        this.checklist = checklist
        this.complete = complete
    }
    //add note to todo function
    addNote(noteText){
        this.notes.push(noteText)
    }
    //delete note from todo function
    deleteNote(noteIndex){
        this.notes.splice(noteIndex, 1)
    }
    //create checklist function 
    createChecklistItem(checkDescription){
        this.checklist.push(new Checklist(checkDescription))
    }
    //toggle checklist item function
    toggleChecklistItem(checklistIndex){
        if(this.checklist[checklistIndex]===true){
            this.checklist[checklistIndex]=false
        }else{
            this.checklist[checklistIndex]=true
        }
    }
    //delete checklist item
    deleteChecklistItem(checklistIndex){
        this.checklist.splice(checklistIndex, 1)
    }
}

//checklist class
    //description, and a boolean value property of 'checked'
class Checklist{
    constructor(description, checked=false){
        this.description = description
        this.checked = checked
    }
}


//createProject function
function createProject(projectTitle, projectDescription){
    projects.push(new Project())
}

//deleteProject function
function deleteProject(projectIndex){
    projects.splice(projectIndex, 1)
}



//save to localStorage function
    //this will need to be called anytime a change is made
function saveToStorage(data){
    localStorage.setItem('projectsArray', JSON.stringify(projects))
}

//load from local Storage function
    //I think this would pretty much only be called at the initial load into a new window
    //if data exists on localStorage then load it, otherwise save an empty array as its value
function loadStorage(){
    let returnProjects;
    if(!localStorage.getItem('projectsArray')){
        localStorage.setItem('projectsArray', '[]')
        returnProjects = []
    }else{
        let pojoProjects = JSON.parse(localStorage.getItem('projectsArray'))
        returnProjects = []
        //here use nested for loops to build Projects, whom have Todos, whom have Checklists
        
    }
    return returnProjects
}

//create local variable which is the converted local storage from JSON
let projects = loadStorage()












//change instance property value function; can be used to change the value of any property that is not holding an array
export {projects, loadStorage, saveToStorage, createProject, deleteProject, Checklist, Project, Todo}