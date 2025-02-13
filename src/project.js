import Todo from './todo.js'

export default class{
    constructor(name, description, identifier=0){
        this.name = name;
        this.description = description
        this.todos = []
        this.identifier = identifier
    }
    deleteTodo(todoIdentifier){
        let todoIndex = this.todos.indexOf({identifier:todoIdentifier})
    }
    changeNonArrayProjectProp(todoProp, newValue){
        this.todoProp = newValue
    }
}