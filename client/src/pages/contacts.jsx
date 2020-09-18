import React from "react";
import { Link } from "react-router-dom";
// import AddContact from "../components/add_contact";

class Contacts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: [],
			showNewContactForm: false,
		};
	}

	componentDidMount() {
		this.getAllContacts();
	}

	getAllContacts() {
		fetch("/api/v1/contacts")
			.then(response => response.json())
			.then(response => {
				this.setState({
					contacts: response.data,
				});
			})
			.catch(() => {
				this.setState({ error: true });
			});
	}

	// ORIGINAL VERSION WITHOUT ROUTER
	// handleAddNewContact = () => {
	// 	this.setState({
	// 		showNewContactForm: true,
	// 	});
	// };

	render() {
		const { contacts } = this.state;

		return (
			<div>
				<h2>Contacts:</h2>
				{contacts.map(contact => (
					<ul key={contact.id}>
						<li>
							{contact.first_name} {contact.last_name}
							<br></br>
							<Link to={`/contacts/${contact.id}`}>Details</Link>
						</li>
					</ul>
				))}
				{/* ORIGINAL VERSION USING COMPONENT */}
				{/* <button onClick={() => this.handleAddNewContact()}>
					Add New Contact
				</button>
				<div>{showNewContactForm && <AddContact />}</div> */}
				{/* USING ROUTER INSTEAD */}
				<Link to="/contacts/add">Add New Contact</Link>
			</div>
		);
	}
}

export default Contacts;
