export default class{
    constructor(text, checked=false, identifier=parent.checklist.length++){
        this.text = text;
        this.checked = false
    }
    toggleCheck(){
        this.checked = this.checked===true ? false : true;
    }
}