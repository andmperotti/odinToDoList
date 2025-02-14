import Project from './project.js'

const todoApp = (()=>{
    if(!localStorage.getItem("projectsArray")){
        localStorage.setItem("projectsArray", '[]')
    }
    function getProjects(){
        let projects = JSON.parse(localStorage.getItem("projectsArray"))
        if(projects.length){
            for(let project of projects){
                console.log(project)
            }
        }else if(!projects.length){
            console.log('No projects stored thus far')
        }
    }

    function createProject(projectName, projectDescription){
        let projects = JSON.parse(localStorage.getItem("projectsArray"))
        projects.push(new Project(projectName, projectDescription))
        localStorage.setItem('projectsArray', JSON.stringify(projects))
    }

    function deleteProject(projectIndex){
        let projects = JSON.parse(localStorage.getItem('projectsArray'))
        projects.splice(projectIndex, projectIndex)
        localStorage.setItem('projectsArray', JSON.stringify(projects))
    }

    function deleteProjects(){
        localStorage.clear()
    }
    return {getProjects, createProject, deleteProject, deleteProjects}
})()

export { todoApp }



