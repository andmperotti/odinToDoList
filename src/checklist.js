import {saveToStorage} from "./storage.js"
import {todoApp} from "./todoApp.js"

export default class{
    constructor(text, checked=false){
        this.text = text;
        this.checked = false;
        this.toggleCheck = function(){
            this.checked = this.checked===true ? false : true;
            saveToStorage(todoApp.projects)
        }
    }
}