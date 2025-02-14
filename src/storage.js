function loadStorage(){
    localStorage.getItem('projectsArray')
}

function saveToStorage(data){
    localStorage.setItem('projectsArray', data)
}
export { loadStorage, saveToStorage}