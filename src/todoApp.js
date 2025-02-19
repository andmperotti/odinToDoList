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

    //complete todo function

    //delete todo function
}

//todo class
    //title, description, dueDate, priority, notes, and checklist
        //notes will be an array which just holds strings
        //checklist will be an array which holds instances of Checklist class instances
class Todo{
    constructor(name, description, priority, dueDate, notes=[], checklist=[]){
        this.name = name
        this.description = description
        this.priority = priority
        this.dueDate = Date(dueDate)
        this.notes = notes
        this.checklist = checklist
    }
    //add note to todo function

    //delete not from todo function

    //create checklist function 

    //toggle checklist item function

    //delete checklist item
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
function createProject(){

}

//deleteProject function
function deleteProject(){

}



//save to localStorage function
function saveToStorage(data){

}

//load from local Storage function
function loadStorage(){
    
}
//create local variable which is the converted local storage into JSON
let projects = loadStorage()













//change instance property value function; can be used to change the value of any property that is not holding an array
