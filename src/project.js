import Todo from './todo.js'

export default class{
    constructor(name, description, identifier=0){
        this.name = name;
        this.description = description
        this.todos = []
        this.identifier = identifier
    }
    deleteTodo(id){
        let todoIndex = this.todos.indexOf({identifier:id})
    }
    changeNonArrayProjectProp(prop, val){
        this.prop = val
    }
}