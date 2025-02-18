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
            console.log(`Deleted todo at index ${todoIndex}`)
        }
        this.changePrimitivePropVal = function(projectProp, newPropVal){
            this.projectProp = newPropVal
            saveToStorage(todoApp.projects)
            console.log(`${projectProp} value changed to: ${newPropVal}`)
        }
        this.logTodos= function(){
            if(this.todos.length>0){
                for(let todo of this.todos){
                    console.log(`Todo name: ${todo.name}, todo due date: ${todo.dueDate}, todo priority: ${todo.priority}, todo description: ${todo.description}, todo notes: ${todo.notes.join(', ')}, todo checklist: ${todo.checklist.join(', ')}, todo completion: ${todo.completed}`)
                }
            }else{
                console.log("No todos to log")
            }
        }
        this.createTodo = function(name, dueDate, priority, description){
            this.todos.push(new Todo(name, dueDate, priority, description))
            saveToStorage(todoApp.projects)
            console.log(`Created ${name}, todo which is due on ${dueDate}, and has a priority of ${priority}, and has a description of: ${description}`)
        }
    }

}