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

    function addProject(projectName, projectDescription){
        let projects = JSON.parse(localStorage.getItem("projectsArray"))
        projects.push(new Project(projectName, projectDescription))
        localStorage.setItem('projectsArray', JSON.stringify(projects))
    }

    function deleteProject(projectIndex){
        projects.splice(projectIndex, projectIndex)
        localStorage.setItem('projectsArray', JSON.stringify(projects))
    }
    return {getProjects, addProject, deleteProject}
})()

export { todoApp }



