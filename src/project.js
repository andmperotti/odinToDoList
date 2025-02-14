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
}