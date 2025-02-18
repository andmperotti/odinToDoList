function loadStorage(){
    return JSON.parse(localStorage.getItem('projectsArray'), (key,value)=>{
        if(typeof value === 'string' && value.includes("function(")){
            return eval('(" + value + ")')
        }else{
            return value
        }
    })
}

function saveToStorage(data){
    localStorage.setItem('projectsArray', JSON.stringify(data, (key, value)=>{
        if(typeof value === 'function'){
            return String(value)
        }else{
            return value
        }
    }))
}

let projects = JSON.parse(localStorage.getItem("projectsArray"),
    (key, value)=>{
        if(typeof value === 'string' && value.includes("function(")){
        return eval("(" + value + ")")
        }else{
        return value
        }
    }
)

export { loadStorage, saveToStorage, projects}