const todoApp = (function(){
    class Project{
        constructor(title, description, todos=[]){
            this.title = title
            this.description = description
            this.todos = todos
        }
        createTodo(todoName, todoDescription, todoPriority, todoDueDate, todoNotes, todoChecklist){
            this.todos.push(new Todo(todoName, todoDescription, todoPriority, todoDueDate, todoNotes, todoChecklist))
            console.log(`${todoName} created!`)
        }
        completeTodo(todoIndex){
            this.todos[todoIndex].complete=true
        }
        deleteTodo(todoIndex){
            this.todos.splice(todoIndex, 1)
        }
    }

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
        addNote(noteText){
            this.notes.push(noteText)
        }
        deleteNote(noteIndex){
            this.notes.splice(noteIndex, 1)
        }
        createChecklistItem(checkDescription){
            this.checklist.push(new Checklist(checkDescription))
        }
        deleteChecklistItem(checklistIndex){
            this.checklist.splice(checklistIndex, 1)
        }
    }

    class Checklist{
        constructor(description, checked=false){
            this.description = description
            this.checked = checked
        }
        toggleChecklistItem(checklistIndex){
            if(this.checklist[checklistIndex].checked===true){
                this.checklist[checklistIndex].checked=false
            }else{
                this.checklist[checklistIndex].checked=true
            }
        }
    }

    let projects = []
    loadStorage()

    function createProject(projectTitle, projectDescription){
        projects.push(new Project(projectTitle, projectDescription))
        console.log(`${projectTitle} with a description of ${projectDescription} has been created!`)
    }

    function deleteProject(projectIndex){
        projects.splice(projectIndex, 1)
    }

    function saveToStorage(){
        localStorage.setItem('projectsArray', JSON.stringify(projects))
        console.log('Saved projects data to localStorage')
    }

    //this needs a warning, if projects contains elements not in the localStorage then loadStorage will overwrite them, maybe a yes/no question, and suggest to saveToStorage first, or something?
    function loadStorage(){
        let returnedProjects = [];
        if(!localStorage.getItem('projectsArray')){
            localStorage.setItem('projectsArray', '[]')
        }else{
            let parsedProjects = JSON.parse(localStorage.getItem('projectsArray'))
            for(let project of parsedProjects){
                returnedProjects.push(new Project(project.title, project.description, project.todos))
            }
            returnedProjects.forEach(project=>{
                project.todos.forEach(todo=>{
                    let tempTodo = todo
                    todo = new Todo(tempTodo.name, tempTodo.description, tempTodo.priority, tempTodo.dueDate, tempTodo.notes, tempTodo.checklist)
                    todo.checklist.forEach(checkItem=>{
                        let tempCheckItem = checkItem
                        checkItem = new Checklist(tempCheckItem.description, tempCheckItem.checked)
                    })
                })
            })
        }
        //wipe projects
        projects.splice(0, projects.length)
        //add each converted project into projects array variable
        for(let convertedProject of returnedProjects){
            projects.push(convertedProject)
        }
        console.log('Storage loaded into projects variable from localStorage')
    }
    
    function startANew(){
        localStorage.setItem('projectsArray', '[]')
        projects = projects.splice(0, projects.length)
    }

    return {projects, Project, Todo, Checklist, loadStorage, saveToStorage, deleteProject, createProject, startANew}
})()

export {todoApp}