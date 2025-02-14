import Project from './project.js'

const todoApp = (()=>{
    if(!localStorage.getItem("projectsArray")){
        localStorage.setItem("projectsArray", '[]')
    }
    let projects = JSON.parse(localStorage.getItem("projectsArray"))

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

    function createProject(projectName, projectDescription){
        projects.push(new Project(projectName, projectDescription))
        localStorage.setItem('projectsArray', JSON.stringify(projects))
        projects = JSON.parse(localStorage.getItem("projectsArray"))   
    }

    function deleteProject(projectIndex){
        projects.splice(projectIndex, projectIndex)
        localStorage.setItem('projectsArray', JSON.stringify(projects))
    }

    function deleteProjects(){
        localStorage.setItem("projectsArray", '[]')
        let projects = JSON.parse(localStorage.getItem("projectsArray"))
    }

    return {logProjects, createProject, deleteProject, deleteProjects, projects}
})()

export { todoApp }



