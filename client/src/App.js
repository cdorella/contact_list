import React from "react";
import "./App.css";
import HomePage from "./components/home_page";

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome!</h1>
				<HomePage />
			</div>
		);
	}
}

export default App;
