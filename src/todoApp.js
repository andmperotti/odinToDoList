
const todoApp = (function(){
    class Project{
        constructor(title, description='none', todos=[]){
            this.title = title
            this.description = description
            this.todos = todos
        }
        createTodo(todoName, todoDescription, todoPriority, todoDueDate, todoNotes, todoChecklist){
            this.todos.push(new Todo(todoName, todoDescription, todoPriority, todoDueDate, todoNotes, todoChecklist))
            console.log(`${todoName} created!`)
            saveToStorage()
        }
        deleteTodo(todoIndex){
            this.todos.splice(todoIndex, 1)
            saveToStorage()
        }
        changeProjectTitle(newTitleValue){
            this.title = newTitleValue
            saveToStorage()
        }
        changeProjectDescription(newDescription){
            this.description=newDescription
            saveToStorage()
        }
        toggleTodo(todoIndex){
            if(this.todos[todoIndex].complete === 'true'){
                this.todos[todoIndex].complete = 'false'
            }else{
                this.todos[todoIndex].complete = 'true'
            }
            saveToStorage()
        }
    }

    class Todo{
        constructor(name, description='none', priority=0, dueDate, notes=[], checklist=[], complete='false'){
            this.name = name
            this.description = description
            this.priority = Number(priority)
            //need to pass a string 'year-month-day', otherwise if the value being passed in is an empty string then set the date to the next day
            this.dueDate = dueDate === '' ? `${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth()+1}-${new Date(Date.now()).getDate()+1}` : dueDate
            this.notes = notes
            this.checklist = checklist
            this.complete = complete
        }
        addNote(noteText){
            this.notes.push(noteText)
            saveToStorage()
        }
        changeNote(newNoteText, i){
            this.notes.splice(i, 1, newNoteText)
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
        toggleChecklistItem(checklistIndex){
            if(this.checklist[checklistIndex].checked===true){
                this.checklist[checklistIndex].checked=false
            }else{
                this.checklist[checklistIndex].checked=true
            }
            saveToStorage()
        }
        toggleTodo(todoIndex){
            if(this.complete === 'false'){
                this.complete = 'true'
                console.log(typeof this.complete)
            }else{
                this.complete = 'false'
                console.log(typeof this.complete)

            }
            saveToStorage()
        }
        changePriority(newPriorityValue){
            this.priority = Number(newPriorityValue)
            saveToStorage()
        }
        changeDueDate(newDate){
            this.dueDate= newDate
            saveToStorage()
        }
        changeDescription(newDescription){
            this.description=newDescription
            saveToStorage()
        }
        changeName(newName){
            this.name = newName
            saveToStorage()
        }
        deleteChecklistItem(index){
            this.checklist.splice(index,1)
            saveToStorage()
        }
    }

    class Checklist{
        constructor(description, checked=false){
            this.description = description
            this.checked = checked
        }
        changeDescription(newDescription){
            this.description = newDescription
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
    
    //does indeed load each project as a Project class instance, however does not load each todo as a Todo class instance, and therefore neither each checklist item as a Checklist class instance
    function loadStorage(){
        //create temp array of projects to return
        let convertedProjects = [];
        //if localStorage isn't holding a projectsArray value then set it up and give it an empty array
        if(!localStorage.getItem('projectsArray')){
            localStorage.setItem('projectsArray', '[]')
        //otherwise create a temp variable which holds the converted JSON to pojo objects
        }else{
            let parsedProjects = JSON.parse(localStorage.getItem('projectsArray'))
            //iterate over those pojo objects and build Project class instances
            for(let project of parsedProjects){
                convertedProjects.push(new Project(project.title, project.description, project.todos))
            }
            //iterate over each Project instance in our convertedProjects array
            convertedProjects.forEach((project, projectIndex)=>{
              //iterate over each todo pojo object in the todos property which is an array, and create a temp variable which is a newly built instance of Todo using this pojo todo, then swap out the old pojo for the Todo class instance using splice
                project.todos.forEach((todo, todoIndex)=>{
                    let tempTodo = new Todo(todo.name, todo.description, todo.priority, todo.dueDate, todo.notes, todo.checklist)
                    project.todos.splice(todoIndex, 1, tempTodo)
                //iterate over each checklist pojo and do the same as above to create Checklist class instances and replace the stored pojos with the Checklist class instances
                    todo.checklist.forEach((checkitem, checkitemIndex)=>{
                        let tempCheckitem = new Checklist(checkitem.description, checkitem.checked)
                        todo.checklist.splice(checkitemIndex, 1 , tempCheckitem)
                    })
                })
            })
        }
        //wipe projects
        projects.splice(0, projects.length)
        //add each converted project into projects array variable
        for(let converted of convertedProjects){
            projects.push(converted)
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