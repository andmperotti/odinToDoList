import Checklist from './checklist.js'

export default class{
    constructor(name, dueDate, priority, description, notes=[], checklist=[]){
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.notes = notes;
        this.checklist = checklist
        this.completed = false
    }

    //delete todo
    //complete todo
    //change todo property value (this is not an array)
    //create checklist item
    //delete checklist item
    //delete note item
}