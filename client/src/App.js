import React from "react";
import "./App.css";

class App extends React.Component {
	state = {
		contacts: [],
	};

	componentDidMount() {
		fetch("/api/v1/contacts")
			.then(response => response.json())
			.then(response => {
				this.setState({
					contacts: response.data,
				});
			});
	}

	render() {
		const { contacts } = this.state;
		return (
			<div>
				<h1>Hello World</h1>
				{contacts.map(contact => (
					<li key={contact.id}>
						{contact.first_name} {contact.last_name}
					</li>
				))}
			</div>
		);
	}
}

export default App;
