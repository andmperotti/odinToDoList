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

    //complete todo toggle
    toggleTodoComplete(){
        this.completed = this.completed===true ? false:true;
    }
    //change todo property value (not an arrays)
    changeNonArrayProps(prop, val){
        this.prop = val
    }

    //create checklist item, by calling constructor and pushing return object into array of checklist property
    createChecklistItem(text){
        this.checklist.push(new Checklist(text))
    }
    //delete checklist item
    deleteChecklistItem(checkIdentifier){
        let identifierIndex = this.checklist.indexOf({identifier: checkIdentifier})
        this.checklist.splice(identifierIndex, identifierIndex)
    }
    //delete note item
    deleteNoteItem(noteValue){
        let noteIndex = this.notes.indexOf(notevalue)
        this.notes.splice(noteIndex, noteIndex)
    }
}