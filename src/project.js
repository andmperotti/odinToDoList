export default class{
    constructor(name, description, identifier=0){
        this.name = name;
        this.description = description
        this.todos = []
        this.identifier = identifier
    }

    createTodo(name, dueDate, priority, description, notes=[], checklist=[]){
        this.todos.push({name, dueDate, priority, description, notes, checklist})
    }
    
}