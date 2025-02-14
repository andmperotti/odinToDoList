import Checklist from './checklist.js'

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
    }
    changePrimitivePropVal(todoProp, newPropVal){
        this.todoProp = newPropVal
    }
    createChecklistItem(checklistItemText){
        this.checklist.push(new Checklist(checklistItemText))
    }
    deleteChecklistItem(checklistItemIndex){
        this.checklist.splice(checklistItemIndex, checklistItemIndex)
    }
    createNoteItem(newNoteString){
        this.notes.push(newNoteString)
    }
    deleteNoteItem(noteIndex){
        this.notes.splice(noteIndex, noteIndex)
    }
}