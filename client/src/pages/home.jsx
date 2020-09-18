import React from "react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			<h1>Welcome!</h1>
			<Link to="/contacts">Click here for your contacts</Link>
		</div>
	);
}

export default Home;