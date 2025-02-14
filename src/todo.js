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
    changeNonArrayPropValue(todoProp, newPropVal){
        this.todoProp = newPropVal
    }
    createChecklistItem(checklistItemText){
        this.checklist.push(new Checklist(checklistItemText))
    }
    deleteChecklistItem(checklistItemText){
        let checklistItemIndex = this.checklist.findIndex(checkItem=>checkItem.text===checklistItemText)
        this.checklist.splice(checklistItemText, checklistItemText)
    }
    deleteNoteItem(noteElementString){
        let noteIndex = this.notes.indexOf(noteElementString)
        this.notes.splice(noteIndex, noteIndex)
    }
}