import Checklist from './checklist.js'
import {saveToStorage, projects} from "./storage.js"

export default class{
    constructor(name, dueDate, priority, description, notes=[], checklist=[]){
        this.name = name
        this.dueDate = Date(dueDate)
        this.priority = priority
        this.description = description
        this.notes = notes
        this.checklist = checklist
        this.completed = false

        this.toggleTodoComplete = function(){
            this.completed = this.completed===true ? false:true;
            saveToStorage(projects)
        }
        this.changePrimitivePropVal = function(todoProp, newPropVal){
            this.todoProp = newPropVal
            saveToStorage(projects)
        }
    
        this.logChecklistItems = function(){
            for(let item in this.checklist){
                console.log(item)
            }
        }
        this.createChecklistItem = function(checklistItemText){
            this.checklist.push(new Checklist(checklistItemText))
            saveToStorage(projects)
        }
        this.deleteChecklistItem = function(checklistItemIndex){
            this.checklist.splice(checklistItemIndex, checklistItemIndex)
            saveToStorage(projects)
        }
        this.createNoteItem = function(newNoteString){
            this.notes.push(newNoteString)
            saveToStorage(projects)
        }
        this.deleteNoteItem = function(noteIndex){
            this.notes.splice(noteIndex, noteIndex)
            saveToStorage(projects)
        }
    }
}