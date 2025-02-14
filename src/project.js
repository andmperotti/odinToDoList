import Todo from './todo.js'

export default class{
    constructor(name, description){
        this.name = name
        this.description = description
        this.todos = []
    }
    deleteTodo(todoIndex){
        this.todos.splice(todoIndex, todoIndex)
    }
    changePrimitivePropVal(todoProp, newPropVal){
        this.todoProp = newValue
    }
    logTodos(){
        if(this.todos.length>0){
            for(let todo of this.todos){
                console.log(`Todo name: ${todo.name}, todo due date: ${todo.dueDate}, todo priority: ${todo.priority}, todo description: ${todo.description}, todo notes: ${todo.notes.join(', ')}, todo checklist: ${todo.checklist.join(', ')}, todo completion: ${todo.completed}`)
            }
        }
    }
}