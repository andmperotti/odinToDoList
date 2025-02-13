import Project from './project.js'

const todoApp = (()=>{
    let projects = localStorage.getItem('projectArray') || []

    function addProject(name, description){
        projects.push(new Project(name, description))
        localStorage.setItem('projectsArray', JSON.stringify(projects))
    }

    function deleteProject(id){
        let projectIndex = projects.indexOf({identifier: id})
        projects.splice(projectIndex, projectIndex)
        localStorage.setItem('projectsArray', JSON.stringify(projects))
    }
    return {projects, addProject, deleteProject}
})()

export { todoApp }



