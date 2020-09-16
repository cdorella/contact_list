import React from "react";

class HomePage extends React.Component {
	state = {
		contacts: [],
	};

	componentDidMount() {
		this.fetchAllContacts();
	}

	fetchAllContacts() {
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
				<h2>Contacts:</h2>
				{contacts.map(contact => (
					<li key={contact.id}>
						{contact.first_name} {contact.last_name}
					</li>
				))}
				<button onClick={this.addContact}>New Contact</button>
			</div>
		);
	}
}

export default HomePage;
