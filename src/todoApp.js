import Project from './project.js'

const todoApp = (()=>{
    //set starter array if localStorage doesn't have app projectsArray variable
    if(!localStorage.getItem("projectsArray")){
        localStorage.setItem("projectsArray", '[]')
    }
    //load in the localStorage projects array variable into our application
        //so we'll need to convert here not just load/copy in data
    let projects = JSON.parse(localStorage.getItem("projectsArray"),
        (key, value)=>{
            if(typeof value === 'string' && value.includes("function(")){
            return eval("(" + value + ")")
            }else{
            return value
            }
        }
    )

    //log to the console each project, this just logs the entire project data, maybe later change this to just log the name and maybe the number of todos?
    function logProjects(){
        projects = JSON.parse(localStorage.getItem("projectsArray"))
        if(projects.length){
            for(let project of projects){
                console.log(project)
            }
        }else if(!projects.length){
            console.log('No projects stored thus far')
        }
    }

    //push a new project given its name and description into the projects variable, then save that variable into localStorage while using a replacer to change the functions into strings first so they can be svaed
    function createProject(projectName, projectDescription){
        projects.push(new Project(projectName, projectDescription))
        localStorage.setItem('projectsArray', JSON.stringify(projects, (key,value)=>{
            if(typeof value === 'function'){
              return String(value)
            }else{
              return value
            }
          }))
        projects = JSON.parse(localStorage.getItem("projectsArray"))   
    }

    //given an index of a project you'd like to delete, splice it out of hte local array of 'projects' then save the changes to the localStorage
    function deleteProject(projectIndex){
        projects.splice(projectIndex, projectIndex)
        localStorage.setItem('projectsArray', JSON.stringify(projects, (key,value)=>{
            if(typeof value === 'function'){
              return String(value)
            }else{
              return value
            }
          }))
    }

    //a function that rather than wipes the entire localStorage only wipes the projectsArray value by overwriting it with a new array
    function deleteProjects(){
        localStorage.setItem("projectsArray", '[]')
        let projects = JSON.parse(localStorage.getItem("projectsArray"))
    }

    //give access to the project variable and methods of this iife module
    return {logProjects, createProject, deleteProject, deleteProjects, projects}
})()

export { todoApp }



