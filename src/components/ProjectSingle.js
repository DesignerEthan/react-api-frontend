import React from 'react'

// source - https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

const ProjectSingle = ({ project, setHasProjects }) => {

	// on delete button click 
	function handleDelete(e) {

		e.preventDefault(); // prevent default link action

		// get project ID by reading the data attribute 
		let id = e.target.getAttribute("data-projectid");
		let url = '/api/' + id;

		// set loading class
		document.body.classList.add("loading");

		// define body to pass with the fetch
		const requestOptions = {
			method: 'DELETE',
		};

		// fetch aka hit the endpoint to trigger the delete action
		fetch(url, requestOptions)
			.then( // after delete happens set the hasProjects to false to trigger a reload

				// not perfect but setting a delay helps give the api time to rewrite the state before trying to delete again
				setTimeout(function() { 
					setHasProjects(false)
				}, 1000)

			)
			.then(

				// remove loading class
				setTimeout(function() {
					document.body.classList.remove("loading");
				}, 1200)

			);


	}

	return (
		<div key={project.id} className="ProductSingle">
			<div className="grid col-4">
				<h3>{project.title}</h3>
			</div>
			<div className="grid col-1 spacer">&nbsp;</div>
			<div className="grid col-7 fit">
				<p>{project.description}</p>
				<a href={project.URL} target="_blank" rel="noreferrer">View Online</a> 
			</div> 
			<div className="clearfix"></div>

			<div className="project-controls">
				<a href={`/edit/?id=${project.id}&title=${project.title}&description=${project.description}&url=${project.URL}`} data-projectid={project.id}><FontAwesomeIcon icon={faPencilAlt} /> Edit</a>
				<a href="/" onClick={handleDelete} data-projectid={project.id}><FontAwesomeIcon icon={faTimes} /> Delete</a>
			</div>
		</div>
	)
}

export default ProjectSingle
