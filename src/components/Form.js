import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import {v4 as uuid} from 'uuid'

const Form = ({ projects, hasProjects, setHasProjects }) => {
  
	// url const for figuring out which page + passing params
	const location = useLocation();
	let getParams = new URL(window.location.href);

	// use states to hold empty values for fields but allow for prefilled fields later
	const newID = uuid();
	const [newTitle,setNewTitle] = useState(getParams.searchParams.get("title") ? getParams.searchParams.get("title") : '');
	const [newDescription,setNewDescription] = useState(getParams.searchParams.get("description") ? getParams.searchParams.get("description") : '');
	const [newProjectURL,setNewProjectURL] = useState(getParams.searchParams.get("url") ? getParams.searchParams.get("url") : '');

	// placeholder for fetch request
	let requestOptions = {};

	function handleSubmit(e) {

		e.preventDefault();

		// get page path to figure out if Im doing a push or put
		let path = location.pathname;
		let page = path.substring(0,5);

		// default api url
		let apiURL = '/api/';

		// define fields from form
		// let title = e.target.title.value;
		// let description = e.target.description.value;
		// let projectURL = e.target.URL.value;
	

		// if add its a POST request and only post if I have a title
		if(page == '/add') {
			requestOptions = {
				method: 'POST',
			};
			apiURL = '/api/?';
			apiURL += 'id=' + newID + '&';
		}
		
		// if Im editing a project send a PUT request & only if I have a title
		if(page == '/edit') {
			requestOptions = {
				method: 'PUT',
			};

			// get ID (uuid) - source : https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
			let getParams = new URL(window.location.href);
			let editID = getParams.searchParams.get("id");

			// build api url
			apiURL = '/api/' + editID + '/?';

		}

		// build url with new values
		if(newTitle !== '') {
			apiURL += 'title=' + newTitle + '&';
		}
		if(newDescription !== '') {
			apiURL += 'description=' + newDescription + '&';
		}		
		if(newProjectURL !== '') {
			apiURL += 'url=' + newProjectURL;
		}


		// hit api to send data
		fetch(apiURL, requestOptions)
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
					window.location.href = "/"; // redirect back to home page
				}, 1200)

			);


	}


	// on input change update the state 
	// had to save values to state so I could auto load / preload on the edit screen 
	// sure there is a better way of doing this
	function handleChange(e, target) {
		if(target == 'title') {
			setNewTitle(e.target.value);
		}
		if(target == 'description') {
			setNewDescription(e.target.value);
		}
		if(target == 'url') {
			setNewProjectURL(e.target.value);
		}
	}

	
	return (
		<div id="projectForm">
			<form onSubmit={handleSubmit}>
				<fieldset className="hidden">
					<label>ID:</label>
					<input type="text" name="id" value={getParams.searchParams.get("id") ? getParams.searchParams.get("id") : newID } disabled />
				</fieldset>
				<fieldset>
					<label>Project Title:</label>
					<input type="text" name="title" value={newTitle} onChange={e => handleChange(e, 'title')} />
				</fieldset>
				<fieldset>
					<label>Project Description:</label>
					<textarea name="description" value={newDescription} onChange={e => handleChange(e, 'description')}></textarea>
				</fieldset>
				<fieldset>
					<label>Project Link:</label>
					<input type="text" name="url" placeholder="http://..." value={newProjectURL} onChange={e => handleChange(e, 'url')} />
				</fieldset>
				<input type="submit" className="btn" value="Submit" /> 
			</form>
		</div>
  	)


}

export default Form
