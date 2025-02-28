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
            saveToStorage()
        }
        toggleTodo(todoIndex){
            if(this.todos[todoIndex].complete === false){
                this.todos[todoIndex].complete = true
            }else{
                this.todos[todoIndex].complete = false
            }
            saveToStorage()
        }
        deleteTodo(todoIndex){
            this.todos.splice(todoIndex, 1)
            saveToStorage()
        }
    }

    class Todo{
        constructor(name, description, priority=0, dueDate, notes=[], checklist=[], complete=false){
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
            saveToStorage()
        }
        deleteNote(noteIndex){
            this.notes.splice(noteIndex, 1)
            saveToStorage()
        }
        createChecklistItem(checkDescription){
            this.checklist.push(new Checklist(checkDescription))
            saveToStorage()
        }
        deleteChecklistItem(checklistIndex){
            this.checklist.splice(checklistIndex, 1)
            saveToStorage()
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
            saveToStorage()
        }
    }

    let projects = []
    loadStorage()

    function createProject(projectTitle, projectDescription){
        projects.push(new Project(projectTitle, projectDescription))
        console.log(`${projectTitle} with a description of ${projectDescription} has been created!`)
        saveToStorage()
    }

    function deleteProject(projectIndex){
        projects.splice(projectIndex, 1)
        saveToStorage()
    }

    function saveToStorage(){
        localStorage.setItem('projectsArray', JSON.stringify(projects))
        console.log('Saved projects data to localStorage')
    }

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
        projects.splice(0, projects.length)
    }

    return {projects, Project, Todo, Checklist, deleteProject, createProject, startANew}
})()

export {todoApp}