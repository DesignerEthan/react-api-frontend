import React from 'react'

// import components
import ProjectSingle from './ProjectSingle';

const ProjectList = ({ projects, hasProjects, setHasProjects }) => {

	// make sure we have our data before we try to loop it
	const loadData = () => {
		if(hasProjects && projects) { 
			let loopData = projects.map((project, index) => {
				return <ProjectSingle key={index} project={project} setHasProjects={setHasProjects} />
			});
			return loopData;
		} else {
			return 'Loading';
		}
	}

	return (
		<div>
			{loadData()}
		</div>
	)
}

export default ProjectList
