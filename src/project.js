import Todo from './todo.js'
import {saveToStorage} from "./storage.js"
import {todoApp} from "./todoApp.js"

export default class{
    constructor(name, description){
        this.name = name
        this.description = description
        this.todos = []
        this.deleteTodo= function(todoIndex){
            this.todos.splice(todoIndex, todoIndex)
            saveToStorage(todoApp.projects)
    
        }
        this.changePrimitivePropVal = function(projectProp, newPropVal){
            this.projectProp = newPropVal
            saveToStorage(todoApp.projects)
    
        }
        this.logTodos= function(){
            if(this.todos.length>0){
                for(let todo of this.todos){
                    console.log(`Todo name: ${todo.name}, todo due date: ${todo.dueDate}, todo priority: ${todo.priority}, todo description: ${todo.description}, todo notes: ${todo.notes.join(', ')}, todo checklist: ${todo.checklist.join(', ')}, todo completion: ${todo.completed}`)
                }
            }
        }
        this.createTodo = function(name, dueDate, priority, description){
            this.todos.push(new Todo(name, dueDate, priority, description))
            saveToStorage(todoApp.projects)
        }
    }

}