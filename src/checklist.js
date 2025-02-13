export default class{
    constructor(text, checked=false, identifier=parent.checklist.length++){
        this.text = text;
        this.checked = false
    }
    checkItem(){
        this.checked = false
    }
}