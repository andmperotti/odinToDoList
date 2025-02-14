import Checklist from './checklist.js'
import {saveToStorage} from "./storage.js"
import {todoApp} from "./todoApp.js"

export default class{
    constructor(name, dueDate, priority, description, notes=[], checklist=[]){
        this.name = name
        this.dueDate = Date(dueDate)
        this.priority = priority
        this.description = description
        this.notes = notes
        this.checklist = checklist
        this.completed = false
    }
    toggleTodoComplete(){
        this.completed = this.completed===true ? false:true;
        saveToStorage(todoApp.projects)
    }
    changePrimitivePropVal(todoProp, newPropVal){
        this.todoProp = newPropVal
        saveToStorage(todoApp.projects)
    }

    logChecklistItems(){
        for(let item in this.checklist){
            console.log(item)
        }
    }
    createChecklistItem(checklistItemText){
        this.checklist.push(new Checklist(checklistItemText))
        saveToStorage(todoApp.projects)
    }
    deleteChecklistItem(checklistItemIndex){
        this.checklist.splice(checklistItemIndex, checklistItemIndex)
        saveToStorage(todoApp.projects)
    }
    createNoteItem(newNoteString){
        this.notes.push(newNoteString)
        saveToStorage(todoApp.projects)
    }
    deleteNoteItem(noteIndex){
        this.notes.splice(noteIndex, noteIndex)
        saveToStorage(todoApp.projects)
    }
}