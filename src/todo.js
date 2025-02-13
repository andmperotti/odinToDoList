import Checklist from './checklist.js'

export default class{
    constructor(name, dueDate, priority, description, notes=[], checklist=[], identifier = parent.length++){
        this.name = name;
        this.dueDate = Date(dueDate);
        this.priority = priority;
        this.description = description;
        this.notes = notes;
        this.checklist = checklist
        this.completed = false
        this.identifier = identifier
    }
    toggleTodoComplete(){
        this.completed = this.completed===true ? false:true;
    }
    changeNonArrayProps(todoProp, newVal){
        this.todoProp = newVal
    }
    createChecklistItem(descriptionText){
        this.checklist.push(new Checklist(descriptionText))
    }
    deleteChecklistItem(checklistIdentifier){
        let identifierIndex = this.checklist.indexOf({identifier: checklistIdentifier})
        this.checklist.splice(identifierIndex, identifierIndex)
    }
    deleteNoteItem(noteElementString){
        let noteIndex = this.notes.indexOf(noteElementString)
        this.notes.splice(noteIndex, noteIndex)
    }
}