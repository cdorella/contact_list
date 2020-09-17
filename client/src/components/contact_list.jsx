import React from "react";
// import AllContacts from "./all_contacts";

class ContactList extends React.Component {
	constructor(props) {
		super();
		this.state = {
			error: false,
			errorMessage: "",
			showNewContactForm: false,
			showDetails: false,
			editDetails: false,
			contacts: [],
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			selectedContact: "",
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
				// currently catching "server down" error
				this.setState({ error: true });
			});
	}

	handleAddNewContact = () => {
		this.setState({
			showNewContactForm: true,
		});
	};

	handleInputChange = event => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		this.addContact();
		this.setState({
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			showNewContactForm: false,
		});
	};

	addContact = () => {
		const { first_name, last_name, email, phone_number } = this.state;

		fetch("/api/v1/contacts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				first_name: first_name,
				last_name: last_name,
				email: email,
				phone_number: phone_number,
			}),
		})
			.then(response => response.json())
			.then(() => {
				this.getAllContacts();
			})
			// fix error handling and check uniqueness of email and edge case without "required" on client side
			.catch(error => {
				console.log("error", error.response);
			});
	};

	handleClearForm = () => {
		this.setState({
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
		});
	};

	handleShowDetails = id => {
		const { contacts } = this.state;
		const selection = contacts.find(contact => {
			return contact.id === id;
		});
		this.setState({
			showDetails: true,
			selectedContact: selection,
		});
	};

	handleEditContact = id => {
		this.setState({
			editDetails: true,
		});
	};

	// editContact = id => {
	// 	fetch(`/api/v1/contact/${id}`, {
	// 		method: "PUT",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			complete: 1,
	// 		}),
	// 	})
	// 		.then(response => response.json())
	// 		.then(() => {
	// 			this.getAllContacts();
	// 		})
	// 		.catch(() => {
	// 			this.setState({ error: true });
	// 		});
	// };

	handleDeleteContact = id => {
		this.deleteContact(id);
	};

	deleteContact = id => {
		fetch(`/api/v1/contacts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(() => {
				this.getAllContacts();
				this.setState({
					showDetails: false,
				});
			})
			.catch(() => {
				this.setState({ error: true });
			});
	};

	render() {
		const {
			contacts,
			errorMessage,
			showNewContactForm,
			first_name,
			last_name,
			email,
			phone_number,
			showDetails,
			selectedContact,
		} = this.state;

		return (
			<div>
				<h2>Contacts:</h2>
				{contacts.map(contact => (
					<ul key={contact.id}>
						<li>
							{contact.first_name} {contact.last_name}
							<br></br>
							<button onClick={() => this.handleShowDetails(contact.id)}>
								Details
							</button>
						</li>
					</ul>
				))}
				<button onClick={() => this.handleAddNewContact()}>
					Add New Contact
				</button>
				{showDetails && (
					<div>
						<p>
							Name: {selectedContact.first_name} {selectedContact.last_name}{" "}
						</p>
						<p>Email: {selectedContact.email} </p>
						<p>Phone Number: {selectedContact.phone_number}</p>
						<button onClick={() => this.handleEditContact(selectedContact.id)}>
							Edit
						</button>
						<button
							onClick={() => this.handleDeleteContact(selectedContact.id)}
						>
							Delete
						</button>
					</div>
				)}
				<div>
					<h4>{errorMessage}</h4>
					<br></br>
					{showNewContactForm && (
						<div>
							<form onSubmit={this.handleSubmit}>
								<h3>Add New Contacts:</h3>
								<label>First Name:</label>
								<input
									type="text"
									name="first_name"
									value={first_name}
									onChange={this.handleInputChange}
									required
								/>
								<label>Last Name:</label>
								<input
									type="text"
									name="last_name"
									value={last_name}
									onChange={this.handleInputChange}
									required
								/>
								<label>Email:</label>
								<input
									type="text"
									name="email"
									value={email}
									onChange={this.handleInputChange}
									required
								/>
								<label>Phone Number:</label>
								<input
									type="text"
									name="phone_number"
									value={phone_number}
									onChange={this.handleInputChange}
									required
								/>
								<br></br>
								<button>Submit</button>
							</form>
							<button onClick={this.handleClearForm}>Clear</button>
						</div>
					)}
				</div>
				{this.state.error && (
					<p className="error"> Sorry, there has been an error.</p>
				)}
			</div>
		);
	}
}

// REFACTORING LATER
// render() {
// 	return (
// 		<div>
// 			<AllContacts contacts={this.state.contacts} />
// 		</div>
// 	);
// }

export default ContactList;
