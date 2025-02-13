import Project from './project.js'

const todoApp = (()=>{
    if(!localStorage.getItem("projectsArray")){
        localStorage.setItem("projectsArray", '[]')
    }
    function getProjects(){
        let projects = JSON.parse(localStorage.getItem("projectsArray"))
        if(projects.length>0){
            for(let project of projects){
                console.log(project)
            }
        }else if(projects.length<1){
            console.log('No projects stored thus far')
        }
    }

    function addProject(name, description){
        let projects = JSON.parse(localStorage.getItem("projectsArray"))
        projects.push(new Project(name, description))
        localStorage.setItem('projectsArray', JSON.stringify(projects))
    }

    function deleteProject(id){
        let projects = JSON.parse(localStorage.getItem("projectsArray"))
        let projectIndex = projects.indexOf({identifier: id})
        projects.splice(projectIndex, projectIndex)
        localStorage.setItem('projectsArray', JSON.stringify(projects))
    }
    return {getProjects, addProject, deleteProject}
})()

export { todoApp }



