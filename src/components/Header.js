import React from 'react'

function buttonURL() {
	// simple check if form returns ture then Im on the edit or add screen so link back to home else link to add screen
	if(document.getElementById("projectForm")) {
		return <a href="/" className="btn">Back</a>;
	} else {
		return <a href="/add" className="btn">Add Project</a>;
	}
}

const Header = () => {
  return (
    <header>
        <div className="wrapper">
            <div className="grid col-8 title"><strong>Ethan Ellis:</strong> My Projects</div> 
            <div className="grid col-4 fit tar">{buttonURL()}</div> 
            <div className="clearfix"></div>
        </div> 
    </header> 
  )
}

export default Header
