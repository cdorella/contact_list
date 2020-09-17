import React from "react";
import "./App.css";
import ContactList from "./components/contact_list";

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome!</h1>
				<ContactList />
			</div>
		);
	}
}

export default App;
