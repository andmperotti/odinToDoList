import {saveToStorage, projects} from "./storage.js"

export default class{
    constructor(text, checked=false){
        this.text = text;
        this.checked = false;
        this.toggleCheck = function(){
            this.checked = this.checked===true ? false : true;
            saveToStorage(projects)
        }
    }
}