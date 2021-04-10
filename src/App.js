import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

// Import Custom CSS
import './css/style.css';


// Import components
import Header from './components/Header';
import ProjectList from './components/ProjectList';
import Form from './components/Form';


function App() {

	// define projects array holder
	const [projects,setProjects] = useState();
	const [hasProjects,setHasProjects] = useState(false);


	// I run the use effect to trigger to fetch on load
	useEffect(() => {

		if(!hasProjects) { // if I don't have my data set get a fetch
			fetch('/api/')
			.then((res) => res.json())
			.then((data) => setProjects(data))
			.then(setHasProjects(true));
		}

	}, [projects, setProjects, hasProjects, setHasProjects]);


	// Pages Setup : Home intro
	const HomePage = () => (
		<div className="page-title">
			<h1>Manage Web Projects</h1>
			<p>Below is a list of recent projects with links for review. You can edit or delete each individually.</p>
		</div>
	)

	const ListProjects = () => ( 
		<ProjectList projects={projects} hasProjects={hasProjects} setHasProjects={setHasProjects} />
	)

	const ProjectForm = () => ( 
		<Form projects={projects} hasProjects={hasProjects} setHasProjects={setHasProjects} />
	)


	return ( 
		<div>
		<BrowserRouter>

			<Header />

			<div className="wrapper">
				<Route exact = {true} path = "/" component = {HomePage} />
				<Route exact = {true} path = "/" component = {ListProjects} />
				<Route exact = {true} path = "/add*" component = {ProjectForm} />
				<Route exact = {true} path = "/edit*" component = {ProjectForm} />
			</div>

		</BrowserRouter> 
		</div>
	);
}

export default App;